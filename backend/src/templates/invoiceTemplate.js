exports.generateInvoiceHtml = (invoice, logoBase64) => {

  const formatCurrency = (value) =>
    `Rp ${Number(value || 0).toLocaleString("id-ID")}`;

  const rows = (invoice.items || [])
    .map(
      (item, index) => `
        <tr>
          <td class="center">
            ${index + 1}
          </td>

          <td>
            ${item.description || "-"}
          </td>

          <td class="center">
            ${item.pax || 1}
          </td>

          <td class="center">
            ${item.volume || 0}
          </td>

          <td class="right">
            ${formatCurrency(item.unit_price)}
          </td>

          <td class="right">
            ${formatCurrency(item.total_price)}
          </td>
        </tr>
      `
    )
    .join("");

  return `
<!DOCTYPE html>
<html>

<head>

<meta charset="UTF-8">

<style>

*{
  box-sizing:border-box;
}

body{
  font-family: Arial, sans-serif;
  color:#333;
  padding:30px;
  font-size:12px;
}

.header{
  display:flex;
  justify-content:space-between;
  align-items:flex-start;
  margin-bottom:25px;
}

.company{
  width:60%;
}

.logo{
  width:120px;
  height:auto;
  display:block;
  margin-bottom:12px;
}

.company-name{
  font-size:14px;
  font-weight:bold;
  margin-bottom:5px;
}

.company p{
  margin:2px 0;
  color:#555;
}

.invoice-box{
  width:35%;
  text-align:right;
}

.invoice-title{
  font-size:42px;
  font-weight:300;
  color:#14213D;
  margin:0;
}

.invoice-box p{
  margin:4px 0;
}

.bill-to{
  margin-top:10px;
  font-weight:bold;
}

.info-table{
  width:100%;
  border-collapse:collapse;
  margin-bottom:20px;
}

.info-table th{
  background:#c85c12;
  color:white;
  border:1px solid #a74b0f;
  padding:8px;
  font-size:11px;
}

.info-table td{
  border:1px solid #cfcfcf;
  padding:8px;
  text-align:center;
}

.items{
  width:100%;
  border-collapse:collapse;
  margin-top:10px;
}

.items th{
  background:#e8d6ca;
  border:1px solid #444;
  padding:10px;
}

.items td{
  border:1px solid #444;
  padding:10px;
  vertical-align:top;
}

.items tbody tr:nth-child(even){
  background:#f7efea;
}

.center{
  text-align:center;
}

.right{
  text-align:right;
}

.footer{
  margin-top:20px;
  display:flex;
  justify-content:space-between;
  gap:30px;
}

.bank{
  width:55%;
}

.bank-title{
  font-weight:bold;
  margin-bottom:10px;
}

.bank p{
  margin:2px 0;
}

.signature-logo{
  width:70px;
  height:auto;
  margin-top:10px;
}

.summary{
  width:35%;
}

.summary table{
  width:100%;
  border-collapse:collapse;
}

.summary td{
  border:1px solid #444;
  padding:6px;
}

.total-row{
  font-weight:bold;
}

.signature{
  margin-top:30px;
  text-align:right;
}

.signature-name{
  margin-top:60px;
  font-weight:bold;
}

.notes{
  margin-top:20px;
  font-size:11px;
  color:#666;
}

</style>

</head>

<body>

<div class="header">

  <div class="company">

<img
  src="data:image/png;base64,${logoBase64}"
  class="logo"
/>

    <div class="company-name">
      PT Wisata Dunia Baru (KK DMC)
    </div>

    <p>
      Alamanda Office 5th Floor,
      Jl. Bypass Ngurah Rai No 76
    </p>

    <p>
      Kedonganan-Badung,
      Bali Indonesia 80361
    </p>

    <p>
      Phone: +62819-1346-0316
    </p>

    <p>
      info.kkdmc@gmail.com
    </p>

    <p>
      www.kk-dmc.com
    </p>

  </div>

  <div class="invoice-box">

    <h1 class="invoice-title">
      INVOICE
    </h1>

    <p>
      <strong>Date:</strong>
      ${invoice.invoice_date || "-"}
    </p>

    <p>
      <strong>Invoice No:</strong>
      ${invoice.invoice_number || "-"}
    </p>

    <div class="bill-to">
      BILL TO:
    </div>

    <p>
      ${invoice.customer_name || "-"}
    </p>

    <p>
      ${invoice.customer_email || ""}
    </p>

  </div>

</div>

<table class="info-table">

  <tr>
    <th>Date</th>
    <th>Sales In Charge</th>
    <th>Payment Term</th>
    <th>Due Date</th>
  </tr>

  <tr>
    <td>${invoice.invoice_date || "-"}</td>
    <td>${invoice.sales_in_charge || "-"}</td>
    <td>${invoice.payment_term || "-"}</td>
    <td>${invoice.due_date || "-"}</td>
  </tr>

</table>

<table class="items">

  <thead>

    <tr>
      <th width="60">No</th>
      <th>Description</th>
      <th width="80">Qty</th>
      <th width="80">Vol</th>
      <th width="160">Unit Price</th>
      <th width="160">Total</th>
    </tr>

  </thead>

  <tbody>

    ${rows}

  </tbody>

</table>

<div class="footer">

  <div class="bank">

    <div class="bank-title">
      BANK TRANSFER (IDR)
    </div>

    <p>
      Account Name:
      PT Wisata Dunia Baru
    </p>

    <p>
      Bank:
      Bank Central Asia (BCA)
    </p>

    <p>
      Account Number:
      7720529488
    </p>

    <p>
      Branch:
      Nusa Dua
    </p>

    <p>
      Currency:
      IDR (Rupiah)
    </p>

  </div>

  <div class="summary">

    <table>

      <tr>
        <td>Subtotal</td>
        <td class="right">
          ${formatCurrency(invoice.subtotal)}
        </td>
      </tr>

      <tr>
        <td>
          Tax (${invoice.tax_percentage || 0}%)
        </td>
        <td class="right">
          ${formatCurrency(invoice.tax_amount)}
        </td>
      </tr>

      <tr class="total-row">
        <td>Total</td>
        <td class="right">
          ${formatCurrency(invoice.total_amount)}
        </td>
      </tr>

      <tr>
        <td>Paid</td>
        <td class="right">
          ${formatCurrency(invoice.paid_amount)}
        </td>
      </tr>

      <tr class="total-row">
        <td>Balance</td>
        <td class="right">
          ${formatCurrency(invoice.balance_amount)}
        </td>
      </tr>

    </table>

  </div>

</div>

<div class="notes">

  Thank you for choosing KK DMC.
  Please make payment according to the bank information above.

</div>

<div class="signature">

  <p>
    Authorized Signature
  </p>

  <img
    src="data:image/png;base64,${logoBase64}"
    class="signature-logo"
  />

  <div class="signature-name">
    (${invoice.sales_in_charge || "KK DMC"})
  </div>

</div>

</body>

</html>
`;
};