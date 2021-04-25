const Search = ({value, setSearchValue, searching, setSearching}) => {

    const handleChange = e => {setSearchValue(e.target.value)}

    const handleSubmit = e => {
        e.preventDefault()

       value !=="" && setSearching(true)
    }

    const handleKeypress = e => {
      if (e.charCode === 13) {
        handleSubmit(e)
      }
    }

    return (
        <div className="col col-sm-4 form-inline">
            <input
                className="form-control"
                value={value}
                onChange={handleChange}  
                placeholder="Type movie name here"
                onKeyPress={handleKeypress}
            ></input>
            <button className="search-btn btn btn-primary btn-sm"onClick={handleSubmit}>Search</button>
        </div>
    )
}

export default Search
