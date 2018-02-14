import React, { Component } from 'react';
import AvatarImageCropper from 'react-avatar-image-cropper';
//import config from "../config/config.js";

class ImageCropper extends Component {


    constructor(props) {
        super(props);
        this.state = {
            imgSrc: "",

        }

    }
    apply = (file) => {

        localStorage.setItem("arguments", JSON.stringify(arguments));
        let objectURL = URL.createObjectURL(file);

        this.setState({
            imgSrc: objectURL,
        })
        console.log(this.state);
        this.props.saveCropedImage(file)
    }




    render() {
        return (
            <div style={{ width: '150px', height: '150px', position: "absolute", top: "4%", right: "5%", margin: 'auto', border: '1px solid #ccc', borderRadius: '50%', marginTop: '20px' }}>
                <AvatarImageCropper apply={this.apply} rootStyle={{ background: `url(${this.state.imgSrc}) no-repeat center`, borderRadius: '50%' }} />

            </div>

        );
    }
}

export default ImageCropper;