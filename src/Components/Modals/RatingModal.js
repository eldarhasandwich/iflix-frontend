import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as ContentRatingActions from '../../Actions/contentRating'
import Modal from './Modal';

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

    pStyle = {
        textAlign:"center"
    }

    render() {
        if (!this.props.isOpen) {
            return null
        }

        if (this.props.contentRating.awaitingResponse) {
            return (
                <Modal
                    isOpen={this.props.isOpen}
                    width={500}
                >
                    <p style={this.pStyle}>
                        Sending...
                    </p>
                </Modal>
            )
        }

        if (this.props.contentRating.postFailed) {
            return (
                <Modal
                    isOpen={this.props.isOpen}
                    width={500}
                >
                    <p style={this.pStyle}>
                        We couldn't receive your rating, please try again later.
                    </p>
                </Modal>
            )
        }

        if (this.props.contentRating.contentRating) {
            return (
                <Modal
                    isOpen={this.props.isOpen}
                    width={500}
                >
                    <p style={this.pStyle}>
                        Thanks for your input. It will help us cater our content to you.
                    </p>

                    <p style={this.pStyle}>
                        This show has an average score of {this.props.contentRating.contentRating.average} stars.
                    </p>
                </Modal>
            )
        }

        return (
            <Modal
                isOpen={this.props.isOpen}
                width={500}
            >
                
                <p style={this.pStyle}>
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
                
            </Modal>
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
    return {contentRating: state.contentRating}
}

const mapDispatchToProps = dispatch => {
    return {
        postUserRating: (userId, contentId, rating) => dispatch(ContentRatingActions.postUserRating(userId, contentId, rating)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingModal)