import React, { useState, useEffect } from "react";
import Movies from "./layout/Movies";
import Movie from "./layout/Movie";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

const API_KEY_OMDb = 75468291;

function App() {
  const [movie, setMovie] = useState({});
  const [show, setShow] = useState("Top 250 Movies");
  const [pastShow, setPastShow] = useState('Top 250 Movies');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/selectionData/Top250Movies`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data.items.length ? data.items : []);
        setLoading(false);
      });
  }, []);

  const handleSelectionFilms = (url) => {
    setLoading(true);
    fetch(url)
      .then( res => res.json() )
      .then( data => {
        console.log(data);
        setMovies(data.items.length ? data.items : []);
        setLoading(false);
      })
  }

  const handleEnterParent = (search, type) => {
    if (search.trim() === "") return;

    setLoading(true);
    setPastShow(show);
    setShow("search");

    search = encodeURIComponent(search);

    let url = `/search/${search}`;

    if (type !== "all") {
      url = url + "/" + type;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.Search ? data.Search : []);
        setLoading(false);
      });
  };

  const handleReadMore = (id) => {
    setLoading(true);
    setPastShow(show);
    setShow("movie");
    fetch(`/getMoreInfo/${id}`)
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
        handleSelectionFilms={handleSelectionFilms}
        pastShow={pastShow}
        setPastShow={setPastShow}

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
