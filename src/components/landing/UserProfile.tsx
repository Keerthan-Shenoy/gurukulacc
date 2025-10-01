'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function getInitials(name: string = "") {
  const names = name.trim().split(" ");
  let initials = names[0]?.substring(0, 1).toUpperCase() || "U";
  if (names.length > 1) {
    initials += names[names.length - 1]?.substring(0, 1).toUpperCase();
  }
  return initials;
}

export interface SimpleUser {
  firstName?: string;
  email?: string;
  photoURL?: string;
}

export function UserProfile({ user }: { user: SimpleUser }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Replace with your own logout logic (e.g., clear tokens, reset state, etc.)
      localStorage.removeItem("token"); // example
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer group">
          <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
            Welcome, {user.firstName || "User"}
          </span>
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.photoURL} alt="User profile picture" />
            <AvatarFallback>
              {getInitials(user.firstName || user.email || "User")}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/profile">
            <UserIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-500 hover:!text-red-500 focus:!text-red-500 focus:!bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
