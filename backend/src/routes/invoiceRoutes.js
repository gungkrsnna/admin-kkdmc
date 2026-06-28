const express =
require("express");

const auth =
require("../middleware/auth");

const {
  getInvoices,
  getInvoiceById,

  createInvoice,
  updateInvoice,
  deleteInvoice,

  addInvoiceItem,
  deleteInvoiceItem,
  updateInvoiceItem,

  generateInvoicePdf,
} = require(
  "../controllers/invoiceController"
);

const router =
express.Router();

router.get(
  "/",
  auth,
  getInvoices
);

router.get(
  "/:id",
  auth,
  getInvoiceById
);

router.post(
  "/",
  auth,
  createInvoice
);

router.put(
  "/:id",
  auth,
  updateInvoice
);

router.delete(
  "/:id",
  auth,
  deleteInvoice
);

router.post(
  "/:id/items",
  auth,
  addInvoiceItem
);

router.delete(
  "/items/:id",
  auth,
  deleteInvoiceItem
);

router.put(
  "/items/:id",
  auth,
  updateInvoiceItem
);

router.get(
  "/:id/pdf",
  auth,
  generateInvoicePdf
);

module.exports =
router;