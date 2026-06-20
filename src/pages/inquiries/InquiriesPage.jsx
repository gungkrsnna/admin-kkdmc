import {
  useEffect,
  useState,
} from "react";

import {
  Search,
  Eye,
} from "lucide-react";

import AdminLayout
from "../../layouts/AdminLayout";

import {
  getInquiries,
} from "../../services/inquiryService";

import InquiryDetailModal
from "./InquiryDetailModal";

function InquiriesPage() {

  const [inquiries,
  setInquiries] =
  useState([]);

  const [loading,
  setLoading] =
  useState(true);

  const [search,
  setSearch] =
  useState("");

  const [selectedInquiry,
  setSelectedInquiry] =
  useState(null);

  const loadInquiries =
    async () => {

      try {

        const data =
          await getInquiries();

        setInquiries(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    loadInquiries();

  }, []);

  const filtered =
    inquiries.filter(
      (item) =>
        item.full_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.destination
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const getStatusClass =
    (status) => {

      switch (status) {

        case "contacted":
          return "bg-blue-100 text-blue-700";

        case "quoted":
          return "bg-purple-100 text-purple-700";

        case "converted":
          return "bg-green-100 text-green-700";

        case "closed":
          return "bg-red-100 text-red-700";

        default:
          return "bg-yellow-100 text-yellow-700";

      }

    };

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-black">
            Inquiries
          </h1>

          <p className="text-gray-500">
            Manage customer inquiries
          </p>

        </div>

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
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search..."
              className="
                flex-1
                outline-none
              "
            />

          </div>

        </div>

        <div
          className="
            bg-white
            rounded-2xl
            overflow-hidden
          "
        >

          {loading ? (

            <div className="p-10 text-center">
              Loading...
            </div>

          ) : (

            <table className="w-full">

              <thead
                className="
                  bg-gray-50
                  border-b
                "
              >

                <tr>

                  <th className="px-6 py-4 text-left">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left">
                    Destination
                  </th>

                  <th className="px-6 py-4 text-left">
                    Pax
                  </th>

                  <th className="px-6 py-4 text-left">
                    Travel Date
                  </th>

                  <th className="px-6 py-4 text-left">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filtered.map(
                  (item) => (

                    <tr
                      key={item.id}
                      className="border-b"
                    >

                      <td className="px-6 py-4">
                        {item.full_name}
                      </td>

                      <td className="px-6 py-4">
                        {item.destination}
                      </td>

                      <td className="px-6 py-4">
                        {item.pax}
                      </td>

                      <td className="px-6 py-4">
                        {item.travel_date}
                      </td>

                      <td className="px-6 py-4">

                        <span
                          className={`
                            px-3
                            py-1
                            rounded-full
                            text-xs
                            font-semibold
                            ${getStatusClass(
                              item.status
                            )}
                          `}
                        >
                          {item.status}
                        </span>

                      </td>

                      <td className="px-6 py-4">

                        <div
                          className="
                            flex
                            justify-center
                          "
                        >

                          <button
                            onClick={() =>
                              setSelectedInquiry(
                                item
                              )
                            }
                            className="
                              p-2
                              rounded-lg
                              hover:bg-gray-100
                            "
                          >
                            <Eye size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          )}

        </div>

      </div>

      <InquiryDetailModal
        inquiry={
          selectedInquiry
        }
        onClose={() =>
          setSelectedInquiry(
            null
          )
        }
        onSuccess={
          loadInquiries
        }
      />

    </AdminLayout>
  );
}

export default InquiriesPage;