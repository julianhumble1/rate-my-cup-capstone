import "../css/Registration.css"

import { useState } from "react"
import InputValidator from "../utils/InputValidator.js";

const Registration = () => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [successfulRegistration, setSuccessfulRegistration] = useState("")

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail)
    const validEmail = InputValidator.validateEmail(email)
    if (!validEmail) {
      setEmailError("Please enter a valid email address")
    } else {
      setEmailError("")
    }
  }

  const handlePasswordChange = (newPassword) => {
    setPassword(newPassword)
    const validPassword = InputValidator.validatePassword(password)
    if (!validPassword) {
      setPasswordError("Password must contain a special character, number and be at least 8 characters long")
    } else {
      setPasswordError("")
    }
  }

  const handleRegistration = (event) => {
    event.preventDefault();
    const validEmail = InputValidator.validateEmail(email)
    const validPassword = InputValidator.validatePassword(password)
    if (!validEmail || !validPassword) {
        handleEmailChange(email);
        handlePasswordChange(password)
        setEmail("")
        setPassword("")
        setSuccessfulRegistration("unsuccessful")
    } else {
      setSuccessfulRegistration("successful")
    }
  }

  return (
    <div>
      <div className="container text-center rounded-5" id="registration-box">
        <h2>Registration</h2>
      {(successfulRegistration !== "successful") &&
        <form noValidate className="container p-3" onSubmit={handleRegistration}>
          <div className="row justify-content-center">
            <div className="col-10 col-md-8">
              <input className="form-control" type="email" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)}  onBlur={(e) => handleEmailChange(e.target.value)}/>
            </div>
            {emailError && 
              <div className="text-danger">{emailError}</div>
            }
            <div className="col-10 col-md-8 pt-3">
              <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onBlur={(e) => handlePasswordChange(e.target.value)} />
            </div>
            {passwordError &&
              <div className="text-danger">{passwordError}</div>
            }
          </div>
          <div className="row justify-content-center pt-3">
            <button className="col-md-2 col-6 mx-auto mx-md-0 btn my-2 my-md-0 overflow-hidden " type="submit" id="register-button">Sign Up</button>
          </div>
        </form>
        }
      {successfulRegistration === "successful" &&
        <div className="text-success">Registration Successful!</div>}
      {successfulRegistration === "unsuccessful" && 
        <div className="text-danger">Ensure inputted details are valid before registering</div>}
      </div>
    </div>
  )
}

export default Registration