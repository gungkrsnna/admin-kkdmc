import {
    useEffect,
    useState,
  } from "react";
  
  import {
    useParams,
    useNavigate,
  } from "react-router-dom";
  
  import {
    ArrowLeft,
  } from "lucide-react";
  
  import AdminLayout
  from "../../layouts/AdminLayout";
  
  import {
    getBookingById,
    updateBookingStatus,
  updatePaymentStatus,
  updateAdminNotes,
  } from "../../services/bookingService";

  import {
    formatBookingStatus,
    getBookingStatusClass,
    formatPaymentStatus,
    getPaymentStatusClass,
    formatPaymentMethod,
    formatBookingSource
  } from "../../utils/bookingStatus";

  import { toast }
from "react-hot-toast";
  
  export default function BookingDetailPage() {
  
    const { id } =
      useParams();

      const [adminNotes, setAdminNotes] =
  useState("");
  
    const navigate =
      useNavigate();
  
    const [booking,setBooking] =
      useState(null);
  
    const [loading,setLoading] =
      useState(true);
  
    useEffect(() => {
      loadBooking();
    }, [id]);
  
    const loadBooking =
  async () => {

    try {

      const data =
        await getBookingById(id);

      setBooking(data);

      setAdminNotes(
        data.admin_notes || ""
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

      const handleBookingStatus =
  async (status) => {

    try {

      await updateBookingStatus(
        booking.id,
        status
      );

      loadBooking();

      toast.success(
        "Booking status updated"
      );

    } catch (error) {

      console.error(error);

    }

};

const handleSaveNotes =
  async () => {

    try {

      await updateAdminNotes(
        booking.id,
        adminNotes
      );

      toast.success(
        "Notes saved"
      );

      loadBooking();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to save notes"
      );

    }

};

const handlePaymentStatus =
  async (paymentStatus) => {

    try {

      await updatePaymentStatus(
        booking.id,
        paymentStatus
      );

      loadBooking();

      toast.success(
        "Payment status updated"
      );

    } catch (error) {

      console.error(error);

    }

};
  
    if (loading) {
      return (
        <AdminLayout>
          <div className="p-6">
            Loading...
          </div>
        </AdminLayout>
      );
    }
  
    if (!booking) {
      return (
        <AdminLayout>
          <div className="p-6">
            Booking not found
          </div>
        </AdminLayout>
      );
    }
  
    return (
      <AdminLayout>
  
        <div className="space-y-6">
  
          {/* Header */}
  
          <div className="flex items-start justify-between">

<div className="flex items-center gap-3">

  <button
    onClick={() =>
      navigate("/bookings")
    }
    className="
      p-2
      rounded-lg
      border
    "
  >
    <ArrowLeft size={18}/>
  </button>

  <div>

    <h1 className="
      text-3xl
      font-bold
    ">
      {booking.booking_number}
    </h1>

    <p className="text-gray-500">
      Booking Detail
    </p>

  </div>

</div>

<div className="flex gap-2">

  <span
    className={`
      px-3 py-1
      rounded-full
      text-sm
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

            <span
                className={`
                px-3 py-1
                rounded-full
                text-sm
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

            </div>

            </div>

            <div className="
  bg-white
  rounded-2xl
  p-6
  shadow-sm
">

  <h2 className="
    text-lg
    font-semibold
    mb-5
  ">
    Booking Actions
  </h2>

  <div className="space-y-5">

    <div>

      <p className="
        text-sm
        text-gray-500
        mb-2
      ">
        Booking Status
      </p>

      <div className="
        flex
        flex-wrap
        gap-2
      ">

        {[
          "draft",
          "pending_payment",
          "review",
          "confirmed",
          "completed",
          "cancelled",
        ].map((status) => (

          <button
            key={status}
            onClick={() =>
              handleBookingStatus(
                status
              )
            }
            disabled={
                booking.status === status
              }
              className={`
                px-3
                py-2
                rounded-lg
                border
              
                ${
                  booking.status === status
                    ? "bg-primary text-white opacity-70 cursor-not-allowed"
                    : "hover:bg-gray-50"
                }
              `}
          >
            {formatBookingStatus(
              status
            )}
          </button>

        ))}

      </div>

    </div>

    <div>

      <p className="
        text-sm
        text-gray-500
        mb-2
      ">
        Payment Status
      </p>

      <div className="
        flex
        flex-wrap
        gap-2
      ">

        {[
          "unpaid",
          "review",
          "paid",
          "refunded",
        ].map((status) => (

          <button
            key={status}
            onClick={() =>
              handlePaymentStatus(
                status
              )
            }
            disabled={
                booking.payment_status ===
                status
              }
            className={`
              px-3
              py-2
              rounded-lg
              border

              ${
                booking.payment_status ===
                status
                  ? "bg-green-600 text-white"
                  : ""
              }
            `}
          >
            {formatPaymentStatus(
              status
            )}
          </button>

        ))}

      </div>

    </div>

  </div>

</div>
  
          {/* Row 1 */}
  
          <div className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          ">
  
            {/* Customer */}
  
            <div className="
              bg-white
              rounded-2xl
              p-6
              shadow-sm
            ">
  
              <h2 className="
                text-lg
                font-semibold
                mb-4
              ">
                Customer Information
              </h2>
  
              <div className="space-y-3">
  
                <InfoRow
                  label="Name"
                  value={
                    booking.customer_name
                  }
                />
  
                <InfoRow
                  label="Email"
                  value={
                    booking.customer_email
                  }
                />
  
                <InfoRow
                  label="Whatsapp"
                  value={
                    booking.customer_whatsapp
                  }
                />
  
                <InfoRow
                  label="Nationality"
                  value={
                    booking.nationality
                  }
                />
  
              </div>
  
            </div>
  
            {/* Booking */}
  
            <div className="
              bg-white
              rounded-2xl
              p-6
              shadow-sm
            ">
  
              <h2 className="
                text-lg
                font-semibold
                mb-4
              ">
                Booking Summary
              </h2>
  
<div className="space-y-3">

  <InfoRow
    label="Booking Type"
    value={
      booking.booking_type === "manual"
        ? "Manual Booking"
        : "Package Booking"
    }
  />

  <InfoRow
    label="Travel Date"
    value={
      booking.travel_date
        ? new Date(
            booking.travel_date
          ).toLocaleDateString(
            "id-ID",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )
        : "-"
    }
  />

  <InfoRow
    label="Guests"
    value={booking.guests}
  />

  {booking.booking_type === "manual" ? (
    <>
      <InfoRow
        label="Booking Item"
        value={booking.item_name}
      />

      <InfoRow
        label="Description"
        value={
          booking.item_description
        }
      />
    </>
  ) : (
    <>
      <InfoRow
        label="Package"
        value={
          booking?.tour_packages
            ?.title
        }
      />

      <InfoRow
        label="Option"
        value={
          booking?.package_options
            ?.name
        }
      />
    </>
  )}

</div>
  
            </div>
  
          </div>
  
          {/* Payment */}
  
          <div className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
          ">
  
            <h2 className="
              text-lg
              font-semibold
              mb-4
            ">
              Payment Information
            </h2>
  
            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-4
            ">
  
  <InfoRow
  label="Method"
  value={formatPaymentMethod(
    booking.payment_method
  )}
/>
  
  <div>

<p className="
  text-sm
  text-gray-500
">
  Payment Status
</p>

<span
  className={`
    inline-flex
    mt-1
    px-3 py-1
    rounded-full
    text-sm
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

</div>
  
              <InfoRow
                label="Unit Price"
                value={`Rp ${Number(
                  booking.unit_price
                ).toLocaleString(
                  "id-ID"
                )}`}
              />
  
              <InfoRow
                label="Total"
                value={`Rp ${Number(
                  booking.total_price
                ).toLocaleString(
                  "id-ID"
                )}`}
              />
  
            </div>
  
          </div>


          {/* Payment Proof */}

<div className="
  bg-white
  rounded-2xl
  p-6
  shadow-sm
">

  <h2 className="
    text-lg
    font-semibold
    mb-4
  ">
    Payment Proof
  </h2>

  {!booking.payment_proof_url ? (

    <div className="
      border
      border-dashed
      rounded-xl
      p-10
      text-center
      text-gray-500
    ">
      No payment proof uploaded
    </div>

  ) : (

    <div className="space-y-4">

      <img
        src={booking.payment_proof_url}
        alt="Payment Proof"
        className="
          max-w-md
          rounded-xl
          border
        "
      />

      <a
        href={
          booking.payment_proof_url
        }
        target="_blank"
        rel="noreferrer"
        className="
          inline-flex
          px-4
          py-2
          rounded-lg
          bg-primary
          text-white
        "
      >
        Open Full Image
      </a>

    </div>

  )}

</div>

                
                {/* Booking Information */}

<div className="
  bg-white
  rounded-2xl
  p-6
  shadow-sm
">

  <h2 className="
    text-lg
    font-semibold
    mb-4
  ">
    Booking Information
  </h2>

  <div className="
    grid
    grid-cols-1
    md:grid-cols-2
    gap-4
  ">

<InfoRow
  label="Source"
  value={formatBookingSource(
    booking.source
  )}
/>

    <InfoRow
      label="Created At"
      value={
        booking.created_at
          ? new Date(
              booking.created_at
            ).toLocaleString(
              "id-ID"
            )
          : "-"
      }
    />

    <InfoRow
      label="Booking Status"
      value={formatBookingStatus(
        booking.status
      )}
    />

    <InfoRow
      label="Guests"
      value={booking.guests}
    />

  </div>

</div>

  
          {/* Special Request */}
  
          <div className="
            bg-white
            rounded-2xl
            p-6
            shadow-sm
          ">
  
            <h2 className="
              text-lg
              font-semibold
              mb-4
            ">
              Special Request
            </h2>
  
            <p>
              {booking.special_request ||
                "-"}
            </p>
  
          </div>

          {/* Admin Notes */}

<div className="
  bg-white
  rounded-2xl
  p-6
  shadow-sm
">

  <h2 className="
    text-lg
    font-semibold
    mb-4
  ">
    Admin Notes
  </h2>

  <textarea
  rows={6}
  value={adminNotes}
  onChange={(e) =>
    setAdminNotes(
      e.target.value
    )
  }
  className="
    w-full
    rounded-xl
    border
    p-4
  "
/>

<button
  onClick={
    handleSaveNotes
  }
  className="
    mt-4
    px-4
    py-2
    rounded-lg
    bg-primary
    text-white
  "
>
  Save Notes
</button>

</div>
  
        </div>
  
      </AdminLayout>
    );
  }
  
  function InfoRow({
    label,
    value,
  }) {
  
    return (
      <div>
  
        <p className="
          text-sm
          text-gray-500
        ">
          {label}
        </p>
  
        <p className="font-medium">
          {value || "-"}
        </p>
  
      </div>
    );
  }