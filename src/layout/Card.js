function Card(props) {
  const { title, crew, id, imDbRating, year, rank, image, fullTitle } = props;
  const text = title.replace(/^a-z0-9 /i, "").replace(/\s/, "+");

  // the function resizes the image in the link
  function normImageUrl(urlImage) {
    let res;
    if (/https:\/\/m\.media/.test(urlImage)) {
      res = urlImage.replace(
        /https:\/\/m\.media-amazon\.com\/images\/M/,
        "https://imdb-api.com/images/761x1080"
      );
      res = res.replace(
        /\._[A-Z][0-9]_[A-Z][A-Z][0-9][0-9][0-9]_[A-Z][A-Z][0-9],[0-9],[0-9][0-9][0-9],[0-9][0-9][0-9]_[A-Z][A-Z]_/,
        "._V1_Ratio0.6791_AL_"
      );
    } else {
      res = urlImage;
    }
    return res;
  }
  if( title === 'server busy' ){
      return <div className="error">{title}</div>
  }

  return (
    <div id={"movie-" + id} className="cardMovie"  onClick={(event) => props.handleReadMore(id)}>
      {!/nopicture\.jpg/.test(image) ? (
        <img src={normImageUrl(image)} alt="" />
      ) : (
        <img
          src={`https://via.placeholder.com/300x430.png?text=${text}`}
          alt=""
        />
      )}
      <h3>{title ? title : fullTitle}</h3>
      <p>
        <span>
          {year}, {imDbRating}
        </span>
      </p>
    </div>
  );
}
export default Card;
