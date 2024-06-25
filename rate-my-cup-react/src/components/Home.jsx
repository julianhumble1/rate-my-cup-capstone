import "../css/Home.css"

const Home = () => {
  return (
    <div className = "container text-center bg-opacity-75 rounded padding-bottom" id="search-box">
      <h1>Find your cup...</h1>
      <div className="row">
        <div className="d-none d-md-block col-md-2 ">
          <label htmlFor="coffee-choice">Drink Type</label>
        </div>
        <div className="d-none d-md-block col-md-2">
          <label htmlFor="postcode-box">Postcode</label>
        </div>
        <div className="d-none d-md-block col-md-2">
          <label htmlFor="min-rating-choice">Min Rating</label>
        </div>
        <div className="d-none d-md-block col-md-2">
          <label htmlFor="min-rating-choice">Price</label>
        </div>
      </div>
      <form className="row ps-3">
        <div className = "col-12 col-md-2 mb-2 m-md-0">
          <select className="form-select" id="coffee-choice" defaultValue = "Any">
            <option value="Any">Any Drink Type</option>
            <option value="Latte">Latte</option>
            <option value="Espresso">Espresso</option>
            <option value="Mocha">Mocha</option>
          </select>
        </div>
        <div className="col-12 col-md-2 mb-2 m-md-0">
          <input type="text" id="postcode-box" className="form-control" placeholder="Postcode"/>
        </div>
        <div className="col-12 col-md-2 mb-2 m-md-0">
          <select className="form-select" id="min-rating-choice" defaultValue = "Any">
            <option value = "Any">Any Rating</option>
            <option value="1">&#9733;</option>
            <option value="2">&#9733;&#9733;</option>
            <option value="3">&#9733;&#9733;&#9733;</option>
            <option value="4">&#9733;&#9733;&#9733;&#9733;</option>
            <option value="5">&#9733;&#9733;&#9733;&#9733;&#9733;</option>
          </select>
        </div>
        <div className="col-12 col-md-2 mb-2 m-md-0">
          <select className="form-select" id="price-rating-choice" defaultValue = "Any">
            <option value = "Any">Any Price</option>
            <option value="1">£</option>
            <option value="2">£/££</option>
            <option value="3">£/££/£££</option>
          </select>
        </div>
        <div className="col-12 col-md-4 mb-3">
          <button type="button" className="btn btn-outline-dark col-10 col-md-12" id="search-button">Find My Cup!</button>
        </div>
      </form>
      <div className="row p-4 justify-content-center">
        <div className="col-md-6 col-12 text-center fs-3 ">
          Or search for a specific cafe...
        </div>
        <div className="col-md-6 col-12 text-center row justify-content-center">
          <div className="col-md-8 col-12">
            <input type="text" className="form-control" placeholder="Search..."/>
          </div>
          <div className="col-md-4 col-6 pt-2 pt-md-0 justify-content-center">
            <button className="btn d-block w-100" type="button" id="search-by-name-button">Find My Cup!</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home