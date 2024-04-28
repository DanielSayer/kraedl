import { buttonVariants } from "@/components/ui/button";
import useProtectedRoute from "@/hooks/useProtectedRoute";
import Link from "next/link";

export default async function Page() {
  const session = await useProtectedRoute();

  return (
    <div className="flex flex-col">
      <div className="mt-20 text-center text-xl">Hi, {session.user.name}</div>
      <div className="mt-2 text-center text-xl">This is your dashboard</div>
      <Link
        href={"/dashboard/clients"}
        className={buttonVariants({
          variant: "secondary",
          className: "mx-auto mt-10 w-28",
        })}
      >
        Go to clients
      </Link>
      <Link
        href={"/scheduler"}
        className={buttonVariants({
          variant: "secondary",
          className: "mx-auto mt-10 w-28",
        })}
      >
        Go to scheduler
      </Link>
    </div>
  );
}
