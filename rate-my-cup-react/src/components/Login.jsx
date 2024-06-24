import { useState } from "react"

import "../css/Login.css"

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginAttemptStatus, setLoginAttemptStatus] = useState("")

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginAttemptStatus("failed")
  }

  return (
    <div>
      <div className="container text-center bg-opacity-75 rounded padding-bottom" id="login-box">
          <>
          <div className="row text-center" id="tell-me-about">
            <h2>Login</h2>
          </div>
            <form className="container pb-3" onSubmit={handleLogin} noValidate>
              <div className="row text-center mt-3 justify-content-center">
                <div className="col-12 col-md-6">
                  <input className="form-control mx-auto" type="email" placeholder="email@email.com" aria-label="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="row text-center mt-3 justify-content-center">
                <div className="col-12 col-md-6">
                  <input className="form-control mx-auto" type="password" placeholder="Password" aria-label="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className="row text-center m-3 justify-content-center">
                <button className="col-md-2 col-6 mx-auto mx-md-0 btn my-2 my-md-0 overflow-hidden " type="submit" id="login-button">Login</button>
              </div>
          </form>
          {loginAttemptStatus === "failed" &&
            <div className="text-danger">
              Username or password incorrect. Please try again.
            </div>
          }
          </>
      </div>

    </div>
  );
};

export default Login