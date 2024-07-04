import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { errorHandler } from "../utils/error.js"; // Assuming errorHandler is defined in error.js

const findOrCreateMainChat = async () => {
  try {
    let mainChat = await Conversation.findOne({ title: "Main Chat" });

    if (!mainChat) {
      mainChat = await Conversation.create({ title: "Main Chat" });
    }

    return mainChat;
  } catch (error) {
    throw errorHandler(500, "Failed to find or create main chat");
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    const senderId = req.user.id;
    const senderUsername = req.user.username;
    const senderPhoto = req.user.profilePhoto;

    if (!message) {
      throw errorHandler(400, "Message content is required");
    }

    let mainChat = await findOrCreateMainChat();

    const newMessage = new Message({
      senderId,
      message,
      senderUsername,
      senderPhoto,
    });

    await newMessage.save();

    mainChat.messages.push(newMessage._id);
    await mainChat.save();

    // Populate sender data for the response
    const populatedMessage = await Message.findById(newMessage._id).populate(
      "senderId",
      "username profilePhoto"
    );

    res.status(201).json({
      _id: populatedMessage._id,
      message: populatedMessage.message,
      senderId: populatedMessage.senderId._id,
      senderUsername: populatedMessage.senderId.username,
      senderPhoto: populatedMessage.senderId.profilePhoto,
      createdAt: populatedMessage.createdAt,
      updatedAt: populatedMessage.updatedAt,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    let mainChat = await findOrCreateMainChat();

    const messages = await Message.find({
      _id: { $in: mainChat.messages },
    }).populate("senderId", "username profilePhoto");

    if (!messages.length) {
      return next(errorHandler(404, "Messages not found!"));
    }

    const messagesWithUsername = messages.map((message) => ({
      _id: message._id,
      message: message.message,
      senderId: message.senderId._id,
      senderUsername: message.senderId.username,
      senderPhoto: message.senderId.profilePhoto,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
    }));

    res.status(200).json(messagesWithUsername);
  } catch (error) {
    next(error);
  }
};
