import React from "react";
import Movies from "./Movies";
import Search from "./Search";
import Movie from "./Movie";

class Main extends React.Component {
    state ={
        show: 'index',
        movies: [],
        movie: {},
        loading: true,
    }

    handleEnter = (search) => {
        if (search.trim() === '') return;
        this.setState({
            loading: true,
            show: 'search'
        });
        search = encodeURIComponent(search);
        let url = `http://www.omdbapi.com/?apikey=75468291&s=${search}`;
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
        fetch('http://www.omdbapi.com/?apikey=75468291&s=matrix')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    movies: data.Search ? data.Search : [],
                    loading: false
                })
            })
    }

    handleReadMore = (id) => {
        this.setState({
            loading: true,
            show: 'movie'
        })
        fetch(`http://www.omdbapi.com/?apikey=75468291&i=${id}&plot=full`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    movie: data.Title ? data : {},
                    loading: false
                })
            })
    }

    render() {
        return <main>
            <Search handleEnter={this.handleEnter}/>
            {this.state.loading ? (
                <div className="loader">Loading...</div>
            ) : this.state.show === 'movie' ? (
                <Movie {...this.state.movie}/>
            ) : (
                <Movies 
                    movies={this.state.movies}
                    handleReadMore={this.handleReadMore}
                 />
            )}
        </main>
    }
}

export default Main;