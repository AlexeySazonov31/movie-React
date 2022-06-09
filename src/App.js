import React, { useState, useEffect } from "react";
import Movies from "./layout/Movies";
import Movie from "./layout/Movie";

import Header from "./layout/Header";
import Footer from "./layout/Footer";


let apiKeyOMDb = 75468291;
let apiKeyIMDb = 'k_muf4olu9';

function App() {
  const [movie, setMovie] = useState({});
  const [show, setShow] = useState("Top 250 Movies");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://imdb-api.com/en/API/Top250Movies/${apiKeyIMDb}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.items.length ? data.items : []);
        setLoading(false);
      });
  }, []);

  const handleSelectionFilms = (url) => {
    setLoading(true);
    fetch( String(url + apiKeyIMDb) )
      .then( res => res.json() )
      .then( data => {
        console.log(data);
        setMovies(data.items.length ? data.items : []);
        setLoading(false);
      })
  }

  const handleEnterParent = (search, type) => {
    // URLSearch: true -- menu
    // search: true -- search input
    if (search.trim() === "") return;

    setLoading(true);
    setShow("search");

    search = encodeURIComponent(search);

    let url = `http://www.omdbapi.com/?apikey=${apiKeyOMDb}&s=${search}`;

    if (type !== "all") {
      url = url + "&type=" + type;
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
    fetch(`http://www.omdbapi.com/?apikey=${apiKeyOMDb}&i=${id}&plot=full`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.Title ? data : {});
        setLoading(false);
      });
  };

  return (
    <>
      <Header
        handleEnterParent={handleEnterParent}
        show={show}
        setShow={setShow}
        handleSelectionFilms={handleSelectionFilms}
      />

      <main>
        {loading ? (
          <div className="parentLoader">
            <div className="loader"></div>
          </div>
        ) : show === "movie" ? (
          <Movie {...movie} />
        ) : (
          <Movies
            movies={movies}
            handleReadMore={handleReadMore}
            loading={loading}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
