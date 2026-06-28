const express =
require("express");

const router =
express.Router();

const {
  getHomeSection,
  updateHomeSection,
  getBenefits,
  getAboutStatistics,
  getAboutClients,
  getAllHomeSections,
  updateBenefit,
  updateAboutStatistic,
  createAboutClient,
  updateAboutClient,
  deleteAboutClient,
} = require(
  "../controllers/homeSectionController"
);

router.get(
  "/",
  getAllHomeSections
);

router.get(
  "/benefits",
  getBenefits
);

router.put(
  "/benefits/:id",
  updateBenefit
);

router.get(
  "/about-clients",
  getAboutClients
);

router.get(
  "/about-statistics",
  getAboutStatistics
);

router.put(
  "/about-statistics/:id",
  updateAboutStatistic
);

router.post(
  "/about-clients",
  createAboutClient
);

router.put(
  "/about-clients/:id",
  updateAboutClient
);

router.delete(
  "/about-clients/:id",
  deleteAboutClient
);

router.get(
  "/:key",
  getHomeSection
);

router.put(
  "/:key",
  updateHomeSection
);

module.exports =
router;