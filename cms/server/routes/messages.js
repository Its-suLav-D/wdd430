var express = require("express");
var router = express.Router();
const sequnceGenerator = require("./sequenceGenerator");
const Message = require("../models/message");

router.get("/", (req, res, next) => {
  Message.find()
    .then((messages) => {
      res.status(200).json({
        message: "Messages Fetched Successfully",
        messages: messages,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: " Error Fetching Messages",
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const maxMessageId = sequenceGenerator.nextId("messages");

  const newMessage = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender,
  });

  newMessage
    .save()
    .then((createdMessage) => {
      console.log(createdMessage);
      res.status(201).json({
        message: "Message added successfully",
        newMessage: createdMessage,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, message)
        .then((result) => {
          res.status(204).json({
            message: "Message updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Message.findOne({ id: req.params.id })
    .then((message) => {
      Message.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Message deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Message not found.",
        error: { message: "Message not found" },
      });
    });
});

module.exports = router;
