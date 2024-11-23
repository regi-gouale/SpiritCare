"use client";

import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <div>{children}</div>
    </main>
  );
}
