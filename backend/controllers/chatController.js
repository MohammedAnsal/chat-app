const expressAsyncHandler = require("express-async-handler");
const Chat = require("../models/chatModel");
const User = require("../models/userModel");

//  Access Chat :-

const accessChat = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    console.log("UserId param not sent with requst");
    return res.status(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } },
      },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  console.log(isChat, "1");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  console.log(isChat, "2");

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };
  }

  console.log(chatData, "3");

  try {
    const creatChat = await Chat.create(chatData);
    console.log(creatChat, "4");
    const fullChat = await Chat.findOne({ _id: creatChat._id }).populate(
      "users",
      "-password"
    );
    console.log(fullChat, "5");
    res.status(200).send(fullChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//  Fetch Chat :-

const fetchChat = expressAsyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updateAt: -1 })
      .then(async (result) => {
        result = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(201).send(result);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//  Create New Group Chat :-

const createGroup = expressAsyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill All The Fields" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send({ message: "More than 2 users required to from a group" });
  }

  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(201).send(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//  Rename Group Name :-

const renameGroup = expressAsyncHandler(async (req, res) => {
  try {
    const { chatName, chatId } = req.body;

    const renameGroup = await Chat.findByIdAndUpdate(
      chatId,
      { $set: { chatName: chatName } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!renameGroup) {
      res.status(401);
      throw new Error("Chat Not Found");
    } else {
      res.json(renameGroup);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//  Remove Group :-

const removeGroup = expressAsyncHandler(async (req, res) => {
  try {
    const { chatId } = req.body;

    const removeGroup = await Chat.findByIdAndDelete(chatId);

    if (!removeGroup) {
      res.status(401);
      throw new Error("Somthing Went Wrong...");
    } else {
      res.status(201).json({ message: "Group Removed Succssfully" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const addToGroup = expressAsyncHandler(async (req, res) => {
  try {
    const { chatId, userId } = req.body;

     console.log(chatId,userId);
     
    const addedd = await Chat.findByIdAndUpdate(
      chatId,
      { $push: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!addedd) {
      res.status(401);
      throw new Error("Chat Not Found");
    }

    res.status(201).json({ message: "Add To Group Successfully" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = {
  accessChat,
  fetchChat,
  createGroup,
  renameGroup,
  removeGroup,
  addToGroup,
};
