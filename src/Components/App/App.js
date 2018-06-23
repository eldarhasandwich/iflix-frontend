import React, {Component} from 'react';
import {connect} from 'react-redux'

import RatingModal from '../Modals/RatingModal';

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            ratingModalOpen: false
        }
    }

    setRatingModalOpen = value => {
        this.setState({ratingModalOpen: value})
    }

    render() {
        return (
            <div>

                <button
                    onClick={this.setRatingModalOpen.bind(this, !this.state.ratingModalOpen)}
                >
                    Toggle Modal
                </button>

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
                    <h1 style={{textAlign:"center"}}>Here is some example content</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In gravida metus et mauris elementum, eget pharetra mi fringilla. Nunc non accumsan leo, tincidunt tempor diam. Proin cursus eleifend dui quis consequat. Maecenas sit amet velit vel erat fermentum aliquet in ut ante. Vivamus vel mauris tincidunt, malesuada felis quis, elementum justo. Donec aliquam nisl et sodales fringilla. Phasellus auctor nisl ipsum, eu malesuada mauris consequat scelerisque. Duis quis suscipit urna. In eu diam lobortis, rutrum dolor vel, egestas metus.</p>
                </div>
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