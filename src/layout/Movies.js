import Card from "./Card";
import { useState } from "react";

function Movies(props) {
  const [amountCard, setAmountCard] = useState(15);

  if (props.loading === true) setAmountCard(15);

  let elem;
  if (props.movies.length) {
    let pastID;
    elem = props.movies.map((movie, item) => {
      if (item < amountCard) {
        if( pastID !==  ( movie.imdbID ? movie.imdbID : movie.id )){
          pastID = movie.imdbID ? movie.imdbID : movie.id;
          return <Card
          key={(movie.imdbID ? movie.imdbID : movie.id )}
          handleReadMore={props.handleReadMore}
          movie={movie}
        />;
        }
        
      }
    });
  } else {
    elem = <div className="error"><span>Error:</span><br/>Nothing found</div>
  }

  return (
    <div className="movies">
      {amountCard >= props.movies.length ? (
        <></>
      ) : (
        <button
          className="buttonShow"
          onClick={() => {
            setAmountCard(props.movies.length);
          }}
        >
          show all
        </button>
      )}
      <div className="moviesContainer">
          {elem}
      </div>
      {amountCard >= props.movies.length ? (
        <></>
      ) : (
        <button
          className="buttonShow"
          onClick={() => {
            setAmountCard(amountCard + 15);
          }}
        >
          show more
        </button>
      )}
    </div>
  );
}

export default Movies;
