# Local preview server for the showcase that tells the browser never to cache,
# so every reload shows the latest files.
import functools
import http.server
import sys

port = int(sys.argv[1]) if len(sys.argv) > 1 else 4321
directory = sys.argv[2] if len(sys.argv) > 2 else "showcase"


class NoCache(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


handler = functools.partial(NoCache, directory=directory)
http.server.ThreadingHTTPServer(("127.0.0.1", port), handler).serve_forever()
