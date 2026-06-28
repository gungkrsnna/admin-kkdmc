const express =
require("express");

const auth =
require("../middleware/auth");

const {
  getCustomers,
  getCustomerById,
} = require(
  "../controllers/customerController"
);

const router =
express.Router();

router.get(
  "/",
  auth,
  getCustomers
);

router.get(
  "/:id",
  auth,
  getCustomerById
);

module.exports =
router;