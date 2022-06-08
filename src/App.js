import React, {useState, useEffect} from "react";
import Movies from "./layout/Movies";
import Movie from "./layout/Movie";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

let apiKey = ['k_7yh97abi', 'k_muf4olu9' ]; //101, 08, 
apiKey = apiKey[1]
// !!!! end URL: keyAPi
function App() {

  const [movie, setMovie] = useState({});
  const [show, setShow] = useState("Most Popular Movies");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // first page
  useEffect(() => {
    fetch(`https://imdb-api.com/en/API/MostPopularMovies/${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies( data.items ? data.items : [] );
        setLoading( false );
      })
  }, []);


  const handleEnterParent = (search, type, URLSearch) => {
      // URLSearch: true -- menu 
      // search: true -- search input
    if( URLSearch === false && search.trim() === '' ) return;
    if( URLSearch === true && URLSearch.trim() === '' ) return;

    setLoading(true);
    setShow("search");

    search = encodeURIComponent(search);

    
  let url;

  if( URLSearch ) {

    url = URLSearch + apiKey;

  } else if (search){

    if( type === 'movie' ){
      url = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${search}`;
    } else if (type === 'series'){
      url = `https://imdb-api.com/en/API/SearchSeries/${apiKey}/${search}`;
    } else {
      url = `https://imdb-api.com/en/API/Search/${apiKey}/${search}`;
    }
  }

    fetch( url )
      .then((response) => response.json())
      .then((data) => {
          if( data.searchType ){
            setMovies(data.results);
          } else if ( data.items ){
            setMovies(data.items);
          } else {
            setMovies([]);
          }
          if( data.errorMessage ) {
            setMovies([{title: data.errorMessage}])
          }
          setLoading(false);
        })
  };

  const handleReadMore = (id) => {
    setLoading(true);
    setShow("movie");
    fetch(`https://imdb-api.com/en/API/Title/${apiKey}/${id}`)
      .then((response) => response.json())
      .then((data) => {
          setMovie(data.title ? data : {});
          setLoading(false);
      });
  };

  return (
    <>
      <Header handleEnterParent={handleEnterParent} show={show} setShow={setShow}/>

      <main>
        {loading ? (
          <div className="parentLoader">
            <div className="loader"></div>
          </div>
        ) : show === 'movie' ? (
            <Movie {...movie}/>
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