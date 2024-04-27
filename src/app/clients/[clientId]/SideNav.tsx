"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  {
    label: "Profile",
    href: "/clients/[id]",
  },
  {
    label: "History",
    href: "/clients/[id]/transactions",
  },
  {
    label: "Notes",
    href: "/clients/[id]/notes",
  },
];

export default function SideNav() {
  const pathname = usePathname();
  const userId = "836ad93c-dbf4-4c86-9565-f508b9bbe5cf";

  return (
    <ul className="px-6 py-4">
      {items.map((item) => {
        const isCurrentPath = pathname === item.href.replace("[id]", userId);
        return (
          <li
            key={item.label}
            className={cn(
              "hover: py-1 ps-6 font-semibold hover:border-l-4 hover:border-l-primary hover:bg-muted",
              {
                "border-l-4 border-l-primary bg-muted font-bold text-primary":
                  isCurrentPath,
              },
            )}
          >
            <Link
              className="w-100 block"
              href={item.href}
              as={item.href.replace("[id]", userId)}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
