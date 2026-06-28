const express =
  require("express");

const router =
  express.Router();

const auth =
  require("../middleware/auth");

const {
  getSocialMedia,
  getSocialMediaById,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
} = require(
  "../controllers/socialMediaController"
);

// PUBLIC
router.get(
  "/",
  getSocialMedia
);

// PUBLIC
router.get(
  "/:id",
  getSocialMediaById
);

// ADMIN
router.post(
  "/",
  auth,
  createSocialMedia
);

// ADMIN
router.put(
  "/:id",
  auth,
  updateSocialMedia
);

// ADMIN
router.delete(
  "/:id",
  auth,
  deleteSocialMedia
);

module.exports =
  router;