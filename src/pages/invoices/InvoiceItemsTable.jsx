import {
  useState,
} from "react";

import {
  Plus,
  Trash2,
  Save,
} from "lucide-react";

import {
  addInvoiceItem,
  updateInvoiceItem,
  deleteInvoiceItem,
} from "../../services/invoiceService";

import { toast }
from "react-hot-toast";

function InvoiceItemsTable({
  invoiceId,
  items,
  onReload,
}) {

  const [form,
  setForm] =
  useState({
    service_date: "",
    description: "",
    pax: 1,
    volume: 0,
    unit_price: 0,
  });

  const handleAdd =
    async () => {

      try {

        await addInvoiceItem(
          invoiceId,
          form
        );

        toast.success(
          "Item added"
        );

        setForm({
          service_date: "",
          description: "",
          pax: 1,
          volume: 0,
          unit_price: 0,
        });

        onReload();

      } catch (error) {

        toast.error(
          "Failed"
        );

      }

    };

  const handleDelete =
    async (id) => {

      try {

        await deleteInvoiceItem(
          id
        );

        toast.success(
          "Deleted"
        );

        onReload();

      } catch {

        toast.error(
          "Failed"
        );

      }

    };

  return (
    <div
      className="
        bg-white
        rounded-3xl
        p-6
      "
    >

      <div className="flex justify-between mb-6">

        <h3 className="font-bold text-xl">
          Invoice Items
        </h3>

      </div>

      <table className="w-full">

        <thead>

          <tr className="border-b">

            <th className="py-3 text-left">
              Date
            </th>

            <th className="py-3 text-left">
              Description
            </th>

            <th className="py-3 text-center">
              Qty
            </th>

            <th className="py-3 text-center">
              Vol
            </th>

            <th className="py-3 text-right">
              Unit Price
            </th>

            <th className="py-3 text-right">
              Total
            </th>

            <th></th>

          </tr>

        </thead>

        <tbody>

          {items.map(
            (item) => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="py-4">
                  {
                    item.service_date
                  }
                </td>

                <td>
                  {
                    item.description
                  }
                </td>

                <td className="text-center">
                  {item.pax}
                </td>

                <td className="text-center">
                  {item.volume}
                </td>

                <td className="text-right">
                  Rp{" "}
                  {Number(
                    item.unit_price
                  ).toLocaleString()}
                </td>

                <td className="text-right font-semibold">
                  Rp{" "}
                  {Number(
                    item.total_price
                  ).toLocaleString()}
                </td>

                <td className="text-center">

                  <button
                    onClick={() =>
                      handleDelete(
                        item.id
                      )
                    }
                    className="text-red-500"
                  >
                    <Trash2
                      size={18}
                    />
                  </button>

                </td>

              </tr>

            )
          )}

          {/* Add New */}

          <tr>

            <td className="pt-4">

              <input
                type="date"
                value={
                  form.service_date
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    service_date:
                      e.target.value,
                  })
                }
                className="border rounded-lg px-3 py-2"
              />

            </td>

            <td className="pt-4">

              <input
                value={
                  form.description
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    description:
                      e.target.value,
                  })
                }
                className="border rounded-lg px-3 py-2 w-full"
              />

            </td>

            <td className="pt-4">

              <input
                type="number"
                value={form.pax}
                onChange={(e) =>
                  setForm({
                    ...form,
                    pax:
                      e.target.value,
                  })
                }
                className="border rounded-lg px-3 py-2 w-20"
              />

            </td>

            <td className="pt-4">

              <input
                type="number"
                value={form.volume}
                onChange={(e) =>
                  setForm({
                    ...form,
                    volume: e.target.value,
                  })
                }
                className="border rounded-lg px-3 py-2 w-20"
              />

            </td>

            <td className="pt-4">

              <input
                type="number"
                value={
                  form.unit_price
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    unit_price:
                      e.target.value,
                  })
                }
                className="border rounded-lg px-3 py-2"
              />

            </td>

            <td></td>

            <td className="pt-4">

              <button
                onClick={
                  handleAdd
                }
                className="
                  bg-green-600
                  text-white
                  p-2
                  rounded-lg
                "
              >
                <Plus
                  size={18}
                />
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default InvoiceItemsTable;