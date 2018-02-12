import React, { Component } from 'react';

import { Cropper } from 'react-image-cropper';



class ImageCrop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imgSrc: this.props.imgSrc,
            image: '',
            imageLoaded: false,
        }
    }

    handleImageLoaded(state) {
        this.setState({
            [state + 'Loaded']: true
        })
    }


    handleClick(state) {
        let node = this[state]
        this.setState({
            [state]: node.crop()
        })
    }





    render() {
        return (
            <div>
                <h3>Default image crop</h3>
                <img src={this.state.imgSrc} />
                <Cropper
                    src={this.state.imgSrc}
                    ref={ref => { this.image = ref }}
                    onImgLoad={() => this.handleImageLoaded('image')}
                />
                <br />
                {this.state.imageLoaded ? <button onClick={() => this.handleClick('image')}>crop</button> : null}
                <h4>after crop</h4>
                {this.state.image ? <img className="after-img" src={this.state.image} alt="" /> : null}
            </div>

        );
    }

}

export default ImageCrop;