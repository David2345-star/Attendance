import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

def main():
    print(f"==================================================")
    print(f"  프로젝트 인력 연차관리 웹 시스템 실행 중...")
    print(f"  접속 주소: http://localhost:{PORT}")
    print(f"==================================================")
    
    # Try opening the browser automatically
    try:
        webbrowser.open(f"http://localhost:{PORT}/index.html")
    except Exception:
        pass

    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n서버가 종료되었습니다.")

if __name__ == "__main__":
    main()
