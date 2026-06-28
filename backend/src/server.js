const express = require("express");
const cors = require("cors");
require("dotenv").config();

// routes
const authRoutes = require("./routes/authRoutes");
const inquiryRoutes = require('./routes/inquiryRoutes');
const profileRoutes = require("./routes/profileRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const tourPackageRoutes =
  require("./routes/tourPackageRoutes");
const uploadRoutes =
  require("./routes/uploadRoutes");
const packageOptionRoutes =
  require("./routes/packageOptionRoutes");
const packageHighlightRoutes =
  require("./routes/packageHighlightRoutes");
const packageInclusionRoutes =
  require("./routes/packageInclusionRoutes");
const packageTermsRoutes =
require(
  "./routes/packageTermsRoutes"
);
const promotionRoutes =
require("./routes/promotionRoutes");
const customerRoutes =
require(
  "./routes/customerRoutes"
);
const invoiceRoutes =
require("./routes/invoiceRoutes");
const socialMediaRoutes =
  require("./routes/socialMediaRoutes");
  const tourBookingRoutes =
  require(
    "./routes/tourBookingRoutes"
  );
  const cmsRoutes =
require("./routes/cmsRoutes");
  const getHomeRoutes =
require("./routes/homeSectionRoutes");
  const aboutRoutes =
require("./routes/aboutRoutes");
const dashboardRoutes =
require(
  "./routes/dashboardRoutes"
);
const contactRoutes =
  require(
    "./routes/contactRoutes"
  );
  const userRoutes =
  require("./routes/userRoutes");
const subCategoryRoutes =
require("./routes/subCategoryRoutes");
const subscribeRoutes =
require("./routes/subscribeRoutes");
const newsletterCampaignRoutes =
require(
  "./routes/newsletterCampaignRoutes"
);
const faqRoutes =
  require(
    "./routes/faqRoutes"
  );
const faqCategoryRoutes =
  require(
    "./routes/faqCategoryRoutes"
  );
const newsRoutes =
require("./routes/newsRoutes");



const app = express();

app.use(cors());
app.use(express.json());


// routes
app.use("/api/auth", authRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/categories", categoryRoutes);
app.use(
  "/api/tour-packages",
  tourPackageRoutes
);

app.use(
  "/api/upload",
  uploadRoutes
);
app.use(
  "/api/package-options",
  packageOptionRoutes
);
app.use(
  "/api/package-highlights",
  packageHighlightRoutes
);
app.use(
  "/api/package-inclusions",
  packageInclusionRoutes
);
app.use(
  "/api/package-terms",
  packageTermsRoutes
);
app.use(
  "/api/promotions",
  promotionRoutes
);
app.use(
  "/api/customers",
  customerRoutes
);
app.use(
  "/api/invoices",
  invoiceRoutes
);
app.use(
  "/api/social-media",
  socialMediaRoutes
);
app.use(
  "/api/tour-bookings",
  tourBookingRoutes
);
app.use(
  "/api/cms",
  cmsRoutes
);
app.use(
  "/api/home-sections",
  getHomeRoutes
);
app.use(
  "/api/about",
  aboutRoutes
);
app.use(
  "/api/contact",
  contactRoutes
);
app.use(
  "/api/dashboard",
  dashboardRoutes
);
app.use(
  "/api/users",
  userRoutes
);
app.use(
  "/api/sub-categories",
  subCategoryRoutes
);
app.use(
  "/api/newsletter",
  subscribeRoutes
);
app.use(
  "/api/newsletter-campaigns",
  newsletterCampaignRoutes
);
app.use(
  "/api/faqs",
  faqRoutes
);
app.use(
  "/api/faq-categories",
  faqCategoryRoutes
);
app.use(
  "/api/news",
  newsRoutes
);


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "KK DMC API Running",
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});