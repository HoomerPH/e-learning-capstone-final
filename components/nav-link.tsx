"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
        isActive 
          ? "bg-secondary/10 text-secondary" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        className
      )}
    >
      {children}
    </Link>
  );
}