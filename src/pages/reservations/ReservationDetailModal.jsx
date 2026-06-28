import { useState } from "react";

import { X } from "lucide-react";

import { toast } from "react-hot-toast";

import {
  updateReservation,
  downloadConfirmation
} from "../../services/reservationService";



function ReservationDetailModal({
  reservation,
  onClose,
  onSuccess,
}) {

  const [status,
  setStatus] =
  useState(
    reservation?.status ||
    "pending"
  );

  const [adminNotes,
  setAdminNotes] =
  useState(
    reservation?.admin_notes ||
    ""
  );

  const [saving,
  setSaving] =
  useState(false);

  if (!reservation) {
    return null;
  }

  const handleSave =
    async () => {

      try {

        setSaving(true);

        const toastId =
          toast.loading(
            "Updating reservation..."
          );

        await updateReservation(
          reservation.id,
          {
            status,
            admin_notes:
              adminNotes,
          }
        );

        toast.success(
          "Reservation updated",
          {
            id: toastId,
          }
        );

        onSuccess();

        onClose();

      } catch (error) {

        console.error(error);

        toast.error(
          error?.response?.data
            ?.message ||
          "Failed"
        );

      } finally {

        setSaving(false);

      }

    };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/50
        z-50
        flex
        items-center
        justify-center
        p-6
      "
    >

      <div
        className="
          bg-white
          rounded-3xl
          w-full
          max-w-4xl
          max-h-[90vh]
          flex
          flex-col
        "
      >

        {/* Header */}
        <div
          className="
            p-6
            border-b
            flex
            items-center
            justify-between
          "
        >

          <div>

            <h2 className="text-2xl font-bold">
              Reservation Detail
            </h2>

            <p className="text-gray-500">
              {
                reservation.reservation_number
              }
            </p>

          </div>

          <button
            onClick={onClose}
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}
        <div
          className="
            flex-1
            overflow-y-auto
            p-6
            space-y-8
            scrollbar-hide
          "
        >

          {/* Customer */}
          <div>

            <h3
              className="
                text-lg
                font-bold
                mb-4
              "
            >
              Customer Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <Info
                label="Full Name"
                value={
                  reservation.full_name
                }
              />

              <Info
                label="Email"
                value={
                  reservation.email
                }
              />

              <Info
                label="WhatsApp"
                value={
                  reservation.whatsapp
                }
              />

              <Info
                label="Nationality"
                value={
                  reservation.nationality
                }
              />

            </div>

          </div>

          {/* Travel */}
          <div>

            <h3
              className="
                text-lg
                font-bold
                mb-4
              "
            >
              Travel Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              <Info
                label="Product"
                value={
                  reservation.product_name
                }
              />

              <Info
                label="Hotel"
                value={
                  reservation.hotel_name
                }
              />

              <Info
                label="Arrival"
                value={
                  reservation.arrival_date
                }
              />

              <Info
                label="Departure"
                value={
                  reservation.departure_date
                }
              />

            </div>

          </div>

          {/* Guests */}
          <div>

            <h3
              className="
                text-lg
                font-bold
                mb-4
              "
            >
              Guests
            </h3>

            <div className="grid md:grid-cols-3 gap-4">

              <Info
                label="Adult"
                value={
                  reservation.adult
                }
              />

              <Info
                label="Child"
                value={
                  reservation.child
                }
              />

              <Info
                label="Infant"
                value={
                  reservation.infant
                }
              />

            </div>

          </div>

          {/* Special Request */}
          <div>

            <h3
              className="
                text-lg
                font-bold
                mb-4
              "
            >
              Special Request
            </h3>

            <div
              className="
                border
                rounded-2xl
                p-4
                bg-gray-50
              "
            >
              {
                reservation.special_request ||
                "-"
              }
            </div>

          </div>

          {/* Status */}
          <div>

            <h3
              className="
                text-lg
                font-bold
                mb-4
              "
            >
              Reservation Status
            </h3>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value
                )
              }
              className="
                w-full
                h-12
                border
                rounded-xl
                px-4
              "
            >

              <option value="pending">
                Pending
              </option>

              <option value="quoted">
                Quoted
              </option>

              <option value="awaiting_payment">
                Awaiting Payment
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

          {/* Notes */}
          <div>

            <h3
              className="
                text-lg
                font-bold
                mb-4
              "
            >
              Admin Notes
            </h3>

            <textarea
              rows="5"
              value={adminNotes}
              onChange={(e) =>
                setAdminNotes(
                  e.target.value
                )
              }
              className="
                w-full
                border
                rounded-2xl
                p-4
              "
            />

          </div>

        </div>

        {/* Footer */}
        <div
  className="
    border-t
    p-6
    flex
    justify-between
    items-center
  "
>

  <button

    onClick={() =>
      downloadConfirmation(
        reservation.id
      )
    }

    className="
      px-5
      py-3
      rounded-xl
      bg-emerald-600
      text-white
      font-semibold
    "

  >

    Confirmation Letter

  </button>

  <button

    onClick={handleSave}

    disabled={saving}

    className="
      bg-[#14213D]
      text-white
      px-6
      py-3
      rounded-xl
      font-semibold
    "

  >

    {saving
      ? "Saving..."
      : "Save Changes"}

  </button>

</div>

      </div>

    </div>
  );
}

function Info({
  label,
  value,
}) {
  return (
    <div
      className="
        border
        rounded-2xl
        p-4
      "
    >
      <p
        className="
          text-xs
          text-gray-500
          mb-1
        "
      >
        {label}
      </p>

      <p className="font-medium">
        {value || "-"}
      </p>
    </div>
  );
}

export default ReservationDetailModal;