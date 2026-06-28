const express =
require("express");

const router =
express.Router();

const {
  getAboutStatistics
} = require(
  "../controllers/homeSectionController"
);

router.get(
  "/statistics",
  getAboutStatistics
);

module.exports =
router;