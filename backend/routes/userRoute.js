const express = require("express");
const authController = require("../controllers/usercontroller");

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.register);
router.post("/chatbot", authController.chatbot);
router.post("logout", authController.verifyToken, authController.logout);

module.exports = router;
