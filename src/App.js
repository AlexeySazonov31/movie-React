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
    fetch("https://imdb-api.com/en/API/MostPopularMovies/k_muf4olu9")
      .then((res) => res.json())
      .then((data) => {
        setMovies( data.items ? data.items : [] );
        setLoading( false );
      });
  }, []);

  const handleEnterParent = (search, type) => {
    if (search.trim() === "") return;
    setLoading(true);
    setShow("search");
    search = encodeURIComponent(search);
    let url = `https://imdb-api.com/en/API/Search/k_muf4olu9/${search}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.searchType ? data.results : []);
        setLoading(false);
      });
  };

  const handleReadMore = (id) => {
    setLoading(true);
    setShow("movie");
    fetch(`https://imdb-api.com/en/API/Title/k_muf4olu9/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data.title ? data : {});
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
