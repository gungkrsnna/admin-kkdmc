const { supabaseAdmin } =
require("../config/supabase");

exports.getCustomers =
async (req, res) => {

  try {

    const { data: profiles, error }
      = await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq(
          "role",
          "customer"
        )
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) throw error;

    const customers =
      await Promise.all(

        profiles.map(
          async (
            customer
          ) => {

            const {
              data: userData,
            } =
              await supabaseAdmin
                .auth
                .admin
                .getUserById(
                  customer.id
                );

            const {
              count:
                inquiryCount,
            } =
              await supabaseAdmin
                .from(
                  "inquiries"
                )
                .select(
                  "*",
                  {
                    count:
                      "exact",
                    head: true,
                  }
                )
                .eq(
                  "user_id",
                  customer.id
                );

            const {
              count:
                reservationCount,
            } =
              await supabaseAdmin
                .from(
                  "reservations"
                )
                .select(
                  "*",
                  {
                    count:
                      "exact",
                    head: true,
                  }
                )
                .eq(
                  "user_id",
                  customer.id
                );

            return {

              ...customer,

              email:
                userData?.user
                  ?.email ||
                "-",

              inquiry_count:
                inquiryCount ||
                0,

              reservation_count:
                reservationCount ||
                0,

            };

          }
        )

      );

    return res.json(
      customers
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.getCustomerById =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      data: profile,
      error,
    } =
      await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();

    if (
      error ||
      !profile
    ) {

      return res.status(404).json({
        message:
          "Customer not found",
      });

    }

    const {
      data: userData,
    } =
      await supabaseAdmin
        .auth
        .admin
        .getUserById(id);

    const {
      data: inquiries,
    } =
      await supabaseAdmin
        .from("inquiries")
        .select("*")
        .eq(
          "user_id",
          id
        );

    const {
      data: reservations,
    } =
      await supabaseAdmin
        .from(
          "reservations"
        )
        .select("*")
        .eq(
          "user_id",
          id
        );

    return res.json({

      ...profile,

      email:
        userData?.user
          ?.email,

      inquiries,

      reservations,

    });

  } catch (error) {

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

