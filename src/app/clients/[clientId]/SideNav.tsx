"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
  {
    label: "Profile",
    href: "/clients/[id]",
  },
  {
    label: "Edit Details",
    href: "/clients/[id]/edit",
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
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const userId = "836ad93c-dbf4-4c86-9565-f508b9bbe5cf";

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  return (
    <ul className="px-6 py-4">
      {items.map((item, index) => {
        const isCurrentPath = pathname === item.href.replace("[id]", userId);
        const isHovering = hoveredIndex !== -1;
        return (
          <li
            key={item.label}
            className={cn(
              "py-1 ps-6 hover:border-l-4 hover:border-l-primary hover:bg-muted",
              {
                "border-l-4 border-l-primary bg-muted":
                  isCurrentPath && !isHovering,
              },
            )}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
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
