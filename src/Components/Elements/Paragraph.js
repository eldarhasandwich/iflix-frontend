import React, {Component} from 'react';

class Paragraph extends Component {

    paragraphStyle = {
        ...this.props.style
    }

    render() {
        return (
            <p
                style={this.paragraphStyle}
            >
                {this.props.text}
            </p>
        )
    }
}

export default Paragraph