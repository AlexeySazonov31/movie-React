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
    elem = <p>Nothing found</p>;
  }


  return (
    <div>
      {amountCard >= props.movies.length ? (
        <></>
      ) : (
        <button
          onClick={() => {
            setAmountCard(props.movies.length);
          }}
        >
          show all
        </button>
      )}
      {elem}
      {amountCard >= props.movies.length ? (
        <></>
      ) : (
        <button
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

/*        {props.movies.length ? (
            props.movies.map(movie => 
                <Card 
                    key={movie.id}
                    handleReadMore={props.handleReadMore}
                    {...movie}
                    />
            )
        ) : (
            <p>Nothing found</p>
        )}
 */
