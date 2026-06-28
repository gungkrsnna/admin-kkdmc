const express = require("express");
const multer = require("multer");

const {
  uploadTourPackageImage,
} = require("../controllers/uploadController");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/tour-package",
  upload.single("image"),
  uploadTourPackageImage
);

module.exports = router;