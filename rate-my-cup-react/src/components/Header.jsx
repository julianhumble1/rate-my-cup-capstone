import "../css/Header.css"

const Header = () => {
  return (
    <>
        <nav className="navbar navbar-expand-md container-fluid fixed-top" id = "header">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="coffee-logo.png" alt="Logo" width="60" height="48" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarToggler">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                        
                    </ul>
                </div>
            </div>
        </nav>
    </>
  )
}

export default Header