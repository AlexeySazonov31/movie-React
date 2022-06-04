import React from "react";

class Main extends React.Component {
    state ={
        movies: []
    }

    componentDidMount() {
        fetch()
            .then(res => res.json())
            .then(data => this.setState({movies: data.Search}));
    }

    handleEnter = (search) => {
        
    }

    render() {
        return <main>
            <Search/>
            {this.state.movies.length ? (
                <Movies movies={this.state.movies} />
            ) : (
                <div className="loader">Loader...</div>
            )}
        </main>
    }
}

export default Main;