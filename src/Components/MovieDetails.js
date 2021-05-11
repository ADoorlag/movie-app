import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import {Helmet} from "react-helmet"
import "../App.css"
import AddFavorites from "./AddFavorites"
import RemoveFavorites from "./removefavorites"

const MovieDetails = () => {
    const key= "d67bf1ae"
    const {imdbID} = useParams()

    const getMovieDetails = async () => {
        const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${key}`
        
        const response = await fetch(url)
        const responseJSON = await response.json()

        setMovie(responseJSON)
        setLoading(false)
    }

    const [movie, setMovie] = useState({})
    const [loading, setLoading] = useState(true)
    const [isInFavorites, setIsInFavorites] = useState(false)
    const [favorites, setFavorites] = useState([])
    const history = useHistory()

    useEffect(() => {
        getMovieDetails()
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

    const setMovieFavorites = () => {
        const movieFavorites = JSON.parse(localStorage.getItem("react-movie-app-favorites"))
            setFavorites(movieFavorites)
    
        history.push("/")
        window.location.reload()
    }

    return (
        <>
            <div id="back" onClick={() => {setMovieFavorites()}}>
                    <p>🡸 Return to Main Page</p>
            </div>
             {loading === false ?
             <main id="details">
                 <Helmet>
                     <title>{`Details: ${movie.Title}`}</title>
                 </Helmet>
                <section id="details-box-1">
                    <img src={movie.Poster === undefined ? "N/A" : movie.Poster} alt={`${movie.Title} ${movie.Year}`} id="poster"/>
                    {isInFavorites === true ? 
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
         : <h1 id="loading">Loading...</h1> 
        }
        </>
    )
}

export default MovieDetails
