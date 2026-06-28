const express = require("express");

const router = express.Router();

const {
  getPromotions,
  getPromotionById,
  createPromotion,
  updatePromotion,
  deletePromotion,
} = require(
  "../controllers/promotionController"
);

router.get(
  "/",
  getPromotions
);

router.get(
  "/:id",
  getPromotionById
);

router.post(
  "/",
  createPromotion
);

router.put(
  "/:id",
  updatePromotion
);

router.delete(
  "/:id",
  deletePromotion
);

module.exports = router;