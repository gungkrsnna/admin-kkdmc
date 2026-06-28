const express =
require("express");

const router =
express.Router();

const {
  getInclusions,
  createInclusion,
  updateInclusion,
  deleteInclusion,
} = require(
  "../controllers/packageInclusionController"
);

router.get(
  "/package/:id",
  getInclusions
);

router.post(
  "/package/:id",
  createInclusion
);

router.put(
  "/:id",
  updateInclusion
);

router.delete(
  "/:id",
  deleteInclusion
);

module.exports = router;