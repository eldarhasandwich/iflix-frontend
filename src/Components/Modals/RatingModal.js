import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as ContentRatingActions from '../../Actions/contentRating'
import Modal from './Modal';
import Paragraph from '../Elements/Paragraph';

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
        let userId = this.props.userSession.userId
        let contentId = this.props.userSession.selectedContentId

        console.log("posting a " + rating)
        this.props.postUserRating(userId, contentId, rating)
        this.setState({mouseOver: 0})
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

    getRatingLabel = () => {
        switch (this.state.mouseOver) {
            case 1: return "Poor"
            case 2: return "Okay"
            case 3: return "Average"
            case 4: return "Good"
            case 5: return "Amazing!"
            default: return "Give us feedback..."
        }
    }

    pStyle = {
        textAlign:"center"
    }

    render() {
        
        if (this.props.contentRating.awaitingResponse) { // Displayed while waiting for server response
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

        if (this.props.contentRating.postOutcome === "fail") { // Displayed when rating request has failed
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

        if (this.props.contentRating.postOutcome === "pass") { // Displayed when rating request was successful
            return (
                <Modal
                    isOpen={this.props.isOpen}
                    width={500}
                >
                    <p style={this.pStyle}>
                        Thanks for your input. It will help us cater our content to you.
                    </p>

                    <p style={this.pStyle}>
                        This show has an average score of {
                            this.props.userSession.content.find(e => {
                                return e.contentId === this.props.userSession.selectedContentId
                            }).average.toFixed(1)
                        } stars.
                    </p>
                </Modal>
            )
        }

        return ( // Base state, prompt for user input (rating)
            <Modal
                isOpen={this.props.isOpen}
                width={500}
            >

                <Paragraph
                    style={this.pStyle}
                    text={"Tell us how much you enjoyed this show!"}
                />
            
                <div
                    style={{
                        width:"250px",
                        margin: "15px auto",
                    }}
                    onMouseLeave={this.setNStars.bind(this, 0)}
                >
                    { this.generateRatingStars() }
                </div>

                <Paragraph
                    style={this.pStyle}
                    text={
                        this.getRatingLabel()
                    }
                />
                
            </Modal>
        );
    }
}

class RatingStar extends Component {
    render() {
        return (
            <h1
                style={{
                    width: "50px",
                    display: "inline-block",
                    cursor: "pointer",
                    margin:"0",
                    textAlign:"center",
                    fontSize:"60px",
                    color:"#3498db"
                }}
                onMouseOver={this.props.onMouseOver}
                onClick={this.props.onClick}
            >
                {
                    this.props.filled
                        ? "★"
                        : "☆"
                }
            </h1>
        );
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession, contentRating: state.contentRating}
}

const mapDispatchToProps = dispatch => {
    return {
        postUserRating: (userId, contentId, rating) => dispatch(ContentRatingActions.postUserRating(userId, contentId, rating)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingModal)