import Card from "./Card";

function Movies(props){
    return <div>
        {props.movies.length ? (
            props.movies.map(movie => 
                <Card 
                    key={movie.imdbID}
                    handleReadMore={props.handleReadMore}
                    {...movie}
                    />
            )
        ) : (
            <p>Nothing found</p>
        )}
    </div>
}

export default Movies;