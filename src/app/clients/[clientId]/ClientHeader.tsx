"use client";

import { Icons } from "@/components/Icons";
import { Button } from "@/components/ui/button";
import { clientNavOptions } from "@/lib/constants/ClientNavOptions";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import Link from "next/link";

export const ClientHeader = ({ id, title }: { id: string; title: string }) => {
  return (
    <h1 className="flex items-center justify-between text-2xl font-semibold">
      <div className="flex items-center gap-2 truncate">
        <Link href="/dashboard/clients" className="inline md:hidden">
          <Icons.back />
        </Link>
        {title}
      </div>
      <MobileNav userId={id} />
    </h1>
  );
};

const MobileNav = ({ userId }: { userId: string }) => {
  return (
    <div className="inline md:hidden">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" aria-label="menu">
            <Icons.subMenu />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-50 mr-2 w-40 rounded-md border bg-popover p-4 text-base  text-popover-foreground md:hidden">
          <div className="flex flex-col gap-2">
            {clientNavOptions.map((option) => (
              <Link
                key={option.label}
                className="w-100 block hover:text-muted-foreground"
                href={option.href}
                as={option.href.replace("[id]", userId)}
              >
                {option.label}
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
