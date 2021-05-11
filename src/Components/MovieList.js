import {Link} from "react-router-dom"

const MovieList = ({movies, FavoriteComponent, handleFavoritesClick}) => {
    // const FavoriteComponent = {FavoriteComponent}

    return (
        <>
         {movies.map((movie, index) => (
            <div className="image-container d-flex justify-content-start m-3" key={movie.imdbID}>
                <Link to={`/details/${movie.imdbID}`}>
                    <img className="img rounded" src={movie.Poster} alt={`${movie.Title} ${movie.Year}`}/>
                </Link>
                <div onClick = {() => handleFavoritesClick(movie)}className="overlay d-flex align-items-center justify-content-center"><FavoriteComponent/></div>
            </div>   
         ))}   
        </>
    )
}

export default MovieList
