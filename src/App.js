import React, {useState, useEffect} from "react";
import Movies from "./layout/Movies";
import Movie from "./layout/Movie";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

let apiKey = ['k_muf4olu9', 'k_7yh97abi'];

// !!!! end URL: keyAPi
function App() {

  const [movie, setMovie] = useState({});
  const [show, setShow] = useState("Top 250 Movies");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://imdb-api.com/en/API/MostPopularMovies/${apiKey[1]}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies( data.items ? data.items : [] );
        setLoading( false );
      });
  }, []);

  const handleEnterParent = (search, type, URLSearch) => {
    if( URLSearch === false && search.trim() === '' ) return;

    setLoading(true);
    setShow("search");

    search = encodeURIComponent(search);

    let url;

    if( URLSearch ) {
      url = URLSearch + apiKey[1];
    } else {
      if( type === 'movie' ){
        url = `https://imdb-api.com/en/API/SearchMovie/${apiKey[1]}/${search}`;
      } else if (type === 'series'){
        url = `https://imdb-api.com/en/API/SearchSeries/${apiKey[1]}/${search}`;
      } else {
        url = `https://imdb-api.com/en/API/Search/${apiKey[1]}/${search}`;
      }
    }
    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if( data.errorMessage === '' ){
          if( data.searchType ){
            setMovies(data.results);
          } else if ( data.items ){
            setMovies(data.items);
          } else {
            setMovies([]);
          }
        }


        setLoading(false);
      });
  };

  const handleReadMore = (id) => {
    setLoading(true);
    setShow("movie");
    fetch(`https://imdb-api.com/en/API/Title/${apiKey[1]}/${id}`)
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
