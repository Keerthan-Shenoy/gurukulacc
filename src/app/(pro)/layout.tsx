import { ReactNode } from "react";
import ProGuard from "@/components/ProGuard";
import "../globals.css"; // if layout is one level deep


export default function ProLayout({ children }: { children: ReactNode }) {
  return (
    <ProGuard>
      <div className="flex min-h-screen">
        <aside className="w-64 bg-gray-900 text-white p-4">
          <h2 className="text-xl font-bold mb-4">Pro Area</h2>
          <nav>
            <ul>
              <li><a href="/pro">My Courses</a></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6 bg-gray-50">{children}</main>
      </div>
    </ProGuard>
  );
}
