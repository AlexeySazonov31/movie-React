function Card(props) {
  console.log(props)
  const { Poster, Title, Type, Year, imdbID } = props.movie;

  const text = Title.replace(/^a-z0-9 /i, "").replace(/\s/, "+");

  // the function resizes the image in the link
  function normImageUrl(urlImage) {
    return urlImage.replace(/SX[0-9][0-9][0-9]/, 'SX700');
  }

  return (
    <div id={'movie-' + imdbID} className="cardMovie">
      {!/N\/A/.test(Poster) ? (
        <img src={normImageUrl(Poster)} alt="" />
      ) : (
        <img
          src={`https://via.placeholder.com/300x430.png?text=${text}`}
          alt=""
        />
      )}
      <h3>{Title}</h3>
      <p>
        <span>
          {Year}, {Type}
        </span>
      </p>

        <button onClick={ () => {
          props.handleReadMore(imdbID);
        } }
        >click</button>
    </div>
  );
}
export default Card;
