const userRoutes = require("express").Router();
const { sendMessage, sendMessagesInBatch } = require("./UserController");

userRoutes.post("/send-message", sendMessage);
userRoutes.post("/batch-send-message", sendMessagesInBatch);

module.exports = userRoutes;
