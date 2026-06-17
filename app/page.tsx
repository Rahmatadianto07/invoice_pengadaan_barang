"use client";

import { useEffect, useState } from "react";
import InvoiceForm from "./components/InvoiceForm";

export default function Home() {
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("invoices") || "[]");

    setInvoices(data);
  }, []);

  return (
    <main className="p-6">
      <InvoiceForm />
    </main>
  );
}
