const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");
const authenticate = require("../middleware/authenticate.middleware");

router.get("/api/wallet", authenticate, walletController.getWallet);
router.post(
  "/api/wallet/create/:userId",
  authenticate,
  walletController.createWallet
);
router.get(
  "/api/wallet/:walletId",
  authenticate,
  walletController.getWalletDetails
);
router.put(
  "/api/wallet/:walletId",
  authenticate,
  walletController.updateWallet
);
router.delete(
  "/api/wallet/:walletId",
  authenticate,
  walletController.deleteWallet
);

module.exports = router;
