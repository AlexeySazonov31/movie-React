function Card(props) {
  let Poster, Title, Type, Year, imdbID;
  if (props.movie.hasOwnProperty("title")) {
    Poster = props.movie.image;
    Title = props.movie.title;
    Type = props.movie.imDbRating;
    Year = props.movie.year;
    imdbID = props.movie.id;
  } else if (props.movie.hasOwnProperty("Title")) {
    Poster = props.movie.Poster;
    Title = props.movie.Title;
    Type = props.movie.Type;
    Year = props.movie.Year;
    imdbID = props.movie.imdbID;
  }

  // the function resizes the image in the link
  function normImageUrl(urlImage) {
    if (urlImage !== "N/A" && urlImage !== "nopicture" && urlImage) {
      return (
        "https://m.media-amazon.com/images/M" +
        urlImage.match(/\/([A-Za-z0-9@]){10,}\./) +
        "_V1_SX500.jpg"
      );
    } else {
      return `http://img.omdbapi.com/?apikey=${process.env.REACT_APP_IMG_TOKEN}&i=${imdbID}`;
    }
  }

  return (
    <div
      id={"movie-" + imdbID}
      className="cardMovie"
      onClick={() => props.handleReadMore(imdbID)}
    >
      {props.movie.rank ? (
        <div className="rank">{props.movie.rank}</div>
      ) : (
        <></>
      )}
      <img
        src={normImageUrl(Poster)}
        alt={Title + "(image)"}
        onError={
          ({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = `https://via.placeholder.com/300x430.png?text=${Title}})`;
        }}
      />
      <h3>{Title}</h3>
      <p>
        <span>
          {Year}
          {Type ? (
            ", (" + Type + ")"
          ) : props.movie.releaseState ? (
            ", (" + props.movie.releaseState + ")"
          ) : (
            <></>
          )}
        </span>
      </p>
    </div>
  );
}
export default Card;
