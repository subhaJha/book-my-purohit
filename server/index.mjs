import { createServer, request as httpRequest } from "node:http";
import { request as httpsRequest } from "node:https";
import { createReadStream, existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const apiOrigin = new URL(process.env.BOOKING_API_URL || "http://127.0.0.1:8000");
if (!["http:", "https:"].includes(apiOrigin.protocol)) throw new Error("BOOKING_API_URL must use HTTP or HTTPS.");
const requestBackend = apiOrigin.protocol === "https:" ? httpsRequest : httpRequest;

function proxyApi(req, res) {
  const headers = {};
  for (const name of ["authorization", "content-length", "content-type", "cookie"]) {
    if (req.headers[name] !== undefined) headers[name] = req.headers[name];
  }
  const upstream = requestBackend(apiOrigin, { method: req.method, path: req.url, headers }, (response) => {
    for (const name of ["content-type", "cache-control", "www-authenticate", "retry-after", "set-cookie"]) {
      if (response.headers[name] !== undefined) res.setHeader(name, response.headers[name]);
    }
    res.writeHead(response.statusCode);
    response.on("error", () => res.destroy()).pipe(res);
  });
  upstream.setTimeout(15_000, () => upstream.destroy());
  upstream.on("error", () => {
    if (res.headersSent) return res.destroy();
    res.writeHead(502, { "Content-Type": "application/json", "Cache-Control": "no-store" });
    res.end(JSON.stringify({ detail: "Booking service unavailable" }));
  });
  res.on("close", () => upstream.destroy());
  req.pipe(upstream);
}
const dist = resolve("dist");
const index = resolve(dist, "index.html");
const port = Number(process.env.PORT || 5174);
const host = process.env.HOST || "127.0.0.1";
const types = { js: "text/javascript", css: "text/css", png: "image/png", webp: "image/webp", svg: "image/svg+xml" };

if (!existsSync(index)) throw new Error("Run npm run build before starting the server.");

const server = createServer((req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("X-Frame-Options", "DENY");
  if (req.url.startsWith("/api/")) return proxyApi(req, res);
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  const pathname = req.url.split("?")[0];
  const asset = pathname.match(/^\/assets\/([a-zA-Z0-9_.-]+\.([a-z]+))$/);
  const page = /^\/(?:rituals|purohits|purohit\/[0-9]+|book|track(?:\/[a-f0-9]{32})?|admin|account|purohit-portal)?\/?$/.test(pathname);
  const file = asset ? resolve(dist, "assets", asset[1]) : index;
  const type = asset ? types[asset[2]] : "text/html; charset=utf-8";
  if ((!asset && !page) || !type || !existsSync(file)) {
    res.writeHead(404).end();
    return;
  }
  res.writeHead(200, {
    "Content-Type": type,
    "Content-Length": statSync(file).size,
    "Cache-Control": asset ? "public, max-age=31536000, immutable" : "no-store",
  });
  if (req.method === "HEAD") res.end();
  else createReadStream(file).on("error", () => res.destroy()).pipe(res);
});
server.listen(port, host, () => console.log(`Book My Purohit listening at http://${host}:${port}`));
