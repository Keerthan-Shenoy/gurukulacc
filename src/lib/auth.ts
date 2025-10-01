import { apiFetch } from "./api";
import { fetcher } from "./fetcher";



export async function getCurrentUser() {
  try {
    const data = await apiFetch("/user/me", { method: "GET" });
    console.log(data)
    return data.user;
  } catch {
    return null;
  }
}
