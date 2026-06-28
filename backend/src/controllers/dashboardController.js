const { supabaseAdmin } =
require("../config/supabase");

exports.getDashboard =
async (req, res) => {

  try {

    const [
      bookingsResult,
      inquiriesResult,
      customersResult,
      invoicesResult,
    ] = await Promise.all([

      supabaseAdmin
        .from("tour_bookings")
        .select("*"),

      supabaseAdmin
        .from("inquiries")
        .select("*"),

      supabaseAdmin
        .from("customers")
        .select("*"),

      supabaseAdmin
        .from("invoices")
        .select("*"),

    ]);

    const bookings =
      bookingsResult.data || [];

    const inquiries =
      inquiriesResult.data || [];

    const customers =
      customersResult.data || [];

    const invoices =
      invoicesResult.data || [];

    
const pendingPayments =
bookings.filter(
  b =>
    b.status ===
    "pending_payment"
).length;

const paymentReviews =
bookings.filter(
  b =>
    b.status ===
    "review"
).length;

const confirmedTours =
bookings.filter(
  b =>
    b.status ===
    "confirmed"
).length;

const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  const bookingTrend =
    monthNames.map(
      (month, index) => {
  
        const total =
          bookings.filter(
            booking => {
  
              if (
                !booking.travel_date
              ) {
                return false;
              }
  
              const travelDate =
                new Date(
                  booking.travel_date
                );
  
              return (
                travelDate.getMonth() ===
                index
              );
  
            }
          ).length;
  
        return {
          month,
          total,
        };
  
      }
    );

const bookingChart = [

  {
    status: "Pending Payment",
    total: bookings.filter(
      b => b.status ===
      "pending_payment"
    ).length,
  },

  {
    status: "Payment Review",
    total: bookings.filter(
      b => b.status ===
      "review"
    ).length,
  },

  {
    status: "Confirmed",
    total: bookings.filter(
      b => b.status ===
      "confirmed"
    ).length,
  },

  {
    status: "Completed",
    total: bookings.filter(
      b => b.status ===
      "completed"
    ).length,
  },

  {
    status: "Cancelled",
    total: bookings.filter(
      b => b.status ===
      "cancelled"
    ).length,
  },

];

    const totalRevenue =
      invoices.reduce(
        (sum, invoice) =>
          sum +
          Number(
            invoice.total_amount || 0
          ),
        0
      );

    const recentBookings =
      bookings
        .sort(
          (a, b) =>
            new Date(
              b.created_at
            ) -
            new Date(
              a.created_at
            )
        )
        .slice(0, 5);

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const upcomingBookings =
      bookings
        .filter(
          booking =>
            booking.travel_date >=
            today
        )
        .sort(
          (a, b) =>
            new Date(
              a.travel_date
            ) -
            new Date(
              b.travel_date
            )
        )
        .slice(0, 5);

        return res.json({

            totalBookings:
              bookings.length,
          
            pendingPayments,
          
            paymentReviews,
          
            confirmedTours,
          
            totalCustomers:
              customers.length,
          
            totalInquiries:
              inquiries.length,
          
            totalInvoices:
              invoices.length,
          
            totalRevenue,
          
            bookingChart,
          
            recentBookings,
          
            upcomingBookings,

            bookingTrend,
          
          });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        error.message,
    });

  }

};
