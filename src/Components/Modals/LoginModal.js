import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as UserSessionActions from '../../Actions/userSession'
import Modal from './Modal';
import Paragraph from '../Elements/Paragraph';
import Button from '../Elements/Button';

class RatingModal extends Component {

    attemptLogin = () => {
        this.props.attemptLogin(1)
    }

    pStyle = {
        textAlign:"center"
    }

    render() {

        if (this.props.userSession.loginFailed) { // Display this if the login failed.
            return (
                <Modal
                    isOpen={this.props.isOpen}
                    width={500}
                >
                    <Paragraph
                        style={this.pStyle}
                        text={"Login Failed."}
                    />
                </Modal>
            )
        }

        if (this.props.userSession.isLoggedIn) { // Display this if the user is logged in
            return (
                <Modal
                    isOpen={this.props.isOpen}
                    width={500}
                >   
                    <Paragraph
                        style={this.pStyle}
                        text={"Login Success! You can close this window now."}
                    />
                </Modal>
            )
        }

        return ( // Base state, prompt user for login
            <Modal
                isOpen={this.props.isOpen}
                width={500}
            >
                
                <Paragraph
                    style={{
                        ...this.pStyle,
                        marginTop: "30px",
                        marginBottom:"50px"
                    }}
                    text={"Welcome Back! Login to Continue."}
                />

                <Button
                    style={{
                        width:"100%",
                        borderRadius:"0px",
                        boxShadow:"0"
                    }}
                    onClick={this.attemptLogin}
                    text={"Login"}
                />

            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {userSession: state.userSession}
}

const mapDispatchToProps = dispatch => {
    return {
        attemptLogin: (userId) => dispatch(UserSessionActions.attemptLogin(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RatingModal)