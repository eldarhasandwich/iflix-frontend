import React, {Component} from 'react';
import {connect} from 'react-redux'

import * as UserSessionActions from '../../Actions/userSession'
import Modal from './Modal';

class RatingModal extends Component {

    attemptLogin = () => {
        this.props.attemptLogin(1)
    }

    pStyle = {
        textAlign:"center"
    }

    render() {

        if (this.props.userSession.loginFailed) {
            return (
                <Modal
                    isOpen={this.props.isOpen}
                    width={500}
                >
                    <p style={this.pStyle}>
                        Login Failed.
                    </p>
                </Modal>
            )
        }

        if (this.props.userSession.isLoggedIn) {
            return (
                <Modal
                    isOpen={this.props.isOpen}
                    width={500}
                >   
                    <p style={this.pStyle}>
                        Login Success! You can close this window now.
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
                    Login here.
                </p>
            
                <div>

                </div>

                <button
                    onClick={this.attemptLogin}
                >
                    Login
                </button>
                
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