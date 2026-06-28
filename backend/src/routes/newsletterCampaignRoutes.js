const express = require("express");

const router =
  express.Router();

const {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  sendCampaign
} = require(
  "../controllers/newsletterCampaignController"
);

router.get(
  "/",
  getCampaigns
);

router.post(
  "/:id/send",
  sendCampaign
);

router.get(
  "/:id",
  getCampaignById
);

router.post(
  "/",
  createCampaign
);

router.put(
  "/:id",
  updateCampaign
);

router.delete(
  "/:id",
  deleteCampaign
);

module.exports = router;