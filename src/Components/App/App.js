import React, {Component} from 'react';
import {connect} from 'react-redux'

import RatingModal from '../Modals/RatingModal';
import LoginModal from '../Modals/LoginModal';

import * as ContentRatingActions from '../../Actions/contentRating'
import * as UserSessionActions from '../../Actions/userSession'
// import { Z_VERSION_ERROR } from 'zlib';

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

    setSelectedContent = contentId => {
        this.props.setSelectedContent(contentId)
    }

    generateContent = () => {
        let content = this.props.userSession.content
        if (!content) { console.log("no content"); return null }
        return content.map((c, index) => {
            return (
                <Content
                    key={c.title}
                    title={c.title}
                    averageRating={c.average}
                    onClick={this.setSelectedContent.bind(this, c.contentId)}
                />
            )
        })
    }

    closeContent = () => {
        this.setSelectedContent(null)
        this.setRatingModalOpen(false)
        this.props.resetContentRating()
    }

    render() {

        if (!this.props.userSession.isLoggedIn) { // display login UI
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
                </div>
            )

        }

        if (this.props.userSession.selectedContentId != null) { // must compare to null as contentId can equal 0
            return (
                <div>

                    <button
                        onClick={this.closeContent}
                    >
                        Back
                    </button>

                    <h1>
                        {
                            this.props.userSession.content.find(e => {
                                return e.contentId === this.props.userSession.selectedContentId
                            }).title
                        }
                    </h1>

                    <RatingModal
                        isOpen={this.props.contentRating.ratingModalOpen}
                        onRequestClose={this.setRatingModalOpen.bind(this, false)}
                    />

                    <button
                        onClick={this.setRatingModalOpen.bind(this, true)}
                    >
                        Open Rating Modal
                    </button>
                    
                </div>
            )
        }

        return ( // Display when user is logged in and has not selected any content to view
            <div>

                <button
                    onClick={this.props.logOut}
                >
                    Log Out
                </button>

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
                    <h1 style={{textAlign:"center"}}>Here is some content</h1>

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
                    Community Rating: {this.props.averageRating.toFixed(1)}/5 stars
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
        setRatingModalOpen: isOpen => dispatch(ContentRatingActions.setRatingModalOpen(isOpen)),
        setSelectedContent: id => dispatch(UserSessionActions.setSelectedContent(id)),
        resetContentRating: () => dispatch(ContentRatingActions.setPostOutcome(null)),
        logOut: () => dispatch(UserSessionActions.logOut())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)