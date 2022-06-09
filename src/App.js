import React, { useState, useEffect } from "react";
import Movies from "./layout/Movies";
import Movie from "./layout/Movie";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

//  http://www.omdbapi.com/?apikey=your-api-key&s=matrix
//  http://www.omdbapi.com/?apikey=your-api-key&i=tt0133093&plot=full

let apiKeyOMDb = 75468291;

function App() {
  const [movie, setMovie] = useState({});
  const [show, setShow] = useState("Top 250 Movies");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const Top250Movies = [];

  // first page
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${apiKeyOMDb}&s=matrix`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.Search ? data.Search : []);
        setLoading(false);
      });
  }, []);

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
        console.log(data);
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


