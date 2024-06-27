import "../css/SearchResult.css"

const SearchResult = ({ locationInfo }) => {

    return (
      <div className="container justify-content-center rounded-3 mt-3" id="result-box" data-testid="search-result">
            <div className="row p-2 row-cols-2">
                <div className="col">
                    <div className="row ps-5 text-start fw-bold">
                        {locationInfo.name}   
                    </div>
                    <div className="row ps-5 text-start">
                        {locationInfo.address}
                    </div>
            </div>
            <div className="text-end align-content-center fs-4">
                &#9733;&#9733;&#9733;&#9733;
            </div>    
        </div>
      </div>
  )
}

export default SearchResult