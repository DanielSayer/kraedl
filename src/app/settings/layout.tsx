import type { ReactNode } from "react";
import { SidebarNav } from "./SidebarNav";

const sidebarNavItems = [
  {
    title: "Business Profile",
    href: "/settings",
  },
  {
    title: "Pricing",
    href: "/settings/pricing",
  },
];

interface SettingsLayoutProps {
  children: ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="container h-[calc(100vh-56px)]">
      <div className="h-full space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your business settings and configure your pricing guide.
          </p>
        </div>
        <hr className="my-6" />
        <div className="flex h-[calc(100%-3rem)] flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 border-r pr-5 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  );
}
