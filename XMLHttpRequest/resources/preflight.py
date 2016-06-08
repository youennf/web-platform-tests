def main(request, response):
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Credentials", "true")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, FOO")
    response.headers.set("Access-Control-Allow-Headers", "x-test, x-foo")
    response.headers.set("Access-Control-Expose-Headers", "x-request-method, x-request-content-type, x-request-query, x-request-content-length")


    response.headers.set("X-Request-Method", request.method)
    response.headers.set("X-Request-Query", request.url_parts.query if request.url_parts.query else "NO")
    response.headers.set("X-Request-Content-Length", request.headers.get("Content-Length", "NO"))
    response.headers.set("X-Request-Content-Type", request.headers.get("Content-Type", "NO"))
    response.headers.set("Content-Type", "text/plain")

    if request.method == "OPTIONS":
        code = int(request.GET.first("preflightCode", 200))
        response.status = code
        if (code >= 300 and code < 400):
            response.headers.set("Location", request.GET.first("location", request.url_parts.path +"?followed"))
        return "PREFLIGHT"

    if request.url.endswith("?followed"):
        return "FOLLOWED"
    else:
        return "DIRECT"
