import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className="max-w-4xl text-4xl font-bold md:text-5xl lg:text-6xl">
        This is kraedl
      </h1>
      <Link
        href={"/signin"}
        className={buttonVariants({ variant: "secondary" })}
      >
        Sign In
      </Link>
    </main>
  );
}
