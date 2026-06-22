import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
} from "lucide-react";

import { useNavigate }
from "react-router-dom";

import AdminLayout from "../../layouts/AdminLayout";
import { getAllBookings } from "../../services/bookingService";

import {
    formatBookingStatus,
    getBookingStatusClass,
    formatPaymentStatus,
    getPaymentStatusClass,
  } from "../../utils/bookingStatus";

export default function BookingsPage() {
    const navigate =
  useNavigate();

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [paymentFilter, setPaymentFilter] =
    useState("all");

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data =
        await getAllBookings();

      setBookings(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings =
    bookings.filter((booking) => {
      const matchesSearch =
        booking.customer_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        booking.booking_number
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "all"
          ? true
          : booking.status ===
            statusFilter;

      const matchesPayment =
        paymentFilter === "all"
          ? true
          : booking.payment_status ===
            paymentFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPayment
      );
    });

  const totalBookings =
    bookings.length;

  const pendingBookings =
    bookings.filter(
      (b) =>
        b.status ===
        "pending_payment"
    ).length;

  const confirmedBookings =
    bookings.filter(
      (b) =>
        b.status ===
        "confirmed"
    ).length;

  const completedBookings =
    bookings.filter(
      (b) =>
        b.status ===
        "completed"
    ).length;

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Bookings
            </h1>

            <p className="text-gray-500">
              Manage all customer bookings
            </p>
          </div>

          <button
  onClick={() =>
    navigate(
      "/bookings/create"
    )
  }
  className="
    flex items-center gap-2
    rounded-xl
    bg-primary
    px-5 py-3
    text-white
  "
>
  <Plus size={18} />
  New Booking
</button>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between">
              <span>Total</span>
              <Calendar size={20} />
            </div>

            <h2 className="text-3xl font-bold mt-3">
              {totalBookings}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between">
              <span>Pending</span>
              <Clock size={20} />
            </div>

            <h2 className="text-3xl font-bold mt-3">
              {pendingBookings}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between">
              <span>Confirmed</span>
              <CheckCircle size={20} />
            </div>

            <h2 className="text-3xl font-bold mt-3">
              {confirmedBookings}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex justify-between">
              <span>Completed</span>
              <CreditCard size={20} />
            </div>

            <h2 className="text-3xl font-bold mt-3">
              {completedBookings}
            </h2>
          </div>

        </div>

        {/* Filters */}

        <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">

          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-3 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search booking..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="w-full rounded-xl border pl-10 pr-4 py-3"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <div>

    <label className="
      block
      text-sm
      font-medium
      text-gray-600
      mb-2
    ">
      Booking Status
    </label>

    <select
      value={statusFilter}
      onChange={(e) =>
        setStatusFilter(
          e.target.value
        )
      }
      className="
        w-full
        rounded-xl
        border
        px-4
        py-3
      "
    >
      <option value="all">
        All Bookings
      </option>

      <option value="pending_payment">
        Pending Payment
      </option>

      <option value="review">
        Payment Review
      </option>

      <option value="confirmed">
        Confirmed
      </option>

      <option value="completed">
        Completed
      </option>

      <option value="cancelled">
        Cancelled
      </option>

    </select>

  </div>

  <div>

    <label className="
      block
      text-sm
      font-medium
      text-gray-600
      mb-2
    ">
      Payment Status
    </label>

    <select
      value={paymentFilter}
      onChange={(e) =>
        setPaymentFilter(
          e.target.value
        )
      }
      className="
        w-full
        rounded-xl
        border
        px-4
        py-3
      "
    >
      <option value="all">
        All Payments
      </option>

      <option value="unpaid">
        Unpaid
      </option>

      <option value="review">
        Payment Review
      </option>

      <option value="paid">
        Paid
      </option>

      <option value="refunded">
        Refunded
      </option>

    </select>

  </div>

</div>

        </div>

        {/* Table */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">
                  Booking No
                </th>
                <th className="p-4 text-left">
                  Customer
                </th>
                <th className="p-4 text-left">
                  Travel Date
                </th>
                <th className="p-4 text-left">
                  Guests
                </th>
                <th className="p-4 text-left">
                  Total
                </th>
                <th className="p-4 text-left">
                  Payment Status
                </th>
                <th className="p-4 text-left">
                  Booking Status
                </th>
                <th className="p-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>

              {loading ? (
                <tr>
                  <td
                    colSpan="8"
                    className="p-8 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              ) : filteredBookings.length ===
                0 ? (
                <tr>
                  <td
                    colSpan="8"
                    className="p-8 text-center"
                  >
                    No bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map(
                  (booking) => (
                    <tr
                      key={
                        booking.id
                      }
                      className="border-t"
                    >
                      <td className="p-4 font-medium">
                        {
                          booking.booking_number
                        }
                      </td>

                      <td className="p-4">
                        {
                          booking.customer_name
                        }
                      </td>

                      <td className="p-4">
                        {
                          booking.travel_date
                        }
                      </td>

                      <td className="p-4">
                        {
                          booking.guests
                        }
                      </td>

                      <td className="p-4">
                        Rp{" "}
                        {Number(
                          booking.total_price
                        ).toLocaleString(
                          "id-ID"
                        )}
                      </td>

                      <td className="p-4">

  <span
    className={`
      px-2
      py-1
      rounded-full
      text-xs
      font-medium
      ${getPaymentStatusClass(
        booking.payment_status
      )}
    `}
  >
    {formatPaymentStatus(
      booking.payment_status
    )}
  </span>

</td>

<td className="p-4">

  <span
    className={`
      px-2
      py-1
      rounded-full
      text-xs
      font-medium
      ${getBookingStatusClass(
        booking.status
      )}
    `}
  >
    {formatBookingStatus(
      booking.status
    )}
  </span>

</td>

                      <td className="p-4 text-center">
                        <button
                            onClick={() =>
                                navigate(
                                  `/bookings/${booking.id}`
                                )
                              }
                          className="p-2 rounded-lg bg-gray-100"
                        >
                          <Eye
                            size={
                              18
                            }
                          />
                        </button>
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