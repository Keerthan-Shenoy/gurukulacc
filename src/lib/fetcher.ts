export async function fetcher(url: string, options: RequestInit = {}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    credentials: "include", // send cookies
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": typeof window !== "undefined"
        ? localStorage.getItem("csrfToken") || ""
        : "",
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
