import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ErrorPopup from "./ErrorPopup";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {

    if(localStorage.getItem("isLoggedIn") == "True") {
      navigate("/home");

    }
  },[]);

  const submitButtonClicked = async (e) => {
    e.preventDefault();

    // console.log(userName, password)

    await axios
      .post(
        "http://localhost:3000/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      // Handle the response from backend here
      .then((res) => {
        localStorage.setItem("isLoggedIn", "True");
        navigate("/home");
      })

      // Catch errors if any
      .catch((err) => {
        // Wenn ein Fehler auftritt, setzen Sie die Fehlermeldung und zeigen das Popup an
        const error =
          err.response?.data?.message ||
          "Login error. Please check your username and password.";
        setErrorMessage(error);
        setShowErrorPopup(true);
      });
  };

  const closeErrorPopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <>
      {showErrorPopup && (
        <ErrorPopup message={errorMessage} onClose={closeErrorPopup} />
      )}

      <div
        style={{
          display: "flex",
          height: "100vh",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "60%",
            width: "30%",
            marginTop: "5rem",
            border: "0.5px solid #9370DB",
            backgroundColor: "#F8F8FF",
            padding: "2rem",
            borderRadius: "2rem",
            paddingTop: "50px",
          }}
        >
          <h1>Donate Chain</h1>
          <h3 style={{ paddingTop: "30px" }}>
            Welcome back!
          </h3>
          <form style={{ paddingTop: "20px" }}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-Mail
              </label>
              <input
                type="text"
                className="form-control"
                id="emaile"
                aria-describedby="emailHelp"
                required
                placeholder="johndoe@doemail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px", }}>
              <button
                type="submit"
                onClick={submitButtonClicked}
                className="btn"
                style={{
                  backgroundColor: "#9370DB",
                  color: "white",
                  width: "40%",
                }}
              >
                Login
              </button>
            </div>
            <div className="mt-3 text-center">
              <p>
                Dont't have an account? <Link to="/register">Register here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
