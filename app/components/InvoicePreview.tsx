"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function InvoicePreview({ data }: any) {
  const printRef = useRef<HTMLDivElement>(null);

  const subtotal =
    data.items?.reduce(
      (total: number, item: any) => total + item.qty * item.harga,
      0,
    ) || 0;

  const ppn = subtotal * 0.11;
  const grandTotal = subtotal + ppn;

  const handleDownloadPDF = async () => {
    const element = printRef.current;

    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      logging: true,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 190;
    const pageHeight = 277;

    let imgWidth = pageWidth;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    if (imgHeight > pageHeight) {
      const ratio = pageHeight / imgHeight;

      imgHeight = imgHeight * ratio;

      imgWidth = imgWidth * ratio;
    }

    pdf.addImage(imgData, "PNG", (210 - imgWidth) / 2, 10, imgWidth, imgHeight);

    pdf.save(`${data.invoiceNumber}.pdf`);
  };

  return (
    <div className="w-full text-black">
      <div className="flex justify-between mb-16">
        <div>
          <h1
            className="
        text-4xl
        font-bold
        tracking-[12px]
      "
          >
            INVOICE
          </h1>

          <p className="mt-2 text-lg">No. {data.invoiceNumber}</p>
        </div>

        <div className="text-right">
          <p
            className="uppercase tracking-[3px]"
            style={{
              color: "#666666",
            }}
          >
            Kepada
          </p>

          <h2 className="font-bold text-2xl mt-3">
            {data.vendor || "NAMA VENDOR"}
          </h2>

          <p>{data.teleponVendor}</p>

          <p>{data.alamatVendor}</p>
        </div>
      </div>
      <button
        onClick={handleDownloadPDF}
        className="
          px-5
          py-2
          rounded-lg"
        style={{
          backgroundColor: "#d9eef4",
          color: "#111827",
        }}
      >
        Download PDF
      </button>

      <div
        ref={printRef}
        className="bg-[#e3e9ee] shadow-xl rounded-xl invoice-paper"
        style={{
          width: "100%",
          maxWidth: "900px",
          // minHeight: "1200px",
          padding: "24px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}

        <div className="flex justify-between mb-10">
          <div>
            <h1
              className="
                text-3xl
                font-bold
                tracking-[8px]
              "
            >
              INVOICE
            </h1>

            <p className="mt-3">No : {data.invoiceNumber}</p>

            <p>Date : {data.date}</p>
          </div>

          {data.logo && (
            <img
              src={data.logo}
              alt="Logo"
              style={{
                width: "90px",
                height: "90px",
                objectFit: "contain",
              }}
            />
          )}
        </div>

        {/* BILL TO */}

        <div className="mb-8">
          <h3 className="font-bold mb-2">BILL TO</h3>

          <p>{data.vendor}</p>

          <p>{data.alamatVendor}</p>

          <p>{data.teleponVendor}</p>
        </div>

        {/* TABLE */}

        <table className="w-full mb-8">
          <thead>
            <tr
              style={{
                background: "#208DF5",
              }}
            >
              <th className="p-4 text-left">DESKRIPSI BARANG</th>

              <th className="p-4 text-center">HARGA</th>

              <th className="p-4 text-center">JUMLAH</th>

              <th className="p-4 text-right">TOTAL</th>
            </tr>
          </thead>

          <tbody>
            {data.items.map((item: any, index: number) => (
              <tr key={index}>
                <td className="py-3">
                  <div className="font-semibold text-xl">{item.namaBarang}</div>

                  <div
                    style={{
                      color: "#888888",
                    }}
                  >
                    {item.satuan}
                  </div>
                </td>

                <td className="text-center">
                  Rp {item.harga.toLocaleString("id-ID")}
                </td>

                <td className="text-center">{item.qty}</td>

                <td className="text-right">
                  Rp {(item.qty * item.harga).toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTAL */}

        <div className="flex justify-end">
          <div className="border rounded p-3 bg-white w-95">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between">
              <span>PPN 11%</span>
              <span>Rp {ppn.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between font-bold text-xl py-5 px-3">
              <span>Total</span>
              <span>Rp {grandTotal.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>
        {/* FOOTER */}

        <div className="mt-6">
          <p className="uppercase mb-4">Dibayarkan Kepada :</p>
          {data.signature && (
            <img
              src={data.signature}
              alt="TTD"
              style={{
                width: "120px",
                height: "auto",
                marginBottom: "10px",
              }}
            />
          )}
          <h3
            className="
font-bold
text-2xl
tracking-[4px]
"
          >
            {data.pemohon || "NAMA PEMOHON"}
          </h3>

          <p className="mt-2">{data.departemen}</p>
        </div>
      </div>
    </div>
  );
}
