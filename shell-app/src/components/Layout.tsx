import type { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 md:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              DevBoard
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              Micro Frontend Task Manager
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Shell host application loading independent Tasks and Dashboard
              remotes.
            </p>
          </div>

          <Navbar />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};
