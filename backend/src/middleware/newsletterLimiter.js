const rateLimit =
  require("express-rate-limit");

const newsletterLimiter =
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message:
        "Too many subscription attempts. Please try again later.",
    },
  });

module.exports =
  newsletterLimiter;