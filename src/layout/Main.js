import React from "react";
import Movies from "./Movies";

class Main extends React.Component {
    state ={
        movies: [],
        loading: true,
    }

    handleEnter = (search) => {
        if (search.trim() === '') return;
        this.setState({loading: true});
        search = encodeURIComponent(search);
        let url = `${search}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movies: data.Search ? data.Search : [],
                    loading: false
                })
        })
    }

    componentDidMount() {
        fetch('http://www.omdbapi.com/?apikey=your-api-key&s=matrix')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    movies: data.Search ? data.Search : [],
                    loading: false
                })
            })
    }

    render() {
        return <main>
            <Search handleEnter={this.handleEnter}/>
            {this.state.loading ? (
                <div className="loader">Loading...</div>
            ) : (
                <Movies movies={this.state.movies} />
            )}
        </main>
    }
}

export default Main;