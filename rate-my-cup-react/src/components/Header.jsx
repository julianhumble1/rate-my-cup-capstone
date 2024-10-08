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
                        <img src="slick-coffee-logo.png" alt="Logo" width="60" height="60" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarToggler">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <Link to="/home" className="header-link p-2" id="home-link" aria-current="page" href="#">Home</Link>
                            {/* <Link to="/map" className="header-link p-2">Map</Link> */}
                        </ul>
                        {!loggedIn && <div className="p-2"><Link to="/login" className=" header-link" id="login-link" aria-current="page" href="#">Login</Link> </div>}
                        {!loggedIn && <div className="p-2"><Link to="/register" className="header-link">Register</Link></div>}
                            
                        {loggedIn && <>
                            <div className="d-none d-md-block" id="user-role">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                </svg>
                                {localStorage.getItem("role")}</div>
                            <button type="button" className="btn header-link" id="logout" onClick={logout}>Logout</button>
                        </>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header