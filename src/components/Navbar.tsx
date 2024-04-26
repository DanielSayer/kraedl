"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ThemeToggle } from "./ThemeToggle";
import UserAccountNav from "./UserAccountNav";
import { buttonVariants } from "./ui/button";
import type { Session } from "next-auth";
import { Icons } from "./Icons";
import { useSession } from "next-auth/react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b bg-background/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b">
          <Link href="/" className="z-40 flex font-semibold">
            <span className="flex items-center">kraedl</span>
          </Link>

          <MobileNav isAuth={!!session} />
          <div className="hidden items-center space-x-4 sm:flex">
            <NavItems session={session} />
            <ThemeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

const NavItems = ({ session }: { session: Session | null }) => {
  if (!session) {
    return (
      <>
        <Link
          href={"/signIn"}
          className={buttonVariants({
            variant: "ghost",
            size: "sm",
          })}
        >
          Sign in
        </Link>
        <Link
          href={"/registerBusiness"}
          className={buttonVariants({
            size: "sm",
          })}
        >
          Get started <Icons.arrowRight className="ml-1.5 h-5 w-5" />
        </Link>
      </>
    );
  }

  return (
    <>
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
        name={session?.user.name ?? ""}
        email={session?.user.email ?? ""}
        imageUrl={session?.user.image ?? ""}
      />
    </>
  );
};

export default Navbar;
