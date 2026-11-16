let pending = 0;
const listeners = new Set();

export function hasPendingApiRequests() {
  return pending > 0;
}

export function subscribeToApiRequests(listener) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function changePending(delta) {
  const wasPending = hasPendingApiRequests();
  pending += delta;
  if (wasPending !== hasPendingApiRequests()) {
    listeners.forEach((listener) => listener());
  }
}

export async function bookingApi(path, { method = "GET", body, password } = {}) {
  changePending(1);

  try {
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
    return await response.json();
  } finally {
    changePending(-1);
  }
}
