"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState, type ReactNode } from "react";

type DialogButtonProps = {
  buttonContent: ReactNode;
  children: ReactNode;
};

const DialogButton = ({ buttonContent, children }: DialogButtonProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleChange = (open: boolean) => {
    if (!open) {
      setIsOpen(open);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleChange}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button>{buttonContent}</Button>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default DialogButton;
