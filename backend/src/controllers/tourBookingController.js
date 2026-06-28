const { supabaseAdmin } =
require("../config/supabase");

const ExcelJS =
require("exceljs");

exports.createBooking =
async (req, res) => {

  try {

    const {
      user_id,
      tour_package_id,
      package_option_id,
      travel_date,
      guests,
    } = req.body;

    // ambil profile

    const {
      data: profile,
      error: profileError,
    } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", user_id)
      .single();

    if (
      profileError ||
      !profile
    ) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    const {
      data: selectedOption,
      error: optionError,
    } = await supabaseAdmin
      .from("package_options")
      .select("*")
      .eq(
        "id",
        package_option_id
      )
      .single();

    if (
      optionError ||
      !selectedOption
    ) {
      return res.status(404).json({
        message:
          "Package option not found",
      });
    }

    const unit_price =
      selectedOption.price;

    const total_price =
      unit_price * guests;

    const bookingNumber =
      `BK-${Date.now()}`;

    const { data, error } =
      await supabaseAdmin
        .from("tour_bookings")
        .insert([
          {
            booking_number:
              bookingNumber,

            source: "website",

            user_id,

            customer_name:
              profile.full_name,

            customer_email:
              profile.email || null,

            customer_whatsapp:
              profile.whatsapp || null,

            tour_package_id,

            package_option_id,

            travel_date,

            guests,

            unit_price,

            total_price,

            status:
              "pending_payment",

            payment_status:
              "unpaid",
          },
        ])
        .select()
        .single();

    if (error) throw error;

    return res.status(201).json(
      data
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.getBookingById =
async (req, res) => {

  const { id } = req.params;

  const { data, error } =
    await supabaseAdmin
      .from("tour_bookings")
      .select(`
        *,
        tour_packages(*),
        package_options(*)
      `)
      .eq("id", id)
      .single();

  if (error) throw error;

  res.json(data);

};

exports.updateBooking =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      booking_type,

      customer_name,
      customer_email,
      customer_whatsapp,
      nationality,

      special_request,
      admin_notes,

      item_name,
      item_description,

      travel_date,
      guests,
      unit_price,
    } = req.body;

    const total_price =
      Number(unit_price || 0) *
      Number(guests || 0);

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("tour_bookings")
      .update({

        customer_name,
        customer_email,
        customer_whatsapp,
        nationality,

        special_request,
        admin_notes,

        booking_type,

        item_name,
        item_description,

        travel_date,
        guests,

        unit_price,
        total_price,

        updated_at:
          new Date().toISOString(),

      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.uploadPaymentProof =
async (req, res) => {

  try {

    const { id } = req.params;

    if (!req.file) {

      return res.status(400).json({
        message:
          "Payment proof is required",
      });

    }

    const fileName =
      `payment-${Date.now()}-${req.file.originalname}`;

    const {
      data: uploadData,
      error: uploadError,
    } = await supabaseAdmin.storage
      .from("payment-proofs")
      .upload(
        fileName,
        req.file.buffer,
        {
          contentType:
            req.file.mimetype,
        }
      );

    if (uploadError)
      throw uploadError;

    const {
      data: publicUrlData,
    } = supabaseAdmin.storage
      .from("payment-proofs")
      .getPublicUrl(
        uploadData.path
      );

    const paymentProofUrl =
      publicUrlData.publicUrl;

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("tour_bookings")
      .update({

        payment_method:
          "bank_transfer",

        payment_proof_url:
          paymentProofUrl,

        payment_status:
          "review",

        status:
          "review",

      })
      .eq("id", id)
      .select()
      .single();

    if (error)
      throw error;

    return res.json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.getMyBookings =
async (req, res) => {

  try {

    const { user_id } =
      req.query;

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("tour_bookings")
      .select(`
        *,
        tour_packages(
          title,
          image_url
        ),
        package_options(
          name
        )
      `)
      .eq(
        "user_id",
        user_id
      )
      .order(
        "created_at",
        {
          ascending:false
        }
      );

    if (error) throw error;

    res.json(data);

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

exports.getAllBookings = async (req, res) => {
  try {

    const { data, error } =
      await supabaseAdmin
        .from("tour_bookings")
        .select(`
          *,
          tour_packages(
            id,
            title
          ),
          package_options(
            id,
            name
          )
        `)
        .order("created_at", {
          ascending: false
        });

    if (error) throw error;

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: error.message
    });

  }
};

exports.createManualBooking =
async (req, res) => {

  try {

    const {
      booking_type,

      customer_name,
      customer_email,
      customer_whatsapp,
      nationality,

      special_request,
      admin_notes,

      tour_package_id,
      package_option_id,

      item_name,
      item_description,

      unit_price,

      travel_date,
      guests,

      payment_method,
    } = req.body;

    let finalUnitPrice = 0;

    let finalPackageId = null;
    let finalOptionId = null;

    if (
      booking_type === "package"
    ) {

      const {
        data: selectedOption,
        error: optionError,
      } = await supabaseAdmin
        .from("package_options")
        .select("*")
        .eq(
          "id",
          package_option_id
        )
        .single();

      if (
        optionError ||
        !selectedOption
      ) {

        return res.status(404).json({
          message:
            "Package option not found",
        });

      }

      finalUnitPrice =
        selectedOption.price;

      finalPackageId =
        tour_package_id;

      finalOptionId =
        package_option_id;

    } else {

      finalUnitPrice =
        Number(unit_price || 0);

    }

    const total_price =
      finalUnitPrice *
      Number(guests);

    const bookingNumber =
      `BK-${Date.now()}`;

    const isPaid =
      payment_method === "cash";

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("tour_bookings")
      .insert([
        {

          booking_number:
            bookingNumber,

          source:
            "admin",

          booking_type,

          customer_name,
          customer_email,
          customer_whatsapp,
          nationality,

          special_request,
          admin_notes,

          tour_package_id:
            finalPackageId,

          package_option_id:
            finalOptionId,

          item_name,
          item_description,

          travel_date,

          guests,

          unit_price:
            finalUnitPrice,

          total_price,

          payment_method,

          payment_status:
            isPaid
              ? "paid"
              : "unpaid",

          status:
            isPaid
              ? "confirmed"
              : "pending_payment",
        },
      ])
      .select()
      .single();

    if (error)
      throw error;

    res.status(201).json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.updatePaymentStatus =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      payment_status
    } = req.body;

    const {
      data,
      error
    } = await supabaseAdmin
      .from("tour_bookings")
      .update({
        payment_status
      })
      .eq("id", id)
      .select()
      .single();

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};

exports.updateBookingStatus =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const { status } =
      req.body;

    const {
      data,
      error
    } = await supabaseAdmin
      .from("tour_bookings")
      .update({
        status
      })
      .eq("id", id)
      .select()
      .single();

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};

exports.deleteBooking =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const { error } =
      await supabaseAdmin
        .from("tour_bookings")
        .delete()
        .eq("id", id);

    if (error)
      throw error;

    res.json({
      message:
        "Booking deleted"
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};

exports.updateAdminNotes =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      admin_notes
    } = req.body;

    const {
      data,
      error
    } = await supabaseAdmin
      .from("tour_bookings")
      .update({
        admin_notes,
        updated_at:
          new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.exportBookings =
async (req, res) => {

  try {

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("tour_bookings")
      .select(`
        *,
        tour_packages(
          title
        ),
        package_options(
          name
        )
      `)
      .order(
        "created_at",
        {
          ascending: false,
        }
      );

    if (error)
      throw error;

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet(
        "Bookings"
      );

    worksheet.columns = [
      {
        key: "booking_number",
        width: 25,
      },
      {
        key: "customer_name",
        width: 28,
      },
      {
        key: "customer_email",
        width: 32,
      },
      {
        key: "customer_whatsapp",
        width: 20,
      },
      {
        key: "product",
        width: 35,
      },
      {
        key: "travel_date",
        width: 18,
      },
      {
        key: "guests",
        width: 12,
      },
      {
        key: "total_price",
        width: 18,
      },
      {
        key: "payment_status",
        width: 18,
      },
      {
        key: "status",
        width: 18,
      },
      {
        key: "created_at",
        width: 24,
      },
    ];

    const headerRow =
      worksheet.addRow([
        "Booking No",
        "Customer",
        "Email",
        "WhatsApp",
        "Product",
        "Travel Date",
        "Guests",
        "Total Price",
        "Payment",
        "Booking Status",
        "Created At",
      ]);

    headerRow.eachCell(
      (cell) => {

        cell.font = {
          bold: true,
          color: {
            argb:
              "FFFFFFFF",
          },
        };

        cell.fill = {
          type:
            "pattern",
          pattern:
            "solid",
          fgColor: {
            argb:
              "14213D",
          },
        };

        cell.alignment = {
          horizontal:
            "center",
          vertical:
            "middle",
        };

      }
    );

    worksheet.autoFilter = {
      from: "A1",
      to: "K1",
    };

    data.forEach(
      (item) => {

        worksheet.addRow({

          booking_number:
            item.booking_number,

          customer_name:
            item.customer_name,

          customer_email:
            item.customer_email,

          customer_whatsapp:
            item.customer_whatsapp,

          product:
            item.booking_type ===
            "manual"
              ? item.item_name
              : item.tour_packages
                  ?.title,

          travel_date:
            item.travel_date,

          guests:
            item.guests,

          total_price:
            item.total_price,

          payment_status:
            item.payment_status,

          status:
            item.status,

          created_at:
            new Date(
              item.created_at
            ).toLocaleString(),

        });

      }
    );

    worksheet.eachRow(
      (row) => {

        row.eachCell(
          (cell) => {

            cell.border = {

              top: {
                style:
                  "thin",
              },

              left: {
                style:
                  "thin",
              },

              bottom: {
                style:
                  "thin",
              },

              right: {
                style:
                  "thin",
              },

            };

          }
        );

      }
    );

    worksheet.views = [
      {
        state:
          "frozen",
        ySplit: 1,
      },
    ];

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Booking_Report_${Date.now()}.xlsx`
    );

    await workbook.xlsx.write(
      res
    );

    res.end();

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message:
        "Failed to export booking report",

    });

  }

};