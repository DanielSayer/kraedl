import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import { sanitizeFileName } from "@/lib/invoiceUtils";

const marginSize = 5;

export const useCreatePdf = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async (invoiceName: string) => {
    if (!printRef.current) return;
    const sanitizedFileName = sanitizeFileName(invoiceName);

    const clonedNode = printRef.current.cloneNode(true);
    const container = document.createElement("div");
    container.appendChild(clonedNode);
    container.classList.add("print", "absolute", "-top-full");
    container.style.width = "800px";
    document.body.appendChild(container);

    const canvas = await html2canvas(container, { scale: 2 });
    const data = canvas.toDataURL("image/png");
    const pdf = new jsPdf({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth() - 2 * marginSize;
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, "PNG", marginSize, marginSize, pdfWidth, pdfHeight);
    pdf.save(`${sanitizedFileName}.pdf`);

    document.body.removeChild(container);
  };

  return {
    printRef,
    handleDownloadPdf,
  };
};
