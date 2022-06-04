function Movie(props){
    if(!props.Title){
        return <p>Movie not found</p>
    }
    const {
        Title,
        Year,
        Runtime,
        Genre,
        Actors,
        Plot,
        Poster,
    } = props;
    const text = Title.replace(/^a-z0-9 /i, '').replace(/\s/, '+');
    return <div>
        <h3>{Title}</h3>
        {Poster !== 'N/A' ? (
                    <img
                        src={Poster}
                        alt=""
                    />
                ) : (
                    <img
                        src={`https://via.placeholder.com/300x430.png?text=${text}`}
                        alt=""
                    />
        )}
        <ul>
            <li>Year: {Year}</li>
            <li>Runtime: {Runtime}</li>
            <li>Genre: {Genre}</li>
            <li>Actors: {Actors}</li>
        </ul>
        <p>{Plot}</p>
    </div>
}

export default Movie;