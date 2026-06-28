const express =
require("express");

const router =
express.Router();

const {
  getTerms,
  saveTerms,
} = require(
  "../controllers/packageTermsController"
);

router.get(
  "/package/:id",
  getTerms
);

router.post(
  "/package/:id",
  saveTerms
);

module.exports = router;