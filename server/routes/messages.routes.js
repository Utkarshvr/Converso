const { Router } = require("express");
const router = Router();

const { verifyAccessToken } = require("../middleware/verification/verifyToken");
const {
  getAllMessages,
  sendMessage,
} = require("../controllers/MessagesController");

router
  .route("/:to")
  .all(verifyAccessToken)
  .get(getAllMessages)
  .post(sendMessage);

module.exports = router;
