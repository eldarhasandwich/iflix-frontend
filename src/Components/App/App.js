import React, {Component} from 'react';
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import RatingModal from '../Modals/RatingModal';
import LoginModal from '../Modals/LoginModal';

import * as ContentRatingActions from '../../Actions/contentRating'
import * as UserSessionActions from '../../Actions/userSession'
import Button from '../Elements/Button';
import Header from '../Elements/Header';
import Paragraph from '../Elements/Paragraph';

import './app.css'
import './content.css'

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

    openRatingModal = () => {
        this.props.setRatingModalOpen(true)
        this.props.setPostOutcomeNull()
    }

    closeContent = () => {
        this.setSelectedContent(null)
        this.setRatingModalOpen(false)
        this.props.resetContentRating()
    }

    appWindowStyle = {
        position:"absolute",
        top:0,
        width:"100%",
        zIndex:"-1000"
    }

    render() {
        if (!this.props.userSession.isLoggedIn) { // display login UI
            return (
                <div style={this.appWindowStyle}>
                    <ReactCSSTransitionGroup
                        transitionName="background"
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                    >
                        <div key="window1" style={this.appWindowStyle}>
                        <Button
                            key="btn1"
                            style={{
                                margin:"20px"
                            }}
                            onClick={this.setLoginModalOpen.bind(this, !this.state.loginModalOpen)}
                            text={"Toggle Login Modal"}
                        />

                        <LoginModal
                            key="loginmodal"
                            isOpen={this.state.loginModalOpen}
                            onRequestClose={this.setLoginModalOpen.bind(this, false)}
                        />
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
            )

        }

        if (this.props.userSession.selectedContentId != null) { // must compare to null as contentId can equal 0
            return (
                <div style={this.appWindowStyle}>
                    <ReactCSSTransitionGroup
                        transitionName="background"
                        transitionEnterTimeout={1000}
                        transitionLeaveTimeout={1000}
                    >
                        <div key="window2" style={this.appWindowStyle}>
                        <RatingModal
                            key="ratemodal"
                            isOpen={this.props.contentRating.ratingModalOpen}
                            onRequestClose={this.setRatingModalOpen.bind(this, false)}
                        />

                        <Button
                            key="btn2"
                            style={{margin:"20px"}}
                            onClick={this.closeContent}
                            text={"Back"}
                        />

                        <Button
                            key="btn3"
                            style={{ margin:"20px 0"}}
                            onClick={this.openRatingModal}
                            text={"Open Rating Modal"}
                        />

                        <Header
                            key="header"
                            style={{marginLeft:"100px"}}
                            text={
                                this.props.userSession.content.find(e => {
                                    return e.contentId === this.props.userSession.selectedContentId
                                }).title
                            }
                        />
                        </div>
                    </ReactCSSTransitionGroup>
                </div>
            )
        }

        return ( // Display when user is logged in and has not selected any content to view
            <div style={this.appWindowStyle}>
                <ReactCSSTransitionGroup
                    transitionName="background"
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                >
                    <div key="window3" style={this.appWindowStyle}>
                    <Button
                        key="btn4"
                        style={{margin:"20px"}}
                        onClick={this.props.logOut}
                        text={"Log Out"}
                    />

                    <div key="div" style={{width:"70%", margin:"0 auto"}}>
                        <Header
                            style={{textAlign:"center"}}
                            text={"Here is some content"}
                        />

                        { this.generateContent() }
                    </div>
                    </div>
                </ReactCSSTransitionGroup>
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

    render() {
        return (
            <div 
                className="content-div"
                onMouseOver={this.setIsHovered.bind(this,true)}
                onMouseLeave={this.setIsHovered.bind(this, false)}
                onClick={this.props.onClick}
            >
                <Header
                    style={{
                        fontSize:"38px"
                    }}
                    text={this.props.title}
                />
                <Paragraph
                    hidden={!this.state.isHovered}
                    style={{
                        textAlign:"right",
                        paddingTop:"17px",
                        paddingRight:"2px"
                    }}
                    text={`Community Rating: ${this.props.averageRating.toFixed(1)}/5 stars`}
                />
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
        logOut: () => dispatch(UserSessionActions.logOut()),
        setPostOutcomeNull: () => dispatch(ContentRatingActions.setPostOutcome(null))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)