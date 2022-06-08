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

    // the function resizes the image in the link
    function normImageUrl(urlImage){
        let res;
        if( /https:\/\/m\.media/.test(urlImage) ){
            res = urlImage.replace(/https:\/\/m\.media-amazon\.com\/images\/M/, 'https://imdb-api.com/images/original');
            res = res.replace(/\._[A-Z][0-9]_[A-Z][A-Z][0-9][0-9][0-9]_[A-Z][A-Z][0-9],[0-9],[0-9][0-9][0-9],[0-9][0-9][0-9]_[A-Z][A-Z]_/, '._V1_Ratio0.6751_AL_');
        } else {
            res = urlImage;
        }
        return res;
    }

    
    return <div id={"movie-" + id} className='cardMovie'>
        {image !== 'https://imdb-api.com/images/original/nopicture.jpg' ? (
                    <img
                        src={normImageUrl(image)}
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