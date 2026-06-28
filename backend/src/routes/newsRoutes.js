const express =
  require("express");

const router =
  express.Router();

const {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
  getPublicNews,
  getPublicNewsDetail,
  getNewsCategories,
} = require("../controllers/newsController");

const uploadNews = require("../middleware/uploadNews");

// ======================
// ADMIN
// ======================

router.get(
  "/",
  getNews
);

router.get(
  "/categories",
  getNewsCategories
);

router.get(
  "/public",
  getPublicNews
);

router.get(
  "/public/:slug",
  getPublicNewsDetail
);

router.get(
  "/:id",
  getNewsById
);

router.post(
  "/",
  uploadNews.array("featured_images", 5),
  createNews
);

router.put(
  "/:id",
  uploadNews.array("featured_images", 5),
  updateNews
);

router.delete(
  "/:id",
  deleteNews
);

// ======================
// PUBLIC
// ======================

module.exports =
  router;