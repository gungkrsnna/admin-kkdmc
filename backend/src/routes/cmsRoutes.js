const express =
require("express");

const router =
express.Router();

const multer =
require("multer");

const upload =
  multer({
    storage:
      multer.memoryStorage(),
  });

const {
  getSection,
  updateSection,
  uploadCmsImage,
} = require(
  "../controllers/cmsController"
);

router.post(
  "/upload",
  upload.single("image"),
  uploadCmsImage
);

router.get(
  "/:key",
  getSection
);

router.put(
  "/:key",
  updateSection
);

module.exports =
router;