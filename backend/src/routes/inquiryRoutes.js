const express = require("express");

const auth = require("../middleware/auth");

const {
  createInquiry,
  getMyInquiries,

  getInquiries,
  getInquiryById,
  updateInquiry,
} = require("../controllers/inquiryController");

const router = express.Router();

router.post(
  "/",
  auth,
  createInquiry
);

router.get(
  "/my",
  auth,
  getMyInquiries
);

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  auth,
  getInquiries
);

router.get(
  "/:id",
  auth,
  getInquiryById
);

router.put(
  "/:id",
  auth,
  updateInquiry
);

module.exports = router;