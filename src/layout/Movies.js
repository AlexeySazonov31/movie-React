import Card from "./Card";
import { useState } from "react";

function Movies(props) {
  const [amountCard, setAmountCard] = useState(15);

  if (props.loading === true) setAmountCard(15);

  let elem;
  if (props.movies) {
    elem = props.movies.map((movie, item) => {
      if (item < amountCard) {
        return (
            <Card
              key={movie.id}
              handleReadMore={props.handleReadMore}
              {...movie}
            />
          );
      }

    });
  } else {
    elem =  <div className="error">
      <p>Nothing found</p>
      </div>;
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
