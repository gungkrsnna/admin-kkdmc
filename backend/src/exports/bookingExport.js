const ExcelJS = require("exceljs");

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

    // Header Report
    worksheet.mergeCells(
      "A1:H1"
    );

    worksheet.getCell(
      "A1"
    ).value =
      "KK DMC Reservation Report";

    worksheet.getCell(
      "A1"
    ).font = {
      bold: true,
      size: 18,
    };

    worksheet.getCell(
      "A2"
    ).value =
      `Generated : ${new Date().toLocaleString()}`;

    worksheet.addRow([]);

    // Header Table
    worksheet.columns = [
      {
        header:
          "Reservation No",
        key:
          "reservation_number",
        width: 25,
      },
      {
        header:
          "Customer",
        key: "full_name",
        width: 25,
      },
      {
        header:
          "Email",
        key: "email",
        width: 30,
      },
      {
        header:
          "Phone",
        key: "phone",
        width: 20,
      },
      {
        header:
          "Product",
        key:
          "product_name",
        width: 30,
      },
      {
        header:
          "Arrival",
        key:
          "arrival_date",
        width: 18,
      },
      {
        header:
          "Status",
        key: "status",
        width: 18,
      },
      {
        header:
          "Created",
        key:
          "created_at",
        width: 22,
      },
    ];

    // Styling Header
    worksheet
      .getRow(4)
      .eachCell(
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

        }
      );

    // Data
    data.forEach(
      (item) => {

        worksheet.addRow({
          reservation_number:
            item.reservation_number,
          full_name:
            item.full_name,
          email:
            item.email,
          phone:
            item.phone,
          product_name:
            item.product_name,
          arrival_date:
            item.arrival_date,
          status:
            item.status,
          created_at:
            new Date(
              item.created_at
            ).toLocaleString(),
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
        state:
          "frozen",
        ySplit: 4,
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

module.exports = {
  exportReservations,
};