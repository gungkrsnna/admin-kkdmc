const { supabaseAdmin } =
require("../config/supabase");
const puppeteer = require("puppeteer");
const {
  generateInvoiceHtml,
} = require(
  "../templates/invoiceTemplate"
);

const fs = require("fs");
const path = require("path");

const logoPath = path.join(
  __dirname,
  "../assets/logo.png"
);

const logoBase64 =
  fs.readFileSync(logoPath, {
    encoding: "base64",
  });

function generateInvoiceNumber() {

  const now = new Date();

  const year =
    String(
      now.getFullYear()
    ).slice(-2);

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");

  const random =
    String(
      Math.floor(
        Math.random() * 9999
      )
    ).padStart(4, "0");

  return `INV-${year}${month}-${random}`;
}

exports.getInvoices =
async (req, res) => {

  try {

    const { data, error } =
      await supabaseAdmin
        .from("invoices")
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

exports.getInvoiceById =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const { data, error } =
      await supabaseAdmin
        .from("invoices")
        .select("*")
        .eq("id", id)
        .single();

    if (
      error ||
      !data
    ) {

      return res.status(404).json({
        message:
          "Invoice not found",
      });

    }

    const {
      data: items,
    } =
      await supabaseAdmin
        .from(
          "invoice_items"
        )
        .select("*")
        .eq(
          "invoice_id",
          id
        );

    return res.json({
      ...data,
      items,
    });

  } catch (error) {

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.createInvoice =
async (req, res) => {

  try {

    const {
      customer_id,
      customer_name,
      customer_email,
      customer_whatsapp,
      invoice_date,
      due_date,
      sales_in_charge,
      payment_term,
      notes,
      tax_percentage,
    } = req.body;

    const invoiceNumber =
      generateInvoiceNumber();

    const taxPercentage =
      Number(tax_percentage || 0);

    const { data, error } =
      await supabaseAdmin
        .from("invoices")
        .insert([
          {
            invoice_number:
              invoiceNumber,

            customer_id,

            customer_name,

            customer_email,

            customer_whatsapp,

            invoice_date,

            due_date,

            sales_in_charge,

            payment_term,

            notes,

            subtotal: 0,

            tax_percentage: taxPercentage,
            tax_amount: 0,
            total_amount: 0,
            paid_amount: 0,
            balance_amount: 0,

            status: "draft",
          },
        ])
        .select()
        .single();

    if (error) throw error;

    return res.status(201).json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.updateInvoice =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      customer_name,
      customer_email,
      customer_whatsapp,
      invoice_date,
      due_date,
      sales_in_charge,
      payment_term,
      notes,
      status,
      tax_percentage,
    } = req.body;

    const { data, error } =
      await supabaseAdmin
        .from("invoices")
        .update({
          customer_name,
          customer_email,
          customer_whatsapp,
          invoice_date,
          due_date,
          sales_in_charge,
          payment_term,
          notes,
          status,
          tax_percentage:
            Number(tax_percentage || 0),
          updated_at:
            new Date()
              .toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    await recalculateInvoice(id);

    const {
      data: refreshedInvoice,
    } = await supabaseAdmin
      .from("invoices")
      .select("*")
      .eq("id", id)
      .single();

    return res.json(refreshedInvoice);

  } catch (error) {

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.deleteInvoice =
async (req, res) => {

  try {

    const { id } =
      req.params;

    await supabaseAdmin
      .from("invoices")
      .delete()
      .eq("id", id);

    return res.json({
      success: true,
    });

  } catch (error) {

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.addInvoiceItem =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      service_date,
      description,
      pax,
      volume,
      unit_price,
    } = req.body;

    const total_price =
      Number(pax) *
      Number(unit_price);

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from("invoice_items")
        .insert([
          {
            invoice_id: id,

            service_date,
            description,

            pax,
            volume,

            unit_price,
            total_price,
          },
        ])
        .select()
        .single();

    if (error) throw error;

    await recalculateInvoice(
      id
    );

    return res.status(201).json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.deleteInvoiceItem =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      data: item,
    } =
      await supabaseAdmin
        .from(
          "invoice_items"
        )
        .select("*")
        .eq("id", id)
        .single();

    await supabaseAdmin
      .from(
        "invoice_items"
      )
      .delete()
      .eq("id", id);

    await recalculateInvoice(
      item.invoice_id
    );

    return res.json({
      success: true,
    });

  } catch (error) {

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

async function recalculateInvoice(
  invoiceId
) {

  const {
    data: items,
  } =
    await supabaseAdmin
      .from(
        "invoice_items"
      )
      .select("*")
      .eq(
        "invoice_id",
        invoiceId
      );

  const subtotal =
  items.reduce(
    (total, item) =>
      total +
      Number(item.total_price),
    0
  );

  const {
    data: invoice,
  } = await supabaseAdmin
    .from("invoices")
    .select(`
      tax_percentage,
      paid_amount
    `)
    .eq("id", invoiceId)
    .single();

  const taxPercentage =
    Number(
      invoice.tax_percentage || 0
    );

  const taxAmount =
    subtotal *
    (taxPercentage / 100);

  const paidAmount =
    Number(
      invoice.paid_amount || 0
    );

    const totalAmount =
    subtotal + taxAmount;

  const balanceAmount =
    totalAmount - paidAmount;

  await supabaseAdmin
    .from("invoices")
    .update({
      subtotal,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      balance_amount: balanceAmount,
      updated_at:
        new Date().toISOString(),
    })
    .eq(
      "id",
      invoiceId
    );

}

exports.updateInvoiceItem =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      service_date,
      description,
      pax,
      volume,
      unit_price,
    } = req.body;

    const total_price =
      Number(pax) *
      Number(unit_price);

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from("invoice_items")
        .update({
          service_date,
          description,

          pax,
          volume,

          unit_price,
          total_price,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    await recalculateInvoice(
      data.invoice_id
    );

    return res.json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.generateInvoicePdf =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      data: invoice,
      error,
    } =
      await supabaseAdmin
        .from("invoices")
        .select(`
          *,
          items:invoice_items(*)
        `)
        .eq("id", id)
        .single();

    if (error || !invoice) {

      return res.status(404).json({
        message:
          "Invoice not found",
      });

    }

    const html =
      generateInvoiceHtml(
        invoice,
        logoBase64
      );

const browser =
  await puppeteer.launch({
    executablePath:
      "/usr/bin/chromium-browser",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
    ],
  });

    const page =
      await browser.newPage();

    await page.setContent(
      html,
      {
        waitUntil:
          "networkidle0",
      }
    );

    const pdf =
      await page.pdf({
        format: "A4",
        printBackground: true,
      });

    await browser.close();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `inline; filename=${invoice.invoice_number}.pdf`
    );

    return res.send(pdf);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message:
        error.message,
    });

  }

};