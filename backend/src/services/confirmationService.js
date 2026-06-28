const {
  renderHotelConfirmation,
} = require("../templates/confirmation/hotelConfirmation");

const {
  renderTourConfirmation,
} = require("../templates/confirmation/tourConfirmation");

exports.generateConfirmationHtml = (
  reservation
) => {

  const isHotel =
    reservation.hotel_name &&
    reservation.hotel_name.trim() !== "";

  if (isHotel) {
    return renderHotelConfirmation(
      reservation
    );
  }

  return renderTourConfirmation(
    reservation
  );

};