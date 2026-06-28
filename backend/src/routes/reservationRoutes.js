const express = require("express");

const auth = require("../middleware/auth");

const {
  createReservation,
  getMyReservations,
  getReservations,
  getReservationById,
  updateReservation,
  exportReservations,
  generateConfirmation,
} = require("../controllers/reservationController");

const router = express.Router();

router.post(
  "/",
  auth,
  createReservation
);

router.get(
  "/my",
  auth,
  getMyReservations
);

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  auth,
  getReservations
);


router.get(
  "/export",
  exportReservations
);

router.get(
  "/:id/confirmation",
  auth,
  generateConfirmation
);

router.get(
  "/:id",
  auth,
  getReservationById
);

router.put(
  "/:id",
  auth,
  updateReservation
);



module.exports = router;