const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

interface FetchOptions extends RequestInit {
  query?: Record<string, string | number | boolean>;
}

export async function apiFetch(
  path: string,
  options: FetchOptions = {}
): Promise<any> {
  const { query, ...fetchOptions } = options;

  // Construct query string if provided
  const queryString = query
    ? "?" + new URLSearchParams(
        Object.entries(query).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString()
    : "";

  const isJsonBody = fetchOptions.body && typeof fetchOptions.body === "string";

  const res = await fetch(`${API_BASE}${path}${queryString}`, {
    ...fetchOptions,
    headers: {
      ...(isJsonBody ? { "Content-Type": "application/json" } : {}),
      ...(fetchOptions.headers || {}),
    },
    credentials: "include", // ensures cookies (like access_token) are sent
  });

  let data: any;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || res.statusText);
  }

  return data;
}
