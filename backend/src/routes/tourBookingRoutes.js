const express =
require("express");

const router =
  express.Router();

  const {
  createBooking,
  getBookingById,
  updateBooking,
  uploadPaymentProof,
  getMyBookings,
  getAllBookings,
  createManualBooking,
  updatePaymentStatus,
  updateBookingStatus,
  deleteBooking,
  updateAdminNotes,
  exportBookings,
} = require(
  "../controllers/tourBookingController"
);

router.post(
  "/",
  createBooking
);

router.get(
    "/my-bookings",
    getMyBookings
  );

  router.get(
    "/admin/all",
    getAllBookings
  );

  router.get(
    "/admin/export",
    exportBookings
  );

  router.post(
    "/admin/manual",
    createManualBooking
  );

  router.put(
    "/admin/:id/payment-status",
    updatePaymentStatus
  );

  router.put(
    "/admin/:id/status",
    updateBookingStatus
  );

  router.put(
    "/admin/:id/notes",
    updateAdminNotes
  );

  router.delete(
    "/admin/:id",
    deleteBooking
  );

router.get(
"/:id",
getBookingById
);

router.put(
"/:id",
updateBooking
);


const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

router.put(
  "/:id/upload-proof",
  upload.single("payment_proof"),
  uploadPaymentProof
);

module.exports =
  router;