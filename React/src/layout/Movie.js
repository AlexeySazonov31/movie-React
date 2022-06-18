function Movie(props) {

  if( typeof props.movie === 'string') {
    if( props.movie === '' ){
      return <div className="error">
      <span>Error:</span><br/>
      Check the server
    </div>
    } else {
      return <div className="error">
      {props.movie}
    </div>
    }
  }

  const {
    Plot,
    Poster,
    Title,
    imdbID,

    Ratings,
    imdbRating,
    imdbVotes,
  } = props.movie;

  let bI;
  if( Poster !== "N/A" ){
    bI = { backgroundImage: `url(${normImageUrl(Poster, 200)})` };
  } else {
    bI = { backgroundImage: `url(https://via.placeholder.com/300x430.png?text=${Title}})` };
  }

  const elemRows = [
    "Year",
    "Type",
    "Genre",
    "Awards",
    "Director",
    "Actors",
    "Writer",
    "BoxOffice",
    "Country",
    "Language",
    "Production",
    "Released",
    "Runtime",
  ];

  const rows = elemRows.map((note, item) => {
    let col1, col2;
    if (props.movie[note] !== "N/A" && props.movie[note]) {
      col1 = <td className="leftTb">{note}: </td>;
      col2 = <td className="rightTb">{props.movie[note]}</td>;
    }
    return (
      <tr key={item}>
        {col1}
        {col2}
      </tr>
    );
  });

  let ratings;
  if (Ratings.length) {
    ratings = Ratings.map((note, item) => {
      return (
        <tr key={item}>
          <td className="leftTb">{note.Source}: </td>
          <td className="rightTb">{note.Value}</td>
        </tr>
      );
    });
  }
  let ratingIMDB;
  if (imdbRating !== "N/A" && imdbVotes !== "N/A" && imdbRating && imdbVotes) {
    ratingIMDB = (
      <tr>
        <td className="leftTb">Rating-imdb: </td>
        <td className="rightTb">
          {imdbRating} ({imdbVotes} v)
        </td>
      </tr>
    );
  }

  return (
    <div className="movie" style={bI}>
      <div className="brightness">
        <div className="PosterMovieGrid">
          {Poster !== "N/A" ? (
            <img src={normImageUrl(Poster, 600)} alt="" />
          ) : (
            <img
              src={`https://via.placeholder.com/300x430.png?text=${
                Title ? Title : imdbID
              }`}
              alt=""
            />
          )}
        </div>

        <div className="TitleMovieGrid">
          <h3>{Title}</h3>
        </div>

        <table>
          <thead>
            <tr>
              <th colSpan="2">Description:</th>
            </tr>
          </thead>
          <tbody>
            {rows}
            {ratings}
            {ratingIMDB}
            {props.movie.totalSeasons ? (
              <tr>
                <td className="leftTb">Total Seasons: </td>
                <td className="rightTb">{props.movie.totalSeasons}</td>
              </tr>
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      {Plot !== "N/A" ? (
        <div className="plot">
          <p>{Plot}</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Movie;

function normImageUrl(urlImage, quality) {
  let idImage = urlImage.match(/\/([A-Za-z0-9@]){10,}\./);
  return (
    "https://m.media-amazon.com/images/M" + idImage + `_V1_SX${quality}.jpg`
  );
}
