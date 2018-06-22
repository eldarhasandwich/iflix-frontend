import React, {Component} from 'react';
import {connect} from 'react-redux'

class RatingModal extends Component {

    constructor(props) {
        super(props)

        this.state = {
            mouseOver: 0,
            ratingSent: false
        }
    }

    setNStars = nStars => {
        this.setState({mouseOver: nStars})
    }

    sendStarRating = rating => {
        this.setState({ratingSent: true})
        alert(rating + " stars!")
    }

    generateRatingStars = () => {
        return [1,2,3,4,5].map(i => {
            return (
                <RatingStar
                    filled={this.state.mouseOver > i-1}
                    onMouseOver={this.setNStars.bind(this, i)}
                    onClick={this.sendStarRating.bind(this, i)}
                />
            )
        })
    }

    render() {
        if (!this.props.isOpen) {
            return (
                <h1
                    style={{
                        textAlign: "center"
                    }}
                >
                    Not Open
                </h1>
            )
        }

        return (
            <div
                style={{
                    border: "solid 1px black",
                    width:"400px",
                    margin:"0 auto"
                }}
            >
                
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
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingModal)