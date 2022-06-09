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

  return (
    <div>
      <div>
        <h3>{Title}</h3>
      </div>
      <div>
        {Poster !== "N/A" ? (
          <img src={normImageUrl(Poster)} alt="" />
        ) : (
          <img
            src={`https://via.placeholder.com/300x430.png?text=${
              Title ? Title : imdbID
            }`}
            alt=""
          />
        )}
      </div>

      <div>
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
      </div>
      <div>
        <p>{Plot}</p>
      </div>
    </div>
  );
}

export default Movie;

function normImageUrl(urlImage) {
    return urlImage.replace(/SX[0-9][0-9][0-9]/, 'SX400');
  }
