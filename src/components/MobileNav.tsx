"use client";
import {
  authorizedNavOptions,
  notAuthorizedNavOptions,
} from "@/lib/constants/MobileNavOptions";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icons } from "./Icons";

interface MobileNavProps {
  isAuth: boolean;
}

const MobileNav = ({ isAuth }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => setIsOpen((prev) => !prev);
  const pathName = usePathname();

  useEffect(() => {
    if (isOpen) {
      toggleOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName]);

  const closeOnCurrent = (href: string) => {
    if (pathName === href) {
      setIsOpen(false);
    }
  };

  return (
    <div className="sm:hidden">
      <Icons.menu
        onClick={toggleOpen}
        className="relative z-50 h-5 w-5 text-muted-foreground"
      />
      {isOpen ? (
        <div className="fixed inset-0 z-0 w-full animate-in fade-in-20 slide-in-from-top-5">
          <ul className="absolute grid w-full gap-3 border-b bg-background px-10 pb-8 pt-20 shadow-xl">
            {!isAuth
              ? notAuthorizedNavOptions.map((o, i) => (
                  <>
                    <li key={i}>
                      <Link
                        onClick={() => closeOnCurrent(o.ref)}
                        className="flex w-full items-center font-semibold text-foreground/90"
                        href={o.ref}
                      >
                        {o.title}
                      </Link>
                    </li>
                    <li className="my-3 h-px w-full bg-muted-foreground/50" />
                  </>
                ))
              : authorizedNavOptions.map((o, i) => (
                  <>
                    <li key={i}>
                      <Link
                        onClick={() => closeOnCurrent(o.ref)}
                        className="flex w-full items-center font-semibold text-foreground/90"
                        href={o.ref}
                      >
                        {o.title}
                      </Link>
                    </li>
                    <li className="my-3 h-px w-full bg-muted-foreground/50" />
                  </>
                ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
