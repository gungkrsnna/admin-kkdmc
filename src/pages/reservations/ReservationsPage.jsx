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
  getReservations,
} from "../../services/reservationService";

import ReservationDetailModal
from "./ReservationDetailModal";

function ReservationsPage() {

  const [reservations,
  setReservations] =
  useState([]);

  const [loading,
  setLoading] =
  useState(true);

  const [search,
  setSearch] =
  useState("");

  const [selectedReservation,
  setSelectedReservation] =
  useState(null);

  const loadReservations =
    async () => {

      try {

        const data =
          await getReservations();

        setReservations(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    loadReservations();

  }, []);

  const filtered =
    reservations.filter(
      (item) =>
        item.full_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        item.product_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const getStatusClass =
    (status) => {

      switch (status) {

        case "quoted":
          return "bg-blue-100 text-blue-700";

        case "awaiting_payment":
          return "bg-orange-100 text-orange-700";

        case "confirmed":
          return "bg-green-100 text-green-700";

        case "completed":
          return "bg-gray-100 text-gray-700";

        case "cancelled":
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
            Reservations
          </h1>

          <p className="text-gray-500">
            Manage customer reservations
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
              placeholder="Search..."
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
                    Reservation No
                  </th>

                  <th className="px-6 py-4 text-left">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-left">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left">
                    Arrival
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
                        {item.reservation_number}
                      </td>

                      <td className="px-6 py-4">
                        {item.full_name}
                      </td>

                      <td className="px-6 py-4">
                        {item.product_name}
                      </td>

                      <td className="px-6 py-4">
                        {item.arrival_date}
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
                              setSelectedReservation(
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

      <ReservationDetailModal
        reservation={
          selectedReservation
        }
        onClose={() =>
          setSelectedReservation(
            null
          )
        }
        onSuccess={
          loadReservations
        }
      />

    </AdminLayout>
  );
}

export default ReservationsPage;