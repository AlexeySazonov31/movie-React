import React from "react";

class Search extends React.Component {
    state = {
        search: '',
    }

    handleEnter = (event) => {
        if(event.key === 'Enter'){
            this.props.handleEnter(this.state.search);
        }
    }

    render() {
        return <div>
            <input
                type="text"
                value={this.state.search}
                onChange={event => { this.setState({search: event.target.value}) }}
                placeholder='name movie'
                onKeyUp={this.handleEnter}
            />
            <button
                className=""
                onClick={() => {this.props.handleEnter(this.state.search)}}>
                    search
                </button>
        </div>
    }
}