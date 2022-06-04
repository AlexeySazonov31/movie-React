import React from "react";

class Search extends React.Component {
    state = {
        search: '',
    }

    render() {
        return <div>
            <input
                type="text"
                value={this.state.search}
                onChange={event => { this.setState({search: event.target.value}) }}
                placeholder='name movie'
            />
        </div>
    }
}