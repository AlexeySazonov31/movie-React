function Card(props){
    const {
        Title,
        Year,
        imdbID,
        Type,
        Poster
    } = props;

    return <div>
        <img src={Poster} alt=''></img>
        <h3>{Title}</h3>
        <p>
            <span>{Year}, {Type}</span>
            <a
                href="#"
                className="right"
                onClick={ 
                    event => {event.preventDefault(); props.handleReadMore(imdbID)}
                    }
                >Read more</a>
        </p>
    </div>
}
export default Card;