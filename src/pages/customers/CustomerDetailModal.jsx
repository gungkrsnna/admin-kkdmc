import {
  useEffect,
  useState,
} from "react";

import { X } from "lucide-react";

import {
  getCustomerById,
} from "../../services/customerService";

function CustomerDetailModal({
  customer,
  onClose,
}) {

  const [loading,
  setLoading] =
  useState(false);

  const [detail,
  setDetail] =
  useState(null);

  useEffect(() => {

    if (
      customer?.id
    ) {

      loadDetail();

    }

  }, [customer]);

  const loadDetail =
    async () => {

      try {

        setLoading(true);

        const data =
          await getCustomerById(
            customer.id
          );

        setDetail(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  if (!customer)
    return null;

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
          max-w-5xl
          max-h-[90vh]
          overflow-hidden
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
              Customer Detail
            </h2>

            <p className="text-gray-500">
              Customer profile & activity
            </p>

          </div>

          <button
            onClick={onClose}
          >
            <X size={22} />
          </button>

        </div>

        {/* Content */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-6
            space-y-8
            scrollbar-hide
          "
        >

          {loading ? (

            <div className="text-center py-20">
              Loading...
            </div>

          ) : detail ? (

            <>

              {/* Profile */}

              <div>

                <h3
                  className="
                    text-lg
                    font-bold
                    mb-4
                  "
                >
                  Profile Information
                </h3>

                <div
                  className="
                    grid
                    md:grid-cols-2
                    gap-4
                  "
                >

                  <InfoCard
                    label="Full Name"
                    value={
                      detail.full_name
                    }
                  />

                  <InfoCard
                    label="Email"
                    value={
                      detail.email
                    }
                  />

                  <InfoCard
                    label="Role"
                    value={
                      detail.role
                    }
                  />

                  <InfoCard
                    label="Joined"
                    value={new Date(
                      detail.created_at
                    ).toLocaleString()}
                  />

                </div>

              </div>

              {/* Statistics */}

              <div>

                <h3
                  className="
                    text-lg
                    font-bold
                    mb-4
                  "
                >
                  Activity Summary
                </h3>

                <div
                  className="
                    grid
                    md:grid-cols-2
                    gap-4
                  "
                >

                  <StatCard
                    title="Total Inquiries"
                    value={
                      detail.inquiries
                        ?.length || 0
                    }
                  />

                  <StatCard
                    title="Total Reservations"
                    value={
                      detail.reservations
                        ?.length || 0
                    }
                  />

                </div>

              </div>

              {/* Inquiries */}

              <div>

                <h3
                  className="
                    text-lg
                    font-bold
                    mb-4
                  "
                >
                  Inquiry History
                </h3>

                {detail.inquiries
                  ?.length === 0 ? (

                  <EmptyState
                    text="No inquiries"
                  />

                ) : (

                  <div className="space-y-3">

                    {detail.inquiries.map(
                      (
                        inquiry
                      ) => (

                        <div
                          key={
                            inquiry.id
                          }
                          className="
                            border
                            rounded-2xl
                            p-4
                          "
                        >

                          <div
                            className="
                              flex
                              justify-between
                              mb-2
                            "
                          >

                            <span className="font-semibold">

                              {
                                inquiry.destination
                              }

                            </span>

                            <span className="text-sm text-gray-500">

                              {
                                inquiry.status
                              }

                            </span>

                          </div>

                          <p className="text-gray-600 text-sm">

                            {
                              inquiry.inquiry
                            }

                          </p>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

              {/* Reservations */}

              <div>

                <h3
                  className="
                    text-lg
                    font-bold
                    mb-4
                  "
                >
                  Reservation History
                </h3>

                {detail.reservations
                  ?.length === 0 ? (

                  <EmptyState
                    text="No reservations"
                  />

                ) : (

                  <div className="space-y-3">

                    {detail.reservations.map(
                      (
                        reservation
                      ) => (

                        <div
                          key={
                            reservation.id
                          }
                          className="
                            border
                            rounded-2xl
                            p-4
                          "
                        >

                          <div
                            className="
                              flex
                              justify-between
                              mb-2
                            "
                          >

                            <span className="font-semibold">

                              {
                                reservation.product_name
                              }

                            </span>

                            <span className="text-sm text-gray-500">

                              {
                                reservation.status
                              }

                            </span>

                          </div>

                          <p className="text-sm text-gray-500">

                            Arrival:
                            {" "}
                            {
                              reservation.arrival_date
                            }

                          </p>

                          <p className="text-sm text-gray-500">

                            Departure:
                            {" "}
                            {
                              reservation.departure_date
                            }

                          </p>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>

            </>

          ) : null}

        </div>

      </div>

    </div>
  );
}

function InfoCard({
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
      <p className="text-xs text-gray-500">
        {label}
      </p>

      <p className="font-semibold mt-1">
        {value || "-"}
      </p>
    </div>
  );
}

function StatCard({
  title,
  value,
}) {
  return (
    <div
      className="
        bg-gray-50
        rounded-2xl
        p-5
      "
    >
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <p className="text-3xl font-black mt-2">
        {value}
      </p>
    </div>
  );
}

function EmptyState({
  text,
}) {
  return (
    <div
      className="
        border
        border-dashed
        rounded-2xl
        p-8
        text-center
        text-gray-500
      "
    >
      {text}
    </div>
  );
}

export default CustomerDetailModal;