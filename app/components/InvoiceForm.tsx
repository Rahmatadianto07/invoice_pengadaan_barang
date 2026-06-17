"use client";

import { useState } from "react";
import { generateInvoiceNumber, saveInvoice } from "./utils";
import InvoicePreview from "./InvoicePreview";
export default function InvoiceForm() {
  const [data, setData] = useState({
    invoiceNumber: "Inv-",
    date: "",

    logo: "",
    signature: "",

    vendor: "",
    alamatVendor: "",
    teleponVendor: "",

    pemohon: "",
    departemen: "",

    items: [
      {
        namaBarang: "",
        qty: 1,
        satuan: "Unit",
        harga: 0,
      },
    ],

    catatan: "",
  });

  const tambahBarang = () => {
    setData({
      ...data,
      items: [
        ...data.items,
        {
          namaBarang: "",
          qty: 1,
          satuan: "Unit",
          harga: 0,
        },
      ],
    });
  };

  const updateBarang = (index: number, field: string, value: any) => {
    const items = [...data.items];

    items[index] = {
      ...items[index],
      [field]: value,
    };

    setData({
      ...data,
      items,
    });
  };

  const handleFile = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "logo" | "signature",
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setData({
        ...data,
        [type]: reader.result,
      });
    };

    reader.readAsDataURL(file);
  };

  const subtotal = data.items.reduce(
    (acc, item) => acc + item.qty * item.harga,
    0,
  );

  const grandTotal = subtotal;

  return (
    <>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* FORM */}

        <div className=" rounded-xl shadow p-5 space-y-4 text-black bg-amber-300">
          <h2 className="text-2xl font-bold">Invoice Pengadaan Barang</h2>

          {/* NOMOR INVOICE */}

          <div>
            <label className="font-semibold block mb-1">Nomor Invoice</label>

            <input
              className="w-full border rounded p-2 bg-white"
              value={data.invoiceNumber}
              onChange={(e) =>
                setData({
                  ...data,
                  invoiceNumber: e.target.value,
                })
              }
            />
          </div>

          {/* TANGGAL */}

          <div>
            <label className="font-semibold block mb-1">Tanggal</label>

            <input
              type="date"
              className="w-full border rounded p-2 bg-white"
              value={data.date}
              onChange={(e) =>
                setData({
                  ...data,
                  date: e.target.value,
                })
              }
            />
          </div>

          {/* DATA VENDOR */}

          <div className="border rounded p-4">
            <h3 className="font-bold mb-3">Data Vendor</h3>

            <input
              className="w-full border rounded p-2 mb-2 bg-white"
              placeholder="Nama Vendor"
              value={data.vendor}
              onChange={(e) =>
                setData({
                  ...data,
                  vendor: e.target.value,
                })
              }
            />

            <textarea
              className="w-full border rounded p-2 mb-2 bg-white"
              placeholder="Alamat Vendor"
              value={data.alamatVendor}
              onChange={(e) =>
                setData({
                  ...data,
                  alamatVendor: e.target.value,
                })
              }
            />

            <input
              className="w-full border rounded p-2 bg-white"
              placeholder="Telepon Vendor"
              value={data.teleponVendor}
              onChange={(e) =>
                setData({
                  ...data,
                  teleponVendor: e.target.value,
                })
              }
            />
          </div>

          <div className="border rounded p-4">
            <h3 className="font-bold mb-3">Logo Perusahaan</h3>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e, "logo")}
            />
          </div>

          {/* DATA PEMOHON */}

          <div className="border rounded p-4">
            <h3 className="font-bold mb-3">Data Pemohon</h3>

            <input
              className="w-full border rounded p-2 mb-2 bg-white"
              placeholder="Nama Pemohon"
              value={data.pemohon}
              onChange={(e) =>
                setData({
                  ...data,
                  pemohon: e.target.value,
                })
              }
            />

            <input
              className="w-full border rounded p-2 bg-white"
              placeholder="Departemen"
              value={data.departemen}
              onChange={(e) =>
                setData({
                  ...data,
                  departemen: e.target.value,
                })
              }
            />
          </div>

          <div className="border rounded p-4">
            <h3 className="font-bold mb-3">Tanda Tangan</h3>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFile(e, "signature")}
            />
          </div>

          {/* DETAIL BARANG */}

          <div className="border rounded p-4">
            <h3 className="font-bold mb-3">Detail Barang</h3>

            {data.items.map((item: any, index: number) => (
              <div key={index} className="grid grid-cols-4 gap-2 mb-2">
                <input
                  className="border rounded p-2 bg-white"
                  placeholder="Nama Barang"
                  value={item.namaBarang}
                  onChange={(e) =>
                    updateBarang(index, "namaBarang", e.target.value)
                  }
                />

                <input
                  type="number"
                  className="border rounded p-2 bg-white"
                  placeholder="Qty"
                  value={item.qty}
                  onChange={(e) =>
                    updateBarang(index, "qty", Number(e.target.value))
                  }
                />

                <input
                  className="border rounded p-2 bg-white"
                  placeholder="Satuan"
                  value={item.satuan}
                  onChange={(e) =>
                    updateBarang(index, "satuan", e.target.value)
                  }
                />

                <input
                  type="number"
                  className="border rounded p-2 bg-white"
                  placeholder="Harga"
                  value={item.harga}
                  onChange={(e) =>
                    updateBarang(index, "harga", Number(e.target.value))
                  }
                />
              </div>
            ))}

            <button
              type="button"
              onClick={tambahBarang}
              className="
              bg-blue-700
              text-white
              px-4
              py-2
              rounded
              mt-2
            "
            >
              + Tambah Barang
            </button>
          </div>

          {/* TOTAL */}

          <div className="border rounded p-4 bg-white">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>

            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>Rp {grandTotal.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* BUTTON */}

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                const invoices = JSON.parse(
                  localStorage.getItem("invoices") || "[]",
                );

                invoices.push(data);

                localStorage.setItem("invoices", JSON.stringify(invoices));

                alert("Invoice berhasil disimpan");
              }}
              className=" 
              bg-blue-700
              text-white
              py-3
              rounded-lg 
            "
            >
              Simpan Invoice
            </button>

            {/* <button
              type="button"
              className="
              bg-green-600
              text-white
              py-3
              rounded-lg
            "
            >
              Preview Invoice
            </button> */}
          </div>
        </div>

        {/* PREVIEW */}

        <InvoicePreview data={data} />
      </div>
    </>
  );
}
