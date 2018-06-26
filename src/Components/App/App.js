import React, {Component} from 'react';
import {connect} from 'react-redux'

import RatingModal from '../Modals/RatingModal';
import LoginModal from '../Modals/LoginModal';

import * as ContentRatingActions from '../../Actions/contentRating'

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loginModalOpen: false,
        }
    }

    setLoginModalOpen = value => {
        this.setState({loginModalOpen: value})
    }

    setRatingModalOpen = value => {
        this.props.setRatingModalOpen(value)
    }

    generateContent = () => {
        let content = this.props.userSession.content
        if (!content) { console.log("no content"); return null }
        return content.map(c => {
            return (
                <Content
                    key={c.title}
                    title={c.title}
                    averageRating={c.average}
                    onClick={this.setRatingModalOpen.bind(this, true)}
                />
            )
        })

    }

    render() {
        return (
            <div>

                <button
                    onClick={this.setLoginModalOpen.bind(this, !this.state.loginModalOpen)}
                >
                    Toggle Login Modal
                </button>

                <LoginModal
                    isOpen={this.state.loginModalOpen}
                    onRequestClose={this.setLoginModalOpen.bind(this, false)}
                />

                <RatingModal
                    isOpen={this.props.contentRating.ratingModalOpen}
                    onRequestClose={this.setRatingModalOpen.bind(this, false)}
                />

                <div
                    style={{
                        width:"70%",
                        margin:"0 auto"
                    }}
                >
                    <h1 style={{textAlign:"center"}}>
                        {
                            (this.props.userSession.isLoggedIn)
                                ? "Here is some content"
                                : "Please Log in"
                        }
                    </h1>

                    {
                        this.generateContent()
                    }

                </div>
            </div>
        );
    }
}

class Content extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isHovered: false,
        }
    }

    setIsHovered = value => {
        this.setState({isHovered: value})
    }

    getContentStyle = () => { 
        return {
            border: "solid 1px black",
            width: "50%",
            margin: "0 auto",
            marginBottom:"5px",
            backgroundColor: "white",
            cursor: "pointer"
        }
    }

    render() {
        return (
            <div 
                style={this.getContentStyle()}
                onMouseEnter={this.setIsHovered.bind(this,true)}
                onMouseLeave={this.setIsHovered.bind(this, false)}
                onClick={this.props.onClick}
            >
                <h1
                    style={{
                        textAlign:"center"
                    }}
                >
                    {this.props.title}
                </h1>
                <p
                    hidden={!this.state.isHovered}
                    style={{
                        textAlign:"right",
                        paddingRight:"10px"
                    }}
                >
                    Community Rating: {this.props.averageRating}/5 stars
                </p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession, contentRating: state.contentRating}
}

const mapDispatchToProps = dispatch => {
    return {
        setRatingModalOpen: isOpen => dispatch(ContentRatingActions.setRatingModalOpen(isOpen))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)