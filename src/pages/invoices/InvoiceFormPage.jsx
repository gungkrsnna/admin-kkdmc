import {
  useEffect,
  useState,
} from "react";

import {
  Download,
  Printer,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  createInvoice,
  getInvoiceById,
  updateInvoice,

  viewInvoicePdf,
  downloadInvoicePdf,
} from "../../services/invoiceService";

import AdminLayout
from "../../layouts/AdminLayout";

import InvoiceItemsTable
from "./InvoiceItemsTable";

function InvoiceFormPage() {

  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const isEdit =
    Boolean(id);

  const [loading,
  setLoading] =
  useState(false);

  const [invoice,
    setInvoice] =
    useState(null);

  const [form,
  setForm] =
  useState({
    customer_name: "",
    customer_email: "",
    customer_whatsapp: "",

    invoice_date: "",
    due_date: "",

    sales_in_charge: "",
    payment_term: "",

    notes: "",
    status: "draft",

    tax_percentage: 0,
  });

  useEffect(() => {

    if (isEdit) {

      loadInvoice();

    }

  }, [id]);

  const loadInvoice =
    async () => {

      const data =
        await getInvoiceById(
          id
        );

        setInvoice(data);

      setForm({
        customer_name:
          data.customer_name || "",

        customer_email:
          data.customer_email || "",

        customer_whatsapp:
          data.customer_whatsapp || "",

        invoice_date:
          data.invoice_date || "",

        due_date:
          data.due_date || "",

        sales_in_charge:
          data.sales_in_charge || "",

        payment_term:
          data.payment_term || "",

        notes:
          data.notes || "",

        status:
          data.status || "draft",

        tax_percentage:
          data.tax_percentage  || 0,
      });

    };

  const handleChange =
    (e) => {

      setForm({
        ...form,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setLoading(true);

        let invoice;

        if (isEdit) {

          invoice =
            await updateInvoice(
              id,
              form
            );

        } else {

          invoice =
            await createInvoice(
              form
            );
        }

        navigate(
          `/invoices/${invoice.id}/edit`
        );

      } finally {

        setLoading(false);

      }

    };

  const API_URL =
    import.meta.env.VITE_API_URL;

  const handleDownloadPdf =
    () => {

      downloadInvoicePdf(
        invoice.id
      );

    };

  const handlePrint =
    () => {

      viewInvoicePdf(
        invoice.id
      );

    };

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-black">

            {isEdit
              ? "Edit Invoice"
              : "Create Invoice"}

          </h1>

          {isEdit && invoice && (

            <div className="flex gap-3">

              <button
                type="button"
                onClick={handleDownloadPdf}
                className="
                  flex items-center gap-2
                  bg-red-600
                  text-white
                  px-4
                  py-2
                  rounded-xl
                "
              >
                <Download size={18} />
                PDF
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="
                  flex items-center gap-2
                  bg-gray-800
                  text-white
                  px-4
                  py-2
                  rounded-xl
                "
              >
                <Printer size={18} />
                Print
              </button>

            </div>

          )}

        </div>

        <form
            onSubmit={handleSubmit}
            className="
            bg-white
            rounded-3xl
            p-8
            space-y-6
            "
        >

            <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Customer Name
              </label>

              <input
                name="customer_name"
                placeholder="Customer Name"
                value={form.customer_name}
                onChange={handleChange}
                className="
                w-full
                h-12
                border
                border-gray-300
                rounded-xl
                px-4
                focus:outline-none
                focus:ring-2
                focus:ring-[#14213D]
                "
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                name="customer_email"
                placeholder="Email"
                value={form.customer_email}
                onChange={handleChange}
                className="
                w-full
                h-12
                border
                border-gray-300
                rounded-xl
                px-4
                focus:outline-none
                focus:ring-2
                focus:ring-[#14213D]
                "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Whatsapp Number
              </label>

              <input
                name="customer_whatsapp"
                placeholder="Whatsapp"
                value={form.customer_whatsapp}
                onChange={handleChange}
                className="
                w-full
                h-12
                border
                border-gray-300
                rounded-xl
                px-4
                focus:outline-none
                focus:ring-2
                focus:ring-[#14213D]
                "
              />
            </div>

            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Invoice Date
              </label>

              <input
                type="date"
                name="invoice_date"
                value={form.invoice_date}
                onChange={handleChange}
                className="
                w-full
                h-12
                border
                border-gray-300
                rounded-xl
                px-4
                focus:outline-none
                focus:ring-2
                focus:ring-[#14213D]
                "
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Due Date
              </label>

              <input
                type="date"
                name="due_date"
                value={form.due_date}
                onChange={handleChange}
                className="
                w-full
                h-12
                border
                border-gray-300
                rounded-xl
                px-4
                focus:outline-none
                focus:ring-2
                focus:ring-[#14213D]
                "
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Sales In Charge
              </label>

              <input
                name="sales_in_charge"
                placeholder="Sales In Charge"
                value={form.sales_in_charge}
                onChange={handleChange}
                className="
                w-full
                h-12
                border
                border-gray-300
                rounded-xl
                px-4
                focus:outline-none
                focus:ring-2
                focus:ring-[#14213D]
                "
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Payment Term
              </label>

              <input
                name="payment_term"
                placeholder="Payment Term"
                value={form.payment_term}
                onChange={handleChange}
                className="
                w-full
                h-12
                border
                border-gray-300
                rounded-xl
                px-4
                focus:outline-none
                focus:ring-2
                focus:ring-[#14213D]
                "
              />
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Tax (%)
              </label>

              <input
                 type="number"
                  step="0.01"
                  name="tax_percentage"
                  value={form.tax_percentage}
                  onChange={handleChange}
                className="
                  w-full
                  h-12
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-[#14213D]
                "
              />
            </div>
            

            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Notes
              </label>

              <textarea
                rows="4"
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Notes"
                className="
                    w-full
                    border
                    rounded-xl
                    p-4
                "
                />
            </div>

            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="
                  w-full
                  h-12
                  border
                  border-gray-300
                  rounded-xl
                  px-4
                "
              >

                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>

                <option value="paid">
                  Paid
                </option>

                <option value="cancelled">
                  Cancelled
                </option>

              </select>
            </div>
            

            <button
            type="submit"
            disabled={loading}
            className="
                bg-[#14213D]
                text-white
                px-6
                py-3
                rounded-xl
            "
            >
            {loading
                ? "Saving..."
                : "Save Invoice"}
            </button>

            

        </form>

        {isEdit && invoice && (

  <InvoiceItemsTable
    invoiceId={invoice.id}
    items={
      invoice.items || []
    }
    onReload={
      loadInvoice
    }
  />

)}

{invoice && (

  <div
    className="
      bg-white
      rounded-3xl
      p-6
    "
  >

    <div className="flex justify-end">

      <div className="w-80 space-y-3">

        <div className="flex justify-between">

          <span>
            Subtotal
          </span>

          <span>
            Rp{" "}
            {Number(
              invoice.subtotal || 0
            ).toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Tax ({invoice.tax_percentage || 0}%)
          </span>

          <span>
            Rp{" "}
            {Number(
              invoice.tax_amount || 0
            ).toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between font-semibold">

          <span>
            Total
          </span>

          <span>
            Rp{" "}
            {Number(
              invoice.total_amount || 0
            ).toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between">

          <span>
            Paid
          </span>

          <span>
            Rp{" "}
            {Number(
              invoice.paid_amount || 0
            ).toLocaleString()}
          </span>

        </div>

        <div className="flex justify-between font-bold text-lg">

          <span>
            Balance
          </span>

          <span>
            Rp{" "}
            {Number(
              invoice.balance_amount || 0
            ).toLocaleString()}
          </span>

        </div>

      </div>

    </div>

  </div>

)}

        </div>

    </AdminLayout>
  );
}

export default InvoiceFormPage;