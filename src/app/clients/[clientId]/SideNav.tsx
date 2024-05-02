"use client";

import { clientNavOptions } from "@/lib/constants/ClientNavOptions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideNav({ clientId }: { clientId: string }) {
  const pathname = usePathname();

  return (
    <ul className="px-6 py-4">
      {clientNavOptions.map((item) => {
        const isCurrentPath = pathname === item.href.replace("[id]", clientId);
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
              as={item.href.replace("[id]", clientId)}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
