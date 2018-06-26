import React, {Component} from 'react';
import {connect} from 'react-redux'

import './modal.css'

class Modal extends Component {

    modalStyle = {
        width: `${this.props.width}px`,
        left: `calc(50% - ${(this.props.width)/2}px)`
    }

    render() {
        return (
            <div
                className={(this.props.isOpen) ? "example-component show" : "example-component"}
                style={this.modalStyle}
            >
                {this.props.children}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)