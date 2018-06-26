import React, {Component} from 'react';

import './header.css'

class Header extends Component {

    headerStyle = {
        ...this.props.style
    }

    render() {
        return (
            <h1
                className="text-header"
                style={this.headerStyle}
            >
                {this.props.text}
            </h1>
        )
    }
}

export default Header