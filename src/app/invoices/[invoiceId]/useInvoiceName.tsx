import {
  getDefaultInvoiceName,
  isDefaultInvoiceName,
} from "@/lib/invoiceUtils";
import { useEffect, useState } from "react";

type UseInvoiceName = {
  invoiceNumber: number;
  clientName: string;
  issueDate: string;
};

const useInvoiceName = ({
  invoiceNumber,
  clientName,
  issueDate,
}: UseInvoiceName) => {
  const [invoiceName, setInvoiceName] = useState<string>("");

  useEffect(() => {
    if (!isDefaultInvoiceName(invoiceName)) return;
    const defaultInvoiceName = getDefaultInvoiceName(
      invoiceNumber,
      clientName,
      issueDate,
    );
    setInvoiceName(defaultInvoiceName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceNumber, clientName, issueDate]);

  const handleChangeInvoiceName = (newName: string) => {
    setInvoiceName(newName);
  };

  return {
    invoiceName,
    handleChangeInvoiceName,
  };
};

export default useInvoiceName;
