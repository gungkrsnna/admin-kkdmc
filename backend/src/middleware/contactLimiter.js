const rateLimit =
  require(
    "express-rate-limit"
  );

module.exports = rateLimit({
  windowMs:
    10 * 60 * 1000,
  max: 5,
  message:
    "Too many messages sent. Please try again later.",
});