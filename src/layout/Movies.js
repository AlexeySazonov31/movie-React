function Movies(props){
    return <div>
        {props.movies.length ? (
            props.movies.map(movie => 
                <Card key={movie.imdbID} {...movie} />
            )
        ) : (
            <p>Nothing found</p>
        )}
    </div>
}

export default Movies;