#!/usr/bin/env python3
"""PolyMonitor server - serves HTML + proxies Polymarket API"""
import http.server, urllib.request, urllib.parse, json, os, re

PORT = 8765
PROXY = '/api/poly'

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

    def do_GET(self):
        if self.path.startswith(PROXY):
            self.handle_proxy()
        else:
            super().do_GET()

    def handle_proxy(self):
        try:
            parsed = urllib.parse.urlparse(self.path)
            params = dict(urllib.parse.parse_qsl(parsed.query))
            endpoint = params.get('endpoint', 'markets')

            if endpoint == 'markets':
                req = urllib.request.Request(
                    'https://polymarket.com',
                    headers={
                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
                        'Accept': 'text/html',
                    }
                )
                with urllib.request.urlopen(req, timeout=10) as resp:
                    html = resp.read().decode('utf-8', errors='ignore')

                match = re.search(r'<script id="__NEXT_DATA__"[^>]*>(.+?)</script>', html)
                if not match:
                    raise Exception('No __NEXT_DATA__ found')

                data = json.loads(match.group(1))
                pages = data.get('props', {}).get('pageProps', {}).get('dehydratedState', {}).get('queries', [])

                events = []
                for query in pages:
                    state = query.get('state', {}).get('data', {})
                    if isinstance(state, dict) and 'pages' in state:
                        for page in state['pages']:
                            for event in page.get('events', []):
                                # Extract YES price from markets array
                                yes_price = None
                                for mk in event.get('markets', []):
                                    outcome = str(mk.get('outcome', '')).lower()
                                    if outcome in ('yes', '是', 'true', '1'):
                                        yes_price = float(mk.get('price', 0))
                                        break
                                if yes_price is None:
                                    yes_price = 0.5

                                vol = float(event.get('volume24hr', 0) or 0)
                                end_date = event.get('endDate', '')

                                # Filter: active, volume > 50k, price in 5-95c range
                                if (not event.get('closed')
                                        and vol > 50000
                                        and yes_price > 0.05
                                        and yes_price < 0.95):

                                    # Determine short term (<7 days)
                                    import datetime
                                    try:
                                        end_dt = datetime.datetime.fromisoformat(end_date.replace('Z', '+00:00'))
                                        days_left = (end_dt - datetime.datetime.now(datetime.timezone.utc)).total_seconds() / 86400
                                    except:
                                        days_left = 999

                                    events.append({
                                        'title': event.get('title', ''),
                                        'slug': event.get('slug', ''),
                                        'question': event.get('question', event.get('title', '')),
                                        'yesPrice': yes_price,
                                        'volume24h': vol,
                                        'endDate': end_date,
                                        'categories': event.get('tags', []),
                                        'daysLeft': round(days_left, 1),
                                        'markets': [
                                            {'outcome': mk.get('outcome', ''), 'price': float(mk.get('price', 0))}
                                            for mk in event.get('markets', [])
                                        ],
                                    })

                events.sort(key=lambda x: x['volume24h'], reverse=True)
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(events[:50], ensure_ascii=False).encode())
                return

            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'{"error":"Unknown endpoint"}')

        except Exception as e:
            import traceback
            traceback.print_exc()
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())

    def log_message(self, fmt, *args):
        print(f'[{self.address_string()}] {fmt % args}', flush=True)

if __name__ == '__main__':
    print(f'Starting on http://localhost:{PORT}')
    http.server.HTTPServer(('', PORT), Handler).serve_forever()
