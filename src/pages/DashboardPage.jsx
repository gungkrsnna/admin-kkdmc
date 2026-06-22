import {
  useEffect,
  useState,
} from "react";

import {
  Calendar,
  Users,
  MessageSquare,
  FileText,
} from "lucide-react";

import AdminLayout
from "../layouts/AdminLayout";

import {
  getDashboard,
} from "../services/dashboardService";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function DashboardPage() {

  const [dashboard,
    setDashboard] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard =
    async () => {

      try {

        const data =
          await getDashboard();

        setDashboard(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

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

  return (

    <AdminLayout>

      <div className="space-y-6">

        <div>

          <h1 className="
            text-3xl
            font-bold
          ">
            Dashboard
          </h1>

          <p className="
            text-gray-500
          ">
            Welcome back
          </p>

        </div>

        {/* KPI */}

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-4
        ">

          <DashboardCard
            title="Bookings"
            value={
              dashboard.totalBookings
            }
            icon={
              <Calendar
                size={20}
              />
            }
          />

<DashboardCard
  title="Pending Payment"
  value={
    dashboard.pendingPayments
  }
/>

<DashboardCard
  title="Payment Review"
  value={
    dashboard.paymentReviews
  }
/>

<DashboardCard
  title="Confirmed Tours"
  value={
    dashboard.confirmedTours
  }
/>

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
  mb-4
">
  Booking Trend This Year
</h2>

  <div className="h-80">
    {/* chart */}

    <ResponsiveContainer
  width="100%"
  height="100%"
>

<LineChart
  data={
    dashboard.bookingTrend
  }
>

  <CartesianGrid
    strokeDasharray="3 3"
  />

  <XAxis
    dataKey="month"
  />

  <YAxis />

  <Tooltip />

  <Line
  type="monotone"
  dataKey="total"
  stroke="#14213D"
  strokeWidth={3}
  dot={{
    r: 4,
  }}
/>

</LineChart>

</ResponsiveContainer>
  </div>

</div>

        {/* Content */}

        <div className="
          grid
          grid-cols-1
          xl:grid-cols-2
          gap-6
        ">

          {/* Recent Bookings */}

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
              Recent Bookings
            </h2>

            <div className="
              divide-y
            ">

              {dashboard
                .recentBookings
                ?.map(
                  booking => (

                    <div
                      key={
                        booking.id
                      }
                      className="
                        py-3
                      "
                    >

                      <p className="
                        font-medium
                      ">
                        {
                          booking.customer_name
                        }
                      </p>

                      <p className="
                        text-sm
                        text-gray-500
                      ">
                        {
                          booking.booking_number
                        }
                      </p>

                    </div>

                  )
                )}

            </div>

          </div>

          {/* Upcoming Tours */}

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
              Upcoming Tours
            </h2>

            <div className="
              divide-y
            ">

              {dashboard
                .upcomingBookings
                ?.map(
                  booking => (

                    <div
                      key={
                        booking.id
                      }
                      className="
                        py-3
                      "
                    >

                      <p className="
                        font-medium
                      ">
                        {
                          booking.customer_name
                        }
                      </p>

                      <p className="
                        text-sm
                        text-gray-500
                      ">
                        {
                          booking.travel_date
                        }
                      </p>

                    </div>

                  )
                )}

            </div>

          </div>

        </div>

      </div>

    </AdminLayout>

  );

}

function DashboardCard({
  title,
  value,
  icon,
}) {

  return (

    <div className="
      bg-white
      rounded-2xl
      p-6
      shadow-sm
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <span className="
          text-gray-500
        ">
          {title}
        </span>

        {icon}

      </div>

      <h2 className="
        text-3xl
        font-bold
        mt-4
      ">
        {value}
      </h2>

    </div>

  );

}