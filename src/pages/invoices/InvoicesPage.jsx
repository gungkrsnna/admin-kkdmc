import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Plus,
  Search,
  FileText,
  Pencil,
  Trash2,
  Eye,
  Download,
} from "lucide-react";

import { toast }
from "react-hot-toast";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  getInvoices,
  deleteInvoice,
  viewInvoicePdf,
  downloadInvoicePdf,
} from "../../services/invoiceService";

function InvoicesPage() {

  const navigate =
    useNavigate();

  const [loading,
  setLoading] =
  useState(true);

  const [search,
  setSearch] =
  useState("");

  const [invoices,
  setInvoices] =
  useState([]);

  useEffect(() => {

    loadInvoices();

  }, []);

  const loadInvoices =
    async () => {

      try {

        const data =
          await getInvoices();

        setInvoices(data);

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to load invoices"
        );

      } finally {

        setLoading(false);

      }

    };

  const handleDelete =
    async (id) => {

      const confirmed =
        window.confirm(
          "Delete invoice?"
        );

      if (!confirmed) return;

      try {

        await deleteInvoice(id);

        toast.success(
          "Invoice deleted"
        );

        loadInvoices();

      } catch (error) {

        console.error(error);

        toast.error(
          "Failed to delete invoice"
        );

      }

    };

  const filtered =
    invoices.filter(
      (item) =>
        item.invoice_number
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.customer_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const getStatusClass =
    (status) => {

      switch (status) {

        case "paid":
          return "bg-green-100 text-green-700";

        case "sent":
          return "bg-blue-100 text-blue-700";

        case "cancelled":
          return "bg-red-100 text-red-700";

        default:
          return "bg-yellow-100 text-yellow-700";

      }

    };

  return (
    <AdminLayout>

      <div className="space-y-6">

        {/* Header */}

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-3xl font-black">
              Invoices
            </h1>

            <p className="text-gray-500">
              Manage customer invoices
            </p>

          </div>

          <button
            onClick={() =>
              navigate(
                "/invoices/create"
              )
            }
            className="
              bg-[#14213D]
              text-white
              px-5
              py-3
              rounded-xl
              flex
              items-center
              gap-2
              font-semibold
            "
          >
            <Plus size={18} />

            Create Invoice

          </button>

        </div>

        {/* Search */}

        <div
          className="
            bg-white
            rounded-2xl
            p-4
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              border
              rounded-xl
              px-4
              h-12
            "
          >

            <Search size={18} />

            <input
              type="text"
              placeholder="Search invoice..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                flex-1
                outline-none
              "
            />

          </div>

        </div>

        {/* Table */}

        <div
          className="
            bg-white
            rounded-3xl
            overflow-hidden
          "
        >

          <table className="w-full">

            <thead
              className="
                bg-gray-50
                border-b
              "
            >

              <tr>

                <th className="px-6 py-4 text-left">
                  Invoice
                </th>

                <th className="px-6 py-4 text-left">
                  Customer
                </th>

                <th className="px-6 py-4 text-left">
                  Date
                </th>

                <th className="px-6 py-4 text-right">
                  Total
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="
                      text-center
                      py-10
                    "
                  >
                    Loading...
                  </td>

                </tr>

              ) : filtered.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="
                      text-center
                      py-10
                    "
                  >
                    No invoices found
                  </td>

                </tr>

              ) : (

                filtered.map(
                  (invoice) => (

                    <tr
                      key={invoice.id}
                      className="border-b"
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2">

                          <FileText
                            size={18}
                          />

                          <span className="font-medium">

                            {
                              invoice.invoice_number
                            }

                          </span>

                        </div>

                      </td>

                      <td className="px-6 py-4">

                        {
                          invoice.customer_name
                        }

                      </td>

                      <td className="px-6 py-4">

                        {invoice.invoice_date
                          ? new Date(
                              invoice.invoice_date
                            ).toLocaleDateString()
                          : "-"}

                      </td>

                      <td className="px-6 py-4 text-right font-semibold">

                        Rp{" "}

                        {Number(
                          invoice.subtotal || 0
                        ).toLocaleString()}

                      </td>

                      <td className="px-6 py-4 text-center">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            ${getStatusClass(
                              invoice.status
                            )}
                          `}
                        >

                          {invoice.status}

                        </span>

                      </td>

                      <td className="px-6 py-4">

  <div
    className="
      flex
      justify-center
      gap-2
    "
  >

    {/* View PDF */}

    <button
        onClick={() =>
    viewInvoicePdf(invoice.id)
  }
      target="_blank"
      rel="noreferrer"
      className="
        p-2
        rounded-lg
        text-blue-600
        hover:bg-blue-50
      "
      title="View PDF"
    >
      <Eye size={18}/>
    </button>

    {/* Download PDF */}

    <button
        onClick={() =>
    downloadInvoicePdf(
      invoice.id
    )
  }
      target="_blank"
      rel="noreferrer"
      className="
        p-2
        rounded-lg
        text-green-600
        hover:bg-green-50
      "
      title="Download PDF"
    >
      <Download size={18}/>
    </button>

    {/* Edit */}

    <button
      onClick={() =>
        navigate(
          `/invoices/${invoice.id}/edit`
        )
      }
      className="
        p-2
        rounded-lg
        hover:bg-gray-100
      "
    >
      <Pencil size={18}/>
    </button>

    {/* Delete */}

    <button
      onClick={() =>
        handleDelete(
          invoice.id
        )
      }
      className="
        p-2
        rounded-lg
        text-red-600
        hover:bg-red-50
      "
    >
      <Trash2 size={18}/>
    </button>

  </div>

</td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default InvoicesPage;