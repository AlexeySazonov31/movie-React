import React, {useState, useEffect} from "react";
import Movies from "./layout/Movies";
import Movie from "./layout/Movie";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

function App() {

  const [movie, setMovie] = useState({});
  const [show, setShow] = useState("index");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://www.omdbapi.com/?apikey=75468291&s=matrix")
      .then((res) => res.json())
      .then((data) => {
        setMovies( data.Search ? data.Search : [] );
        setLoading( false );
      });
  }, []);

  const handleEnterParent = (search, type) => {
    if (search.trim() === "") return;
    setLoading(true);
    setShow("search");
    search = encodeURIComponent(search);
    let url = `http://www.omdbapi.com/?apikey=75468291&s=${search}`;
    if (type !== "all") {
      url = url + `&type=${type}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.Search ? data.Search : []);
        setLoading(false);
      });
  };

  const handleReadMore = (id) => {
    setLoading(true);
    setShow("movie");
    fetch(`http://www.omdbapi.com/?apikey=75468291&i=${id}&plot=full`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.Title ? data : {});
        setLoading(false);
      });
  };

  return (
    <>
      <Header handleEnterParent={handleEnterParent}/>

      <main>
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

      <Footer />
    </>
  );
}

export default App;
