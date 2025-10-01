"use server";

export async function registerAction(prevState: any, formData: FormData) {
  try {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const name = firstName+" "+ lastName;
    const email = formData.get("email") as string;
    const mobile = formData.get("mobile") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
      return { success: false, error: "Passwords do not match" };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, mobile, password }),
    });

    if (!res.ok) {
      const err = await res.json();
      return { success: false, error: err.message || "Registration failed" };
    }

    return { success: true, data: { email } }; // ✅ return email here
  } catch (error: any) {
    return { success: false, error: error.message || "Something went wrong" };
  }
}
