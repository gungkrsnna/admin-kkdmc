const path = require("path");
const fs = require("fs");

const logoBase64 = fs.readFileSync(
  path.join(__dirname, "../../assets/logo.png")
).toString("base64");

exports.renderTourConfirmation  = (
  reservation
) => {

  const totalPax =
    (reservation.adult || 0) +
    (reservation.child || 0) +
    (reservation.infant || 0);

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
    font-family:Arial, Helvetica, sans-serif;
    font-size:13px;
    color:#333;
    padding:40px;
}

table{
    width:100%;
    border-collapse:collapse;
}

td{
    padding:6px 8px;
    vertical-align:top;
}

.title{

    text-align:center;

    font-size:24px;

    font-weight:bold;

    margin:25px 0;

    color:#1d3557;

}

.company{

    text-align:right;

}

.company h2{

    margin:0;

}

.section{

    margin-top:25px;

}

.info td:first-child{

    width:220px;

    font-weight:bold;

}

.footer{

    margin-top:60px;

}

.line{

    border-top:2px solid #14213D;

    margin:15px 0;

}

.header{

margin-bottom:20px;

}

.header td{
    padding:0;
    vertical-align:top;
}

.logo{
    width:145px;
}

.company{

text-align:right;

}

.company-name{

font-size:28px;

font-weight:bold;

color:#0d3b66;

}

.info{

margin-top:20px;

}

.info td{

border:1px solid #bbb;

padding:10px;

}

.info td:first-child{

width:220px;

background:#f8f8f8;

font-weight:bold;

}

.signature{

margin-top:60px;

}

.footer{

margin-top:50px;

text-align:center;

font-size:12px;

color:#777;

line-height:20px;

}

.header{

width:100%;

margin-bottom:10px;

}

.logo-cell{
    width:35%;
}

.logo{

width:180px;

}

.company{
    text-align:right;
    font-size:11px;
    line-height:16px;
    color:#666;
}

.company-title{

font-size:15px;

font-weight:bold;

color:#444;

margin-bottom:3px;

}

.email{

color:#2d4fa5;

text-decoration:underline;

}

.top-line{
    height:6px;
    background:#a55300;
    margin:12px 0 30px;
}

.title{

text-align:center;

font-size:34px;

font-weight:700;

color:#111;

margin-bottom:20px;

}

.confirmation-number{

text-align:center;

font-size:16px;

margin-bottom:40px;

}

.signature{

margin-top:70px;

}

.sign-right .signature-line{

margin-left:auto;

}

.signature{

margin-top:70px;

display:flex;

justify-content:space-between;

align-items:flex-start;

gap:60px;

}

.signature-box{

width:250px;

}

.signature-title{

font-weight:600;

margin-bottom:70px;

}

.signature-line{

border-top:1px solid #444;

width:180px;

margin-bottom:8px;

}

.signature-name{

font-weight:600;

}

.signature-right{

text-align:right;

}

.signature-right .signature-line{

margin-left:auto;

}

</style>

</head>

<body>

${renderHeader(reservation)}

${renderReservationDetail(
reservation
)}

${renderTourInformation(
    reservation,
    totalPax
)}

${renderSignature()}

${renderFooter()}

</body>

</html>

`;

};

function renderHeader(reservation) {

return `

<table class="header">

<tr>

<td class="logo-cell">

<img
src="data:image/png;base64,${logoBase64}"
class="logo"
/>

</td>

<td class="company">

    <div class="company-title">

        PT Wisata Dunia Baru (KK DMC)

    </div>

    <div>
        Alamanda Office 5th Floor,
    </div>

    <div>
        Jl. Bypass Ngurah Rai No. 76
    </div>

    <div>
        Kedonganan - Badung,
        Bali Indonesia 80361
    </div>

    <div>
        Phone : +62819-1346-0316
    </div>

    <div class="email">
        info.kkdmc@gmail.com
    </div>

    <div>
        www.kk-dmc.com
    </div>

</td>

</tr>

</table>

<div class="top-line"></div>

<div class="title">

/// TOUR CONFIRMATION ///

</div>

<div class="confirmation-number">

Confirmation No.

${reservation.reservation_number}

</div>

`;

}

function renderTourInformation(
  reservation,
  totalPax
) {

return `

<h3>Tour Information</h3>

<table class="info">

<tr>
<td>Guest Name</td>
<td>${reservation.full_name}</td>
</tr>

<tr>
<td>Email</td>
<td>${reservation.email}</td>
</tr>

<tr>
<td>WhatsApp</td>
<td>${reservation.whatsapp || "-"}</td>
</tr>

<tr>
<td>Nationality</td>
<td>${reservation.nationality || "-"}</td>
</tr>

<tr>
<td>Tour Package</td>
<td>${reservation.product_name || "-"}</td>
</tr>

<tr>
<td>Travel Date</td>
<td>${reservation.arrival_date || "-"}</td>
</tr>

<tr>
<td>Pickup Hotel</td>
<td>${reservation.hotel_name || "-"}</td>
</tr>

<tr>
<td>Total Guest</td>
<td>
${reservation.adult} Adult<br>
${reservation.child} Child<br>
${reservation.infant} Infant<br>
<strong>${totalPax} Pax</strong>
</td>
</tr>

</table>

<div class="section">

<h3>Special Request</h3>

<div class="box">

${reservation.special_request || "-"}

</div>

</div>

`;

}

function renderFooter(){

return `

<hr>

<div class="footer">

Thank you for choosing KK DMC.

We wish you have a pleasant journey in Indonesia.

For any assistance during your trip,
please contact our reservation team.

</div>

`;

}

function renderSignature() {

return `

<div class="signature">

    <div class="signature-box">

        <div class="signature-title">

            Guest Signature

        </div>

        <div class="signature-line"></div>

    </div>

    <div class="signature-box signature-right">

        <div class="signature-title">

            Confirmed By

        </div>

        <div class="signature-line"></div>

        <div class="signature-name">

            KK DMC Reservation

        </div>

    </div>

</div>

`;

}

function renderReservationDetail(
    reservation
){

return `

<h3>

Reservation Detail

</h3>

<table class="info">

<tr>

<td>

Confirmation No

</td>

<td>

${reservation.reservation_number}

</td>

</tr>

<tr>

<td>

Issued Date

</td>

<td>

${new Date(
reservation.created_at
).toLocaleDateString()}

</td>

</tr>

<tr>

<td>

Status

</td>

<td>

${reservation.status}

</td>

</tr>

<tr>
<td>Reservation No</td>
<td>${reservation.reservation_number}</td>
</tr>

<tr>
<td>Status</td>
<td>${reservation.status}</td>
</tr>

<tr>
<td>Issued Date</td>
<td>${new Date(reservation.created_at).toLocaleDateString()}</td>
</tr>

</table>

`;

}