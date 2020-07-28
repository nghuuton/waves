import React, { Component } from "react";
import LightBox from "react-images";

class ImageLightBox extends Component {
    state = {
        lightboxIsOpen: true,
        currentImage: this.props.pos,
        images: [],
    };

    static getDerivedStateFromProps(props, state) {
        if (props.images) {
            const images = [];
            props.images.forEach((element) => {
                images.push({ src: `${element}` });
            });
            return (state = {
                images,
            });
        }
        return false;
    }

    closeLightBox = () => {
        this.props.onClose();
    };

    gotoPrevious = () => {
        this.setState({
            currentImage: this.state.currentImage - 1,
        });
    };

    gotoNext = () => {
        this.setState({
            currentImage: this.state.currentImage + 1,
        });
    };

    render() {
        return (
            <LightBox
                currentImage={this.state.currentImage}
                images={this.state.images}
                isOpen={this.state.lightboxIsOpen}
                onClickPrev={() => this.gotoPrevious()}
                onClickNext={() => this.gotoNext()}
                onClose={() => this.closeLightBox()}
            ></LightBox>
        );
    }
}

export default ImageLightBox;
