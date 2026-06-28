const express = require("express");

const router = express.Router();

const {
  getTourPackages,
  getTourPackageById,
  getTourPackageBySlug,
  createTourPackage,
  updateTourPackage,
  deleteTourPackage,
} = require("../controllers/tourPackageController");

const {
  getOptionsByPackage,
  createOption,
} = require(
  "../controllers/packageOptionController"
);

router.get("/", getTourPackages);

router.get(
  "/:id/options",
  getOptionsByPackage
);

router.post(
  "/:id/options",
  createOption
);

router.get(
  "/slug/:slug",
  getTourPackageBySlug
);

router.get("/:id", getTourPackageById);

router.post("/", createTourPackage);

router.put("/:id", updateTourPackage);

router.delete("/:id", deleteTourPackage);

module.exports = router;