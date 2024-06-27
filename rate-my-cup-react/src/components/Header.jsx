import "../css/Header.css"

import { Link, useNavigate } from "react-router-dom"

const Header = ({loggedIn, setLoggedIn}) => {
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("role")
        localStorage.removeItem("id")
        setLoggedIn(false)
        navigate("/login")
    }

    return (
        <>
            <nav className="navbar navbar-expand-md container-fluid" id = "header">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src="coffee-logo.png" alt="Logo" width="60" height="48" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <Link to="/home" className="nav-link" id = "home-link" aria-current="page" href="#">Home</Link>
                        </ul>
                        {loggedIn &&
                        <button type="button" className="btn" id ="logout" onClick={logout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header