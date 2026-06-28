const express =
  require("express");

const router =
  express.Router();

const {
  getFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
  getPublicFaqs,
} = require(
  "../controllers/faqController"
);

router.get(
  "/public",
  getPublicFaqs
);

router.get(
  "/",
  getFaqs
);

router.get(
  "/:id",
  getFaqById
);

router.post(
  "/",
  createFaq
);

router.put(
  "/:id",
  updateFaq
);

router.delete(
  "/:id",
  deleteFaq
);

module.exports =
  router;