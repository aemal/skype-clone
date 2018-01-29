import React, {Component} from 'react';
import EmojiPicker from 'emoji-picker-react';
import JSEMOJI from 'emoji-js';


class Emoji extends Component {
  constructor(props){
    super(props);
    this.state = {
      emoji:[]
    }
       this.myCallback = this.myCallback.bind(this);
  }

  myCallback (e,code) {
    const jsemoji = new JSEMOJI();
    // set the style to emojione (default - apple)
        jsemoji.img_set = 'emojione';
    // set the storage location for all emojis
        jsemoji.img_sets.emojione.path = 'https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/';
        console.log(code.name);

    // some more settings...
        jsemoji.supports_css = false;
        jsemoji.allow_native = false;
        jsemoji.replace_mode = 'unified';

  this.setState({
     emoji: [...this.state.emoji, jsemoji.replace_colons(`:${code.name}:`)]

 })
 console.log(this.state.emoji);


}


    render() {
      const {display,emoji} = this.props;
        return (
            <div style={{display}}>
          <EmojiPicker onEmojiClick={this.myCallback} value={emoji}/>
          </div>
        )

        }
    }

export default Emoji;
