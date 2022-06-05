import Card from "./Card";

function Movies(props){

    let elem;
    if( props.movies ) {
        elem = props.movies.map((movie,item) => {
            if( item < 250 ){
                return <Card 
                key={movie.id}
                handleReadMore={props.handleReadMore}
                {...movie}
            /> 
            }
        });
    } else {
        elem = <p>Nothing found</p>;
    }

    return <div>
        {elem}
    </div>
}

export default Movies;


/*        {props.movies.length ? (
            props.movies.map(movie => 
                <Card 
                    key={movie.id}
                    handleReadMore={props.handleReadMore}
                    {...movie}
                    />
            )
        ) : (
            <p>Nothing found</p>
        )}
 */
