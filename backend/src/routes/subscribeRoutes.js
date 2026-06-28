const express =
  require("express");

const router =
  express.Router();

const {
  subscribeNewsletter,
  getSubscribers,
  getSubscriberById,
  updateSubscriberStatus,
  deleteSubscriber,
  exportSubscribers,
} = require(
  "../controllers/newsletterController"
);

const newsletterLimiter =
  require(
    "../middleware/newsletterLimiter"
  );

router.get(
  "/",
  getSubscribers
);

router.get(
  "/export",
  exportSubscribers
);

router.get(
  "/:id",
  getSubscriberById
);

router.patch(
  "/:id/status",
  updateSubscriberStatus
);

router.delete(
  "/:id",
  deleteSubscriber
);

router.post(
  "/subscribe",
  newsletterLimiter,
  subscribeNewsletter
);

module.exports = router;