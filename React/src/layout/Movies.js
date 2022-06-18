import Card from "./Card";
import { useState } from "react";
import $ from "jquery";

function Movies(props) {
  const [amountCard, setAmountCard] = useState(15);

  if (props.loading === true) setAmountCard(15);

  if( typeof props.movies === 'string') {
    return <div className="error">
    {props.movies}
  </div>
  } else if ( !props.movies.length ){
    return <div className="error">
    <span>Error:</span><br/>
    Check the server
  </div>
  }

  let elem;
  if (props.movies.length) {
    let pastID;
    elem = props.movies.map((movie, item) => {
      if (item < amountCard) {
        if (pastID !== (movie.imdbID ? movie.imdbID : movie.id)) {
          pastID = movie.imdbID ? movie.imdbID : movie.id;
          return (
            <Card
              key={movie.imdbID ? movie.imdbID : movie.id}
              handleReadMore={props.handleReadMore}
              movie={movie}
            />
          );
        }
      }
    });
  }

  let classNameTopButton;
  if (amountCard >= props.movies.length) {
    classNameTopButton = "buttonShow go_to_top";
  } else {
    classNameTopButton = "buttonShow go_to_top leftBorder";
  }

  return (
    <div className="movies">
      <div className="buttonFlex">
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
      </div>

      <div className="moviesContainer">{elem}</div>
      <div className="buttonFlex">
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
        <button
          className={classNameTopButton}
          onClick={() => {
            $(document).on("click", ".go_to_top", function (e) {
              e.preventDefault();
              $("body, html").animate({ scrollTop: 0 }, 800);
            });
          }}
        >
          go to top
        </button>
      </div>
    </div>
  );
}

export default Movies;
