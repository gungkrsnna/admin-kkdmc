exports.renderTourConfirmation =
(reservation)=>{

return `

<!DOCTYPE html>

<html>

<body>

<h1>

TOUR CONFIRMATION

</h1>

<h2>

${reservation.product_name}

</h2>

<p>

Customer :

${reservation.full_name}

</p>

<p>

Date :

${reservation.arrival_date}

</p>

<p>

Adult :

${reservation.adult}

</p>

<p>

Child :

${reservation.child}

</p>

<p>

Infant :

${reservation.infant}

</p>

</body>

</html>

`;

};