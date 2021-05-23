import React, {useState, useEffect} from "react"
import {useParams, Link} from "react-router-dom"
import {Helmet, HelmetProvider} from "react-helmet-async"
import "../App.css"
import AddFavorites from "./AddFavorites"
import RemoveFavorites from "./removefavorites"

const MovieDetails = ({favorites, setFavorites}) => {
    const {imdbID} = useParams()

    const getMovieDetails = async () => {
        const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=123`

        const response = await fetch(url)
            if(response.ok){
                const responseJSON = await response.json()
                setMovie(responseJSON)
            }
            else{
                throw Error("Unable to fetch detail data")
            }
    }

    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(true)
    const [isInFavorites, setIsInFavorites] = useState(false)
    const [error, setError] = useState(false)
    const [hasResponded, setHasResponded] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        getMovieDetails()
        .then(() => {
            setLoading(false)
            setHasResponded(true)
            setError(false)
        })

        .catch (err => {
            setError(true)
            setLoading(false)
            setHasResponded(false)

            setErrorMessage(err.message)
        })
        // eslint-disable-next-line
	}, [])

    useEffect(() => {
        const movieFavorites = JSON.parse(localStorage.getItem("react-movie-app-favorites"))
        setFavorites(movieFavorites)

        let favoriteIDs = movieFavorites.map(favorites => favorites.imdbID)

        if(favoriteIDs.includes(imdbID)){
            setIsInFavorites(true)
        }
        else{
            setIsInFavorites(false)
        }
        // eslint-disable-next-line
    },[isInFavorites])

    const addFavoriteMovie = () => {
        const newFavoriteList = [...favorites, movie]
        setFavorites(newFavoriteList)
        saveToLocalStorage(newFavoriteList)
        setIsInFavorites(true)
      }

      const removeFavoriteMovie = () => {
        const newFavoriteList = favorites.filter(
          favorite => favorite.imdbID !== imdbID
        )
    
        setFavorites(newFavoriteList)
        saveToLocalStorage(newFavoriteList)
        setIsInFavorites(false)
      }

    const saveToLocalStorage = (items) => {
        localStorage.setItem("react-movie-app-favorites", JSON.stringify(items))
      }

      const retryRequest = () => {
        window.location.reload()
      }

    return (
        <>
            <Link to="/" id="back" onClick={() => document.title="Movie App"}>
                    <p>🡸 Return to Main Page</p>
            </Link>
            {error && 
                <div>
                    <h1 id="error">An error has occured while trying to retrieve the details</h1>
                    <p id="error-detail">{`${errorMessage}`}</p>
                    <input className="btn btn-primary" id="retry" type="button" value="Retry Request" onClick={() => retryRequest()}></input>
                </div>
            }
            {loading && <h1 id="loading">Loading...</h1> }
             {hasResponded &&
             <main id="details">
                 <HelmetProvider>
                    <Helmet>
                        <title>{`Details: ${movie.Title}`}</title>
                    </Helmet>
                </HelmetProvider>
                <section id="details-box-1">
                    <img src={movie.Poster === undefined ? "N/A" : movie.Poster} alt={`${movie.Title} ${movie.Year}`} id="poster"/>
                    {isInFavorites ? 
                        <button className="details-btn" id="remove" onClick={() => removeFavoriteMovie()}>
                            <RemoveFavorites/>
                        </button>
                        :
                        <button className="details-btn" id="add" onClick={() => addFavoriteMovie()}>
                            <AddFavorites/>
                        </button>}
                </section>
                <section id="details-box-2">
                    <div id="title-wrap">
                        <h1 id="title">{movie.Title  === undefined ? "N/A" : movie.Title}</h1>
                    </div>
                    <ul id="reviews">
                        <li>IMDB:  {movie.Ratings[0] === undefined ? "N/A" : movie.Ratings[0].Value}</li>
                        <li>Rotten Tomatoes:  {movie.Ratings[1] === undefined ? "N/A" : movie.Ratings[1].Value}</li>
                        <li>MetaCritic:  {movie.Ratings[2] === undefined ? "N/A" : movie.Ratings[2].Value}</li>
                    </ul>
                </section>
                <section id="details-box-3">
                    <ul id="extra-details">
                        <li><strong>Rating:</strong>  {movie.Rated === undefined ? "N/A" : movie.Rated}</li>
                        <li><strong>Release Date:</strong>  {movie.Released === undefined ? "N/A" : movie.Released}</li>
                        <li><strong>Genre:</strong>  {movie.Genre === undefined ? "N/A" : movie.Genre}</li>
                        <li><strong>Director(s):</strong>  {movie.Director === undefined ? "N/A" : movie.Director}</li>
                        <li><strong>Writer(s):</strong>  {movie.Writer === undefined ? "N/A" : movie.Writer}</li>
                        <li><strong>Actors:</strong>  {movie.Actors === undefined ? "N/A" : movie.Actors}</li>
                    </ul>
                    <div id="word-wrap">
                        <p id="summary"><strong>Plot: </strong>{movie.Plot === undefined ? "N/A" : movie.Plot}</p>
                    </div>
                </section>
            </main>
        }
        </>
    )
}

export default MovieDetails
