"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/lib/auth"; // fetch user from JWT

export default function ProGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const user = getUser();
    if (!user || !user.enrolledCourses?.length) {
      router.replace("/courses"); // redirect to courses if not enrolled
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <p>Checking access...</p>;
  return <>{children}</>;
}
