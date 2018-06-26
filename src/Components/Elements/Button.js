import React, {Component} from 'react';

import './button.css'

class Button extends Component {

    buttonStyle = {
        ...this.props.style
    }

    render() {
        return (
            <button
                className={"button"}
                style={this.buttonStyle}
                onClick={this.props.onClick}
            >
                {this.props.text}
            </button>
        )
    }
}

export default Button