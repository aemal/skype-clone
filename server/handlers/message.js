'use strict';

module.exports = class {
  constructor(messageModel, chatModel) {
    this.messageModel = messageModel;
    this.chatModel = chatModel;
  };
  get(req,res,next) {
    let userID = req.body.userID;
    let friendID = req.body.friendID;
    
    this.chatModel.findOne({$and:[{participants:{ "$in" : [userID]}}, {participants:{ "$in" : [friendID]}}]})
    .exec((err, chat) => {
      if(err) next(err);
      if(!chat) {
          this.chatModel.create({participants:[ userID, friendID ]})
          .then(data=> res.json(data))
          .catch(err=> console.log(err));
      } else {
          this.messageModel.find({chatID: chat._id}).limit(100)
          .exec((err, messages)=>{
                if(err || !messages)next(err);
                console.log(messages);
                res.json({chat, messages});
          })
      }
    });
  };
  send(req,res,next) {

    let roomID = req.body.roomID;
    let userID = req.body.userID;
    let newMessage = req.body.message;

    this.messageModel.findOne({roomID: roomID})
    .exec((err, chat) => {
      if(err) next(err);
      if(!chat) {
          this.messageModel.create({
            chatID: roomID,
            userID: userID,
            message: newMessage 
          })
          .then(data=> res.json(data))
          .catch(err=> console.log(err));         
      } else {
         let messages = chat.messages;
         messages.push(newMessage);
         if(messages.length>0){
            this.messageModel.findOneAndUpdate({_id: chat._id},
                            {
                             $set:{messages : messages
                              }
                            },{upsert: false ,multi: true}, (err, chat)=>{
                                    if (err || !chat)return next(err);
                                    return res.json({ success : true, message : 'message is updated successfully...'});
            });
        }

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
