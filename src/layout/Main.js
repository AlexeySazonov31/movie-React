import React, {useState, useEffect} from "react";
import Movies from "./Movies";
import Movie from "./Movie";
import Search from "./Search";

function Main() {

    const [movie, setMovie] = useState({});
    const [show, setShow] = useState('index');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        fetch('http://www.omdbapi.com/?apikey=75468291&s=matrix')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    movies: data.Search ? data.Search : [],
                    loading: false
                })
            })
        }, []);

    const handleEnter = (search, type) => {
        if (search.trim() === '') return;
        setLoading(true);
        setShow('search');
        search = encodeURIComponent(search);
        let url = `http://www.omdbapi.com/?apikey=75468291&s=${search}`;
        if(type !== 'all'){
            url = url + `&type=${type}`;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                setMovies(data.Search ? data.Search : []);
                setLoading(false);
        });
    }


    const handleReadMore = (id) => {
        setLoading(true);
        setShow('movie');
        fetch(`http://www.omdbapi.com/?apikey=75468291&i=${id}&plot=full`)
            .then(response => response.json())
            .then(data => {
                setMovie( data.Title ? data : {});
                setLoading( false );
            });
    }

    return <main>
        <Search handleEnter={handleEnter}/>
        {loading ? (
            <div className="loader">Loading...</div>
        ) : show === 'movie' ? (
            <Movie {...movie}/>
        ) : (
            <Movies 
                movies={movies}
                handleReadMore={handleReadMore}
            />
        )}
    </main>
    }

export default Main;