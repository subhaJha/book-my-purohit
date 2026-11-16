export async function bookingApi(path, { method = "GET", body, password } = {}) {
  const response = await fetch(`/api/${path}`, {
    method,
    headers: {
      ...(body && { "Content-Type": "application/json" }),
      ...(password && { Authorization: `Bearer ${password}` }),
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  if (!response.ok) throw Object.assign(new Error("Booking request failed"), { status: response.status });
  return response.json();
}
