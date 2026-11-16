import process from "node:process";

const backend = process.env.BOOKING_API_URL?.trim();
const rewrites = [];

if (backend) {
  const origin = new URL(backend);
  if (origin.protocol !== "https:" || origin.username || origin.password ||
      origin.pathname !== "/" || origin.search || origin.hash) {
    throw new Error("BOOKING_API_URL must be an HTTPS origin without a path or credentials.");
  }
  if ([process.env.VERCEL_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL]
    .some((host) => host?.toLowerCase() === origin.host.toLowerCase())) {
    throw new Error("BOOKING_API_URL must point to the FastAPI service.");
  }
  rewrites.push({ source: "/api/:path*", destination: `${origin.origin}/api/:path*` });
}

rewrites.push(
  { source: "/:page(rituals|purohits|book|track|account|admin|purohit-portal)", destination: "/index.html" },
  { source: "/track/:id", destination: "/index.html" },
  { source: "/purohit/:id", destination: "/index.html" },
);

export const config = {
  framework: "vite",
  outputDirectory: "dist",
  rewrites,
  headers: [{ source: "/(.*)", headers: [{ key: "Referrer-Policy", value: "no-referrer" }] }],
};
