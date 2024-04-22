"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ThemeToggle } from "./ThemeToggle";
import UserAccountNav from "./UserAccountNav";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b bg-background/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b">
          <Link href="/" className="z-40 flex font-semibold">
            <span className="flex items-center">kraedl</span>
          </Link>

          <div className="hidden items-center space-x-4 sm:flex">
            <Link
              href="/dashboard"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              Dashboard
            </Link>
            <UserAccountNav
              name={"Joe Due"}
              email={"joedue@example.com"}
              imageUrl={""}
            />
            <ThemeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
