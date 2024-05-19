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
    title: "Clients",
    ref: "/dashboard/clients",
  },
  {
    title: "Invoices",
    ref: "/invoices",
  },
  {
    title: "Scheduler",
    ref: "/scheduler",
  },
  {
    title: "Settings",
    ref: "/settings",
  },
];
