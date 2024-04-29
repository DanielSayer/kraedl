import type { ReactNode } from "react";
import { Icons } from "@/components/Icons";

type NavOption = {
  title: ReactNode;
  ref: string;
};

export const notAuthorizedNavOptions: NavOption[] = [
  {
    title: (
      <>
        Get Started <Icons.arrowRight className="ml-2 h-5 w-5" />
      </>
    ),
    ref: "/registerBusiness",
  },
  {
    title: "Sign In",
    ref: "/signIn",
  },
];

export const authorizedNavOptions: NavOption[] = [
  {
    title: "Dashboard",
    ref: "/dashboard",
  },
  {
    title: "Log out",
    ref: "/api/auth/signout",
  },
];