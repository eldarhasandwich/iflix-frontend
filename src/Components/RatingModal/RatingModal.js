import React, {Component} from 'react';
import {connect} from 'react-redux'

class RatingModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mouseOver: 0
        }
    }

    mouseOver = nStars => {
        this.setState({mouseOver: nStars})
    }

    render() {
        if (!this.props.isOpen) {
            return (<h1>Not Open</h1>)
        }

        return (
            <div>

                <RatingStar
                    filled={this.state.mouseOver < 0}
                    onMouseOver={this.mouseOver.bind(this, 0)}
                />
                <RatingStar
                    filled={this.state.mouseOver < 1}
                    onMouseOver={this.mouseOver.bind(this, 1)}
                />
                <RatingStar
                    filled={this.state.mouseOver < 2}
                    onMouseOver={this.mouseOver.bind(this, 2)}
                />
                <RatingStar
                    filled={this.state.mouseOver < 3}
                    onMouseOver={this.mouseOver.bind(this, 3)}
                />
                <RatingStar
                    filled={this.state.mouseOver < 4}
                    onMouseOver={this.mouseOver.bind(this, 4)}
                />
            </div>
        );
    }
}

class RatingStar extends Component {
    render() {
        return (
            <div
                onMouseOver={this.props.onMouseOver}
            >
                {
                    this.props.filled
                        ? <h1>X</h1>
                        : <h1>O</h1>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingModal)