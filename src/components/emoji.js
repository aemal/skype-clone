  import React, {Component} from 'react';
import EmojiPicker from 'emoji-picker-react';
import {emojify} from 'react-emojione';


class Emoji extends Component {
  constructor(props){
    super(props);

    this.logEmoji = this.logEmoji.bind(this);
    this.insertEmoji = this.insertEmoji.bind(this);
    this.addSpecialChar = this.addSpecialChar.bind(this);
  }

  logEmoji (data,emoji) {
    this.insertEmoji(":"+emoji.name+":")
  }

 insertEmoji(emoji) {
    var input = this.props.txtMessage;
    console.log(input);
    if (input === undefined) { return; }
    var scrollPos = input.scrollTop;
    var pos = 0;
    var range;
    var browser = ((input.selectionStart || input.selectionStart === "0") ?
      "ff" : (document.selection ? "ie" : false ) );
    if (browser === "ie") {
      input.focus();
      range = document.selection.createRange();
      range.moveStart ("character", -input.value.length);
      pos = range.text.length;
    }
    else if (browser === "ff") { pos = input.selectionStart };

    var front = (input.value).substring(0, pos);
    var back = (input.value).substring(pos, input.value.length);
    input.value = front+emojify(emoji, {output:"unicode"})+back;
    pos = Number(pos) + 2
   console.log("len: "+emoji.length);
   console.log(emoji);
    if (browser === "ie") {
      input.focus();
      range = document.selection.createRange();
      range.moveStart ("character", -input.value.length);
      range.moveStart ("character", pos);
      range.moveEnd ("character", 0);
      range.select();
    }
    else if (browser === "ff") {
      input.selectionStart = pos;
      input.selectionEnd = pos;
      input.focus();
    }
    input.scrollTop = scrollPos;
  }

  addSpecialChar(evt) {
    if (evt.target.selectionStart || evt.target.selectionStart === '0') {
           let startPos = evt.target.selectionStart;
           let  endPos = evt.target.selectionEnd;
           evt.target.value = evt.target.value.substring(0, startPos)
           //+  emojify(this.state.selectedEmoji, {output: 'unicode'})
           +  emojify(":innocent:", {output: 'unicode'})

           + evt.target.value.substring(endPos, evt.target.value.length);

       } else {
          //evt.target.value += emojify(this.state.selectedEmoji, {output: 'unicode'});
          evt.target.value += emojify(":innocent:", {output: 'unicode'});
       };
       this.setState({
             selectedEmoji: ''
           });
     }


    render() {
      const {display} = this.props;
        return (
            <div style={{display}}>
          <EmojiPicker onEmojiClick={this.logEmoji} />
          </div>
        )

        }
    }

export default Emoji;
