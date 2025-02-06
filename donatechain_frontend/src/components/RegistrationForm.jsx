import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import ErrorPopup from "../components/ErrorPopup";

const Registration = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  const registerButtonclicked = (e) => {
    e.preventDefault();

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Bitte geben Sie eine gültige E-Mail-Adresse ein.");
      setShowErrorPopup(true);
      return; // Registrierung nicht fortzusetzen
    }

    // console.log(username, mail, phoneNumber, password)

    axios
      .post(
        "http://localhost:3000/register",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        //console.log(res)
        navigate("/");
      })
      .catch((err) => {
        // Wenn ein Fehler auftritt, zeigen Sie das Popup mit der Fehlermeldung an
        const message = err.response?.data?.message || "Registration error";
        setErrorMessage(message);
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
          <h3 style={{ paddingTop: "30px" }}>Welcome back!</h3>
          <form style={{ paddingTop: "20px" }}>
            <div className="mb-3"></div>
            <div className="mb-3">
              <label htmlFor="mail" className="form-label">
                E-Mail
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3"></div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <button
                type="submit"
                onClick={registerButtonclicked}
                className="btn"
                style={{
                  backgroundColor: "#9370DB",
                  color: "white",
                  width: "40%",
                }}
              >
                Register
              </button>
            </div>
            <div className="mt-3 text-center">
              <p>
                Already have an account? <Link to="/">Login here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Registration;
