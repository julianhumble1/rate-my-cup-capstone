import "../css/SearchResult.css"

const SearchResult = () => {
    return (
      <div className="container justify-content-center rounded-3 mt-3" id="result-box">
            <div className="row p-2 row-cols-2">
                <div className="col">
                    <div className="row ps-5 text-start fw-bold">
                        Search Result   
                    </div>
                    <div className="row ps-5 text-start">
                        Address
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