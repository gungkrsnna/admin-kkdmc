const express =
  require("express");

const contactLimiter =
  require(
    "../middleware/contactLimiter"
  );

const {
  createContactMessage,
  getContactMessages,
} = require(
  "../controllers/contactController"
);

const router =
  express.Router();

router.post(
  "/",
  contactLimiter,
  createContactMessage
);

router.get(
  "/",
  getContactMessages
);

module.exports =
  router;