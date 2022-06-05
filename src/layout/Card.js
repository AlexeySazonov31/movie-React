function Card(props){

    const {
        Title,
        Year,
        imdbID,
        Type,
        Poster
    } = props;

    const text = Title.replace(/^a-z0-9 /i, '').replace(/\s/, '+');

    return <div id={"movie-" + imdbID}>
        {Poster !== 'N/A' ? (
            <img
                className="activator"
                src={Poster}
                alt=""
            />
        ) : (
            <img
                className="activator"
                src={`https://via.placeholder.com/300x430.png?text=${text}`}
                alt=""
            />
        )}
        <h3>{Title}</h3>
        <p>
            <span>{Year}, {Type}</span>
            <button
                onClick={ 
                    event => {event.preventDefault(); props.handleReadMore(imdbID)}
                    }
            >Read more</button>
        </p>
    </div>
}
export default Card;