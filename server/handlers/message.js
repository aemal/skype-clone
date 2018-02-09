'use strict';

module.exports = class {
  constructor(messageModel, chatModel) {
    this.messageModel = messageModel;
    this.chatModel = chatModel;
  };
  get(req,res,next) {
    console.log(req.body);
    let userID = req.body.userID;
    let friendID = req.body.friendID;

    this.chatModel.findOne({$or:[{'participants.userID': userID ,'participants.friendID': friendID}, {'participants.userID': friendID ,'participants.friendID': userID}]})
    .exec((err, chat) => {
      if(err) next(err);
      if(!chat) {
        this.chatModel.create({participants:{userID: userID, friendID: friendID}})
        .then(data=> res.json(data))
        .catch(err=> console.log(err));
      } else {
        res.json({chat: chat});
      }
    });
  };
  send(req,res,next) {
    var newMessage = new Message ({
      senderUserID: req.body.sendUserId,
      receiverUserID: req.body.receiveUserId,
      message: req.body.textMessage
    });
    newMessage.save((err, message) => {
      if(err) {
          next(err)
        } else {
          res.send(message);
        }
    });
  };
  messageHistory (req, res, next){
    this.chatModel.collection.findOne({participants: {$all: [req.body.sender, req.body.receiver]}}, (err, chat) => {
      if(err) {
        next(err);
      } else {
        this.messageModel.find({chatID: chat._id}, (err, message) => {
          if(err) {
            next(err);
          } else {
            res.json(message);
          }
        });
      }
    });
  }
}
