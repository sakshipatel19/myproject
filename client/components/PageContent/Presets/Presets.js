import React, { Component } from "react";

import Overlay from "../../common/Overlay";
import PresetModal from './PresetModal';

import "./Presets.scss";

class Presets extends Component {
    componentDidMount() {
        this.props.fetchPresets(this.props);
    }
    onRetryClick = () => {
        this.props.fetchPresets(this.props);
    }
    render() {
        return (
            <div className="preset-popup-container">
                <Overlay onClick={this.props.hidePresetOverlay} />
                <PresetModal {...this.props} onRetryClick={this.onRetryClick} />
            </div>
        );
    }
}

export default Presets;
