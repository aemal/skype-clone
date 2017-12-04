module.exports = class {
  constructor(messageModel, chatModel) {
    this.messageModel = messageModel;
    this.chatModel = chatModel;
  };
  get(req,res) {
    messageModel.findOne({
      message: req.params.id
    })
    .exec((err, message) => {
      if(err) {
        res.send('Error!');
      } else {
        res.json(message);
      }
    });
  };
  send(req,res) {
    var newMessage = new Message ({
      senderUserID: req.body.sendUserId,
      receiverUserID: req.body.receiveUserId,
      message: req.body.textMessage
    });
    newMessage.save((err, message) => {
      if(err) {
          res.send('Error!');
        } else {
          res.send(message);
        }
    });
  };
  messageHistory (req, res){
    this.chatModel.collection.findOne({participants: {$all: [req.body.sender, req.body.receiver]}}, (err, chat) => {
      if(err) {
        res.send('Error!');
      } else {
        console.log(chat);
        this.messageModel.find({chatID: chat._id}, (err, message) => {
          if(err) {
            res.send('Error!');
          } else {
            res.json(message);
          }
        });
      }
    });
  }
}
