import React, {useState, useEffect} from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import MovieList from "./Components/MovieList"
import Heading from "./Components/Heading"
import Search from "./Components/Search"
import AddFavorites from "./Components/AddFavorites"
import RemoveFavorites from "./Components/removefavorites"
import MovieDetails from "./Components/MovieDetails";

const App = () => {

  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [searching, setSearching] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [error, setError] = useState(false)

  const getMovieRequest = async (searchValue) => {
    const key = process.env.REACT_APP_API_KEY
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${key}`

    const response = await fetch(url)
    if(response.ok){
      const responseJSON = await response.json()

      if(responseJSON.Search){
        setMovies(responseJSON.Search)
        setSearching(false)
        setError(false)
      }
      else{
        throw Error("No search results available")
      }
    }
    else{
      throw Error("Unable to fetch search data")
    }
  }

  const addFavoriteMovie = movie => {
    const newFavoriteList = [...favorites, movie]

    const getUniqueFavorites = (keyProps) => {
      return Object.values(
        newFavoriteList.reduce((uniqueMap, entry) => {
          const key = keyProps.map((k) => entry[k]).join('|')
          if (!(key in uniqueMap)) uniqueMap[key] = entry
          return uniqueMap
        }, {}),
    )}

    const newUniqueFavoriteList = getUniqueFavorites(["imdbID","Title"])

    setFavorites(newUniqueFavoriteList)
    saveToLocalStorage(newUniqueFavoriteList)
  }

  const removeFavoriteMovie = movie => {
    const newFavoriteList = favorites.filter(
      favorite => favorite.imdbID !== movie.imdbID
    )

    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
  }

  useEffect(() => {
    if(searching){
      getMovieRequest(searchValue)
      .catch( err => {
        setSearching(false)
        setError(true)
        setMovies([])
      })
    }
      // eslint-disable-next-line
  },[searching])

  useEffect(() => {
      const movieFavorites = JSON.parse(localStorage.getItem("react-movie-app-favorites") || [])
      setFavorites(movieFavorites)
  },[])


    // save to local storage
  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items))
  }
  
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="container-fluid movie-app">
              <div className="row d-flex align-items-center mt-4 mb-4">
                <Heading heading="Movies"/>
                <Search searchValue={searchValue} setSearchValue={setSearchValue} searching={searching} setSearching={setSearching}/>
              </div>
              {error && 
                <div className="row">
                  <h2 id="error-message">There was error attempting to fetch search data</h2>  
                </div>
              }
              <div className="row">
                <MovieList movies = {movies} FavoriteComponent = {AddFavorites}
                handleFavoritesClick = {addFavoriteMovie}/>
              </div>
              <div className="row d-flex align-items-center mt-4 mb-4">
                <Heading heading = "Favorites"/></div>
                <div className="row">
                  <MovieList movies = {favorites} FavoriteComponent = {RemoveFavorites}
                  handleFavoritesClick={removeFavoriteMovie}/>
              </div>
          </div>
        </Route>
        <Route path="/details/:imdbID">
          <MovieDetails favorites={favorites} setFavorites={setFavorites}/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
