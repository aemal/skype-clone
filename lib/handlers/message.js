module.exports = class {
  constructor(messageModel) {
    this.messageModel = messageModel;
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
}
