import React, {Component} from 'react';
import {connect} from 'react-redux'

class Modal extends Component {

    modalStyle = {
        border: "solid 1px black",
        width: `${this.props.width}px`,
        position: "absolute",
        left: `calc(50% - ${(this.props.width)/2}px)`,
        top: "50px",
        backgroundColor: "white"
    }

    render() {
        if (!this.props.isOpen) {
            return null
        }

        return (
            <div style={this.modalStyle}>
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