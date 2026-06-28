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
  getCustomers,
} from "../../services/customerService";

import CustomerDetailModal
from "./CustomerDetailModal";

function CustomersPage() {

  const [customers,
  setCustomers] =
  useState([]);

  const [loading,
  setLoading] =
  useState(true);

  const [search,
  setSearch] =
  useState("");

  const [selectedCustomer,
  setSelectedCustomer] =
  useState(null);

  const loadCustomers =
    async () => {

      try {

        const data =
          await getCustomers();

        setCustomers(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    loadCustomers();

  }, []);

  const filtered =
    customers.filter(
      (item) =>
        item.full_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <AdminLayout>

      <div className="space-y-6">

        <div>

          <h1 className="text-3xl font-black">
            Customers
          </h1>

          <p className="text-gray-500">
            Manage customer accounts
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
              type="text"
              placeholder="Search customer..."
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
                    Email
                  </th>

                  <th className="px-6 py-4 text-center">
                    Inquiries
                  </th>

                  <th className="px-6 py-4 text-center">
                    Reservations
                  </th>

                  <th className="px-6 py-4 text-left">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-center">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filtered.map(
                  (customer) => (

                    <tr
                      key={
                        customer.id
                      }
                      className="border-b"
                    >

                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold">
                            {
                              customer.full_name
                            }
                          </p>

                          <p className="text-xs text-gray-500">
                            {
                              customer.role
                            }
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        {
                          customer.email
                        }
                      </td>

                      <td className="px-6 py-4 text-center">
                        {
                          customer.inquiry_count
                        }
                      </td>

                      <td className="px-6 py-4 text-center">
                        {
                          customer.reservation_count
                        }
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          customer.created_at
                        ).toLocaleDateString()}
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
                              setSelectedCustomer(
                                customer
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

      <CustomerDetailModal
        customer={
          selectedCustomer
        }
        onClose={() =>
          setSelectedCustomer(
            null
          )
        }
      />

    </AdminLayout>
  );
}

export default CustomersPage;