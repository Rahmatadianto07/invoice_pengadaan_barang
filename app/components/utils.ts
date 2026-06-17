export const generateInvoiceNumber = () => {
  const date = new Date();

  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, "0");

  const day = String(date.getDate()).padStart(2, "0");

  const random = Math.floor(Math.random() * 9999);

  return `INV-${year}${month}${day}-${random}`;
};

export const formatRupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

export const saveInvoice = (data: any) => {
  try {
    const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");

    invoices.push(data);

    localStorage.setItem("invoices", JSON.stringify(invoices));

    return true;
  } catch (error) {
    console.error(error);

    return false;
  }
};

export const getInvoices = () => {
  try {
    return JSON.parse(localStorage.getItem("invoices") || "[]");
  } catch {
    return [];
  }
};

export const deleteInvoice = (invoiceNumber: string) => {
  const invoices = getInvoices();

  const filtered = invoices.filter(
    (item: any) => item.invoiceNumber !== invoiceNumber,
  );

  localStorage.setItem("invoices", JSON.stringify(filtered));
};
