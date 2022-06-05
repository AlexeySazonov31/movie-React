function Card(props){

    const {
        title,
        crew,
        id,
        imDbRating,
        year,
        rank,
        image,
        fullTitle
    } = props;

    const text = title.replace(/^a-z0-9 /i, '').replace(/\s/, '+');

    console.log(image)
    
    return <div id={"movie-" + id}>
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
        <h3>{fullTitle ? fullTitle : title}</h3>
        <p>
            <span>{year}, {imDbRating}</span>
            <button
                onClick={ 
                    event => props.handleReadMore(id)
                    }
            >Read more</button>
        </p>
    </div>
}
export default Card;