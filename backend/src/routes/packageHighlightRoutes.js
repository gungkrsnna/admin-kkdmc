const express =
require("express");

const router =
express.Router();

const {
  getHighlights,
  createHighlight,
  updateHighlight,
  deleteHighlight,
} = require(
  "../controllers/packageHighlightController"
);

router.get(
  "/package/:id",
  getHighlights
);

router.post(
  "/package/:id",
  createHighlight
);

router.put(
  "/:id",
  updateHighlight
);

router.delete(
  "/:id",
  deleteHighlight
);

module.exports = router;