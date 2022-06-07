function Movie(props){
    if(!props.title){
        return <p>Movie not found</p>
    }
    const {
        id,
        title,
        originalTitle,
        fullTitle,
        year,
        plot,
        awards,
        image,
        type,
        directors,
        stars,
        genres,
        countries,
        languages,
        imDbRating,
    } = props;
    console.log(image);
    const text = title.replace(/^a-z0-9 /i, '').replace(/\s/, '+');
    return <div>
        <h3>{fullTitle ? fullTitle : title}</h3>
        {image !== 'https://imdb-api.com/images/original/nopicture.jpg' ? (
                    <img
                        src={image}
                        alt=""
                    />
                ) : (
                    <img
                        src={`https://via.placeholder.com/300x430.png?text=${text}`}
                        alt=""
                />
        )}
        <ul>
            <li>Year: {year}</li>
            <li>Awards: {awards}</li>
            <li>Type: {type}</li>
            <li>Directors: {directors}</li>
            <li>Stars: {stars}</li>
            <li>Genres: {genres}</li>
            <li>Countries: {countries}</li>
            <li>Languages: {languages}</li>
            <li>IMDbRating: {imDbRating}</li>
        </ul>
        <p>{plot}</p>
    </div>
}

export default Movie;