import React, {Component} from 'react';
import {connect} from 'react-redux'

import RatingModal from '../RatingModal/RatingModal';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ratingModalOpen: false
        }
    }

    toggleModal = () => {
        this.setState({ratingModalOpen: !this.state.ratingModalOpen})
    }

    render() {
        return (
            <div>

                <button
                    onClick={this.toggleModal}
                >
                    Toggle Modal
                </button>

                <RatingModal
                    isOpen={this.state.ratingModalOpen}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {}
}

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)