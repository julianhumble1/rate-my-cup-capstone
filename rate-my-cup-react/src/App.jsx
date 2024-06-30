import "./css/App.css"
import Registration from "./components/Registration.jsx"
import Header from "./components/Header.jsx"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import LocationDetails from "./components/LocationDetails.jsx"
import { useEffect, useState } from "react"

import { BrowserRouter as Router, Route, Routes, Navigate, useParams } from "react-router-dom"
import NewRate from "./components/NewRate.jsx"

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const role = localStorage.getItem("role")
    if (role) {setLoggedIn(true)}
  }, [])

  return (
    <Router>
      <div className = "background-image"></div>
      <Header
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route
          path="/register"
          element = {<Registration/>}
        />
        <Route
          path="/login"
          element={
            <Login
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />
          }
        />
        <Route
          path="/home"
          element={<Home />}
        />
        <Route
          path="/location/:id"
          element={<LocationDetails />}
        />
        <Route
          path="/rate/new"
          element={<NewRate />}
        />
        <Route
          path="/rate/new/:locationId"
          element={<NewRate />}
        />
      </Routes>
    </Router>
  )
}

export default App
