const Messages = require("../models/Messages");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @desc Get all messages
// @route GET / messages
// @access Private
const getAllMessages = asyncHandler(async (req, res) => {
  const { to } = req.params;
  const from = req.user._id;

  // Get all Messages from MongoDB
  const messages = await Messages.find({
    $or: [
      { sender: from, receiver: to },
      { sender: to, receiver: from },
    ],
  }).lean();

  res.status(200).json(messages);
});

// @desc Create new Messages
// @route POST /Messagess
// @access Private
const sendMessage = asyncHandler(async (req, res) => {
  const { message } = req.body;
  const { to } = req.params;
  const from = req.user?._id;

  // Confirm data
  if (!message) {
    return res.status(400).json({ message: "Message can't be empty" });
  }

  // Create and store the new user
  const createdMsg = await Messages.create({
    message,
    sender: from,
    receiver: to,
  });

  if (createdMsg) {
    // Created
    return res
      .status(201)
      .json({ message: "New Message created", data: { message: createdMsg } });
  } else {
    return res.status(400).json({
      message: "Invalid Message data received"
    });
  }
});

// @desc Update a Messages
// @route PATCH /Messagess
// @access Private
const updateMessages = asyncHandler(async (req, res) => {
  const { id, user, title, text, completed } = req.body;

  // Confirm data
  if (!id || !user || !title || !text || typeof completed !== "boolean") {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Confirm Messages exists to update
  const Messages = await Messages.findById(id).exec();

  if (!Messages) {
    return res.status(400).json({ message: "Messages not found" });
  }

  // Check for duplicate title
  const duplicate = await Messages.findOne({ title }).lean().exec();

  // Allow renaming of the original Messages
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate Messages title" });
  }

  Messages.user = user;
  Messages.title = title;
  Messages.text = text;
  Messages.completed = completed;

  const updatedMessages = await Messages.save();

  res.json(`'${updatedMessages.title}' updated`);
});

// @desc Delete a Messages
// @route DELETE /Messagess
// @access Private
const deleteMessages = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Messages ID required" });
  }

  // Confirm Messages exists to delete
  const Messages = await Messages.findById(id).exec();

  if (!Messages) {
    return res.status(400).json({ message: "Messages not found" });
  }

  const result = await Messages.deleteOne();

  const reply = `Messages '${result.title}' with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  getAllMessages,
  sendMessage,
  updateMessages,
  deleteMessages,
};
