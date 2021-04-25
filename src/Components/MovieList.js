const MovieList = ({movies, FavoriteComponent, handleFavoritesClick}) => {
    // const FavoriteComponent = {FavoriteComponent}

    return (
        <>
         {movies.map((movie, index) => (
            <div className="image-container d-flex justify-content-start m-3" key={movie.imdbID}>
                <img className="img rounded" src={movie.Poster} alt={`${movie.Name} ${movie.Year}`}/>
                <div onClick = {() => handleFavoritesClick(movie)}className="overlay d-flex align-items-center justify-content-center"><FavoriteComponent/></div>
            </div>   
         ))}   
        </>
    )
}

export default MovieList
