const { supabaseAdmin } = require("../config/supabase");
const { sendEmail } =
  require("../services/emailService");
const ExcelJS = require("exceljs");
const {
  generateConfirmationHtml,
} = require(
  "../services/confirmationService"
);
const {
  generatePdf,
} = require("../services/pdfService");

exports.createReservation = async (req, res) => {
  try {
    const {
      whatsapp,
      productName,
      adult,
      child,
      infant,
      nationality,
      arrivalDate,
      departureDate,
      hotelName,
      specialRequest,
    } = req.body;

    const user = req.user;

    const { data: profile, error: profileError } =
      await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (profileError) throw profileError;

    const reservationNumber =
      `RES-${Date.now()}`;

    const { data, error } =
      await supabaseAdmin
        .from("reservations")
        .insert({
          reservation_number:
            reservationNumber,

          user_id: user.id,

          full_name:
            profile.full_name,

          email:
            user.email,

          whatsapp,

          product_name:
            productName,

          adult,
          child,
          infant,

          nationality,

          arrival_date:
            arrivalDate,

          departure_date:
            departureDate,

          hotel_name:
            hotelName,

          special_request:
            specialRequest,

          status: "pending",
        })
        .select()
        .single();

    if (error) throw error;

    await sendEmail({
        to: process.env.ADMIN_EMAIL,

        subject:
            `New Reservation - ${productName}`,

        html: `
            <h2>New Reservation Received</h2>

            <p>
            <strong>Name:</strong>
            ${profile.full_name}
            </p>

            <p>
            <strong>Email:</strong>
            ${user.email}
            </p>

            <p>
            <strong>WhatsApp:</strong>
            ${whatsapp}
            </p>

            <p>
            <strong>Product:</strong>
            ${productName}
            </p>

            <p>
            <strong>Arrival:</strong>
            ${arrivalDate}
            </p>

            <p>
            <strong>Departure:</strong>
            ${departureDate}
            </p>

            <p>
            <strong>Guests:</strong>
            ${adult} Adult,
            ${child} Child,
            ${infant} Infant
            </p>

            <p>
            <strong>Nationality:</strong>
            ${nationality}
            </p>

            <p>
            <strong>Hotel:</strong>
            ${hotelName || "-"}
            </p>

            <p>
            <strong>Special Request:</strong>
            </p>

            <p>
            ${specialRequest || "-"}
            </p>
        `,
        });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyReservations =
  async (req, res) => {
    try {
      const { data, error } =
        await supabaseAdmin
          .from("reservations")
          .select("*")
          .eq(
            "user_id",
            req.user.id
          )
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (error) throw error;

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


exports.getReservations =
async (req, res) => {

  try {

    const { data, error } =
      await supabaseAdmin
        .from("reservations")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message,
    });

  }

};

exports.getReservationById =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const { data, error } =
      await supabaseAdmin
        .from("reservations")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {

      return res.status(404).json({
        message:
          "Reservation not found",
      });

    }

    return res.json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message,
    });

  }

};

exports.updateReservation =
async (req, res) => {

  try {

    const { id } = req.params;

    const {
      status,
      admin_notes,
    } = req.body;

    const allowedStatuses = [
      "pending",
      "quoted",
      "awaiting_payment",
      "confirmed",
      "completed",
      "cancelled",
    ];

    if (
      status &&
      !allowedStatuses.includes(status)
    ) {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    const { data, error } =
      await supabaseAdmin
        .from("reservations")
        .update({
          status,
          admin_notes,
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
      message: error.message,
    });

  }

};

const exportReservations = async (
  req,
  res
) => {
  try {

    const {
      data,
      error,
    } = await supabaseAdmin
      .from("reservations")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    const workbook =
      new ExcelJS.Workbook();

    const worksheet =
      workbook.addWorksheet(
        "Reservations"
      );

    worksheet.columns = [
      {
        key: "reservation_number",
        width: 28,
      },
      {
        key: "full_name",
        width: 28,
      },
      {
        key: "email",
        width: 35,
      },
      {
        key: "whatsapp",
        width: 22,
      },
      {
        key: "product_name",
        width: 35,
      },
      {
        key: "arrival_date",
        width: 18,
      },
      {
        key: "status",
        width: 18,
      },
      {
        key: "created_at",
        width: 28,
      },
    ];

    // ===============================
    // TITLE
    // ===============================

    worksheet.mergeCells("A1:H1");

    worksheet.getCell("A1").value =
      "KK DMC";

    worksheet.getRow(1).height = 32;
    worksheet.getRow(2).height = 26;

    worksheet.getCell("A1").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    worksheet.getCell("A2").alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    worksheet.getCell("A1").font = {
      size: 22,
      bold: true,
    };

    worksheet.getCell("A1").alignment = {
      horizontal: "center",
    };

    worksheet.mergeCells("A2:H2");

    worksheet.getCell("A2").value =
      "Reservation Report";

    worksheet.getCell("A2").font = {
      size: 16,
      bold: true,
    };

    worksheet.getCell("A2").alignment = {
      horizontal: "center",
    };

    worksheet.getCell("A4").value =
      `Generated : ${new Date().toLocaleString()}`;

    worksheet.getCell("A5").value =
      `Total Reservation : ${data.length}`;

    worksheet.addRow([]);

    const headerRow =
      worksheet.addRow([
        "Reservation No",
        "Customer",
        "Email",
        "WhatsApp",
        "Product",
        "Arrival Date",
        "Status",
        "Created At",
      ]);

    worksheet.autoFilter = {
      from: "A7",
      to: "H7",
    };

    // Styling Header
    headerRow.eachCell((cell) => {

      cell.font = {
        bold: true,
        color: {
          argb: "FFFFFFFF",
        },
      };

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "14213D",
        },
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
      };

    });

    // Data
    data.forEach(
      (item) => {

        worksheet.addRow({
          reservation_number: item.reservation_number,
          full_name: item.full_name,
          email: item.email,
          whatsapp: item.whatsapp,
          product_name: item.product_name,
          arrival_date: item.arrival_date,
          status: item.status,
          created_at: new Date(item.created_at).toLocaleString(),
        });

      }
    );

    // Border
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

    // Freeze Header
    worksheet.views = [
      {
        state: "frozen",
        ySplit: 7,
      },
    ];

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Reservation_Report_${Date.now()}.xlsx`
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
        "Failed to export reservation report",
    });

  }
};

exports.generateConfirmation =
async (req, res) => {

  try {

    const { id } = req.params;

    const {
      data: reservation,
      error,
    } = await supabaseAdmin
      .from("reservations")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !reservation) {

      return res.status(404).json({
        success:false,
        message:"Reservation not found",
      });

    }

    const html =
      generateConfirmationHtml(
        reservation
      );

    const pdf =
      await generatePdf(html);

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `inline; filename=Confirmation-${reservation.reservation_number}.pdf`
    );

    return res.send(pdf);

  } catch(err){

    console.error(err);

    return res.status(500).json({
      success:false,
      message:err.message,
    });

  }

};

exports.exportReservations =
  exportReservations;