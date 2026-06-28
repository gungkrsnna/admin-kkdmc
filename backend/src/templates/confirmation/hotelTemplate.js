exports.renderHotelConfirmation =
(reservation) => {

return `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<style>

body{

font-family:Arial;

padding:40px;

}

table{

width:100%;

border-collapse:collapse;

}

td{

border:1px solid #000;

padding:8px;

}

h1{

text-align:center;

}

</style>

</head>

<body>

<h1>

HOTEL CONFIRMATION

</h1>

<h3>

Confirmation No.

${reservation.reservation_number}

</h3>

<table>

<tr>

<td>Name</td>

<td>

${reservation.full_name}

</td>

</tr>

<tr>

<td>Hotel</td>

<td>

${reservation.hotel_name}

</td>

</tr>

<tr>

<td>Check In</td>

<td>

${reservation.arrival_date}

</td>

</tr>

<tr>

<td>Check Out</td>

<td>

${reservation.departure_date}

</td>

</tr>

<tr>

<td>Pax</td>

<td>

${reservation.adult} Adult

${reservation.child} Child

${reservation.infant} Infant

</td>

</tr>

<tr>

<td>Special Request</td>

<td>

${reservation.special_request || "-"}

</td>

</tr>

</table>

</body>

</html>

`;

};