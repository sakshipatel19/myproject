import React, { Component } from "react";
import Dropdown from '.';

class DropdownWithState extends Component {

    state = {
        options: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.options !== prevState.options && nextProps?.options?.length > 0) {
            return { options: nextProps.options };
        }
        return null;
    }

    render() {
        return (
            <Dropdown
                options={this.state.options}
                onSelect={this.props.onSelect}
                selectedOption={this.props.selectedOption}
            />);
    }
}
export default DropdownWithState;