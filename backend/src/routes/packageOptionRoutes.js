const express = require("express");

const router = express.Router();

const {
  updateOption,
  deleteOption,
} = require(
  "../controllers/packageOptionController"
);

router.put("/:id", updateOption);

router.delete("/:id", deleteOption);

module.exports = router;