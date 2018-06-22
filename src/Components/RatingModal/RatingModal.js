import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as StateActions from '../../Actions/state'

class RatingModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mouseOver: 0
        }
    }

    setNStars = nStars => {
        this.setState({mouseOver: nStars})
    }

    sendStarRating = rating => {
        console.log("posting a " + rating)
        this.props.postUserRating(1234, 1234, rating)
    }

    generateRatingStars = () => {
        return [1,2,3,4,5].map(i => {
            return (
                <RatingStar
                    key={i}
                    filled={this.state.mouseOver > i-1}
                    onMouseOver={this.setNStars.bind(this, i)}
                    onClick={this.sendStarRating.bind(this, i)}
                />
            )
        })
    }

    modalStyle = {
        border: "solid 1px black",
        width:"500px",
        position:"absolute",
        left:"calc(50% - 200px)",
        top:"50px",
        backgroundColor:"white"
    }

    render() {
        if (!this.props.isOpen) {
            return null
        }

        if (this.props.state.contentRating) {
            return (
                <div style={this.modalStyle}>

                    <p
                        style={{
                            textAlign: "center"
                        }}
                    >
                        Thanks for your input. It will help us cater our content to you.
                    </p>

                    <p
                        style={{
                            textAlign: "center"
                        }}
                    >
                        This show has an average score of {this.props.state.contentRating.average} stars.
                    </p>

                </div>
            )
        }

        return (
            <div style={this.modalStyle}>
                
                <p
                    style={{
                        textAlign: "center"
                    }}
                >
                    Tell us how much you enjoyed this show!
                </p>
            
                <div
                    style={{
                        width:"175px",
                        margin: "15px auto",
                    }}
                    onMouseLeave={this.setNStars.bind(this, 0)}
                >
                    { this.generateRatingStars() }
                </div>
                
            </div>
        );
    }
}

class RatingStar extends Component {
    render() {
        return (
            <h1
                style={{
                    width: "35px",
                    display: "inline-block",
                    cursor: "pointer",
                    margin:"0",
                    textAlign:"center"
                }}
                onMouseOver={this.props.onMouseOver}
                onClick={this.props.onClick}
            >
                {
                    this.props.filled
                        ? "X"
                        : "O"
                }
            </h1>
        );
    }
}

const mapStateToProps = state => {
    return {state: state.state}
}

const mapDispatchToProps = dispatch => {
    return {
        postUserRating: (userId, contentId, rating) => dispatch(StateActions.postUserRating(userId, contentId, rating)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingModal)