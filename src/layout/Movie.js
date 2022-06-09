function Movie(props) {
  const {
    Actors,
    Awards,
    BoxOffice,
    Country,
    Director,
    Genre,
    Language,
    Plot,
    Poster,
    Production,
    Ratings,
    Released,
    Runtime,
    Title,
    Type,
    Writer,
    Year,
    imdbID,
    imdbRating,
    imdbVotes,
  } = props;

  const bI = { 'backgroundImage': `url(${normImageUrl(Poster,100)})` };

  return (
    <div className="movie" style={bI}>
      <h3>{Title}</h3>
      {Poster !== "N/A" ? (
        <img src={normImageUrl(Poster,600)} alt="" />
      ) : (
        <img
          src={`https://via.placeholder.com/300x430.png?text=${
            Title ? Title : imdbID
          }`}
          alt=""
        />
      )}

      <ul>
        <li>Year: {Year}</li>
        <li>Awards: {Awards}</li>
        <li>Actors: {Actors}</li>
        <li>Type: {Type}</li>
        <li>BoxOffice: {BoxOffice}</li>
        <li>Country: {Country}</li>
        <li>Director: {Director}</li>
        <li>Genre: {Genre}</li>
        <li>Language: {Language}</li>
        <li>Production: {Production}</li>
        <li>
          {Ratings[0].Source}: {Ratings[0].Value}
        </li>
        <li>
          {Ratings[1].Source}: {Ratings[1].Value}
        </li>
        <li>
          {Ratings[2].Source}: {Ratings[2].Value}
        </li>
        <li>Released: {Released}</li>
        <li>Runtime: {Runtime}</li>
        <li>Writer: {Writer}</li>
        <li>
          Rating: {imdbRating} ({imdbVotes})
        </li>
      </ul>
      <p>{Plot}</p>
    </div>
  );
}

export default Movie;

function normImageUrl(urlImage, quality) {
  let idImage = urlImage.match(/\/([A-Za-z0-9@]){10,}\./);
  return "https://m.media-amazon.com/images/M" + idImage + `_V1_SX${quality}.jpg`;
}
