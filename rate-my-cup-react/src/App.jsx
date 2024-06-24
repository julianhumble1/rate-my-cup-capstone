import "./css/App.css"
import Registration from "./components/Registration.jsx"
import Header from "./components/Header.jsx"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"

import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

function App() {

  return (
    <Router>
      <div className = "background-image"></div>
      <Header />
      <Routes>
        <Route
          path="/register"
          element = {<Registration/>}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/home"
          element={<Home />}
        />
      </Routes>
    </Router>
  )
}

export default App
