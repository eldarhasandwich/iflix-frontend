import React, {Component} from 'react';
import {connect} from 'react-redux'

import RatingModal from '../Modals/RatingModal';
import LoginModal from '../Modals/LoginModal';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loginModalOpen: false,
            ratingModalOpen: false
        }
    }

    setLoginModalOpen = value => {
        this.setState({loginModalOpen: value})
    }

    setRatingModalOpen = value => {
        this.setState({ratingModalOpen: value})
    }

    generateContent = () => {
        let content = this.props.userSession.content
        console.log(content)
        if (!content) { console.log("no content"); return null }
        return content.map(c => {
            return (
                <Content
                    title={c.title}
                    averageRating={c.average}
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


                <button
                    onClick={this.setRatingModalOpen.bind(this, !this.state.ratingModalOpen)}
                >
                    Toggle Rating Modal
                </button>

                <LoginModal
                    isOpen={this.state.loginModalOpen}
                    onRequestClose={this.setLoginModalOpen.bind(this, false)}
                />

                <RatingModal
                    isOpen={this.state.ratingModalOpen}
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
            isHovered: false
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
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)