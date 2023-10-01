const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transcations.controller");
const authenticate = require("../middleware/authenticate.middleware");
const transcationsModel = require("../models/transcations.model");

router.post("/api/transaction/send", transactionController.createTransaction);
router.get("/api/transactions", transactionController.getTransactions);

module.exports = router;
