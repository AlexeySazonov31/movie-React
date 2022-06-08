import React, {useState, useEffect} from "react";
import Movies from "./layout/Movies";
import Movie from "./layout/Movie";

import Header from "./layout/Header";
import Footer from "./layout/Footer";

let apiKey = ['k_7yh97abi', 'k_muf4olu9' ]; //101, 08, 
// !!!! end URL: keyAPi
function App() {

  const [NumberKeyApi, setNumberKeyApi] = useState(0);

  const [movie, setMovie] = useState({});
  const [show, setShow] = useState("Most Popular Movies");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // first page
  useEffect(() => {
    fetch(`https://imdb-api.com/en/API/MostPopularMovies/${apiKey[NumberKeyApi]}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if( data.errorMessage !== '' ){
          fetch(`https://imdb-api.com/en/API/MostPopularMovies/${apiKey[NumberKeyApi+1]}`)
              .then((res) => res.json())
              .then((data) => {
                setMovies( data.items ? data.items : [] );
                setLoading( false );
        })
          setNumberKeyApi(NumberKeyApi+1);
          console.log('keyApi: ' + (NumberKeyApi+1));
        } else {
          setMovies( data.items ? data.items : [] );
          setLoading( false );
        }
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

    fetch( urlHandleEnter(URLSearch,NumberKeyApi,search,type) )
      .then((response) => response.json())
      .then((data) => {
        if( data.errorMessage !== '' ){
          fetch( urlHandleEnter(URLSearch,NumberKeyApi+1,search,type) )
          .then((response) => response.json())
          .then((data) => {
            if( data.searchType ){
              setMovies(data.results);
              setNumberKeyApi(NumberKeyApi+1);
              console.log('keyApi: ' + (NumberKeyApi+1));
            } else if ( data.items ){
              setMovies(data.items);
              setNumberKeyApi(NumberKeyApi+1);
              console.log('keyApi: ' + (NumberKeyApi+1));
            } else {
              setMovies([]);
              setNumberKeyApi(NumberKeyApi+1);
              console.log('keyApi: ' + (NumberKeyApi+1));
            };
          });
        } else {
          if( data.searchType ){
            setMovies(data.results);
          } else if ( data.items ){
            setMovies(data.items);
          } else {
            setMovies([]);
          }
        }



        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleReadMore = (id) => {
    setLoading(true);
    setShow("movie");
    fetch(`https://imdb-api.com/en/API/Title/${apiKey[NumberKeyApi]}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if( data.errorMessage !== '' ){
          fetch(`https://imdb-api.com/en/API/Title/${apiKey[NumberKeyApi+1]}/${id}`)
          .then((response) => response.json())
          .then((data) => {
            setMovie(data.title ? data : {});
            setNumberKeyApi(NumberKeyApi+1);
            console.log('keyApi: ' + (NumberKeyApi+1));
          })
        } else {
          setMovie(data.title ? data : {});
        }
        setLoading(false);
      });
  };

  return (
    <>
      <Header handleEnterParent={handleEnterParent} show={show} setShow={setShow}/>

      <main>
        {loading ? (
            <div className="loader">Loading...</div>
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

// helper function: handleEnterParent  !
function urlHandleEnter(URLSearch,NumberKeyApi,search,type){

  let url;

  if( URLSearch ) {

    url = URLSearch + apiKey[NumberKeyApi];

  } else if (search){

    if( type === 'movie' ){
      url = `https://imdb-api.com/en/API/SearchMovie/${apiKey[NumberKeyApi]}/${search}`;
    } else if (type === 'series'){
      url = `https://imdb-api.com/en/API/SearchSeries/${apiKey[NumberKeyApi]}/${search}`;
    } else {
      url = `https://imdb-api.com/en/API/Search/${apiKey[NumberKeyApi]}/${search}`;
    }

  }  
  return url;
}