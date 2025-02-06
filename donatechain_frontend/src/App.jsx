import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Hero from "./components/Hero";
import SubmitForm from "./components/SubmitForm";
import Dashboard from "./components/Dashboard";
import Registration from "./components/RegistrationForm";
import Login from "./components/LoginForm";

function App() {
  const location = useLocation();

  const shouldShowNavbar = !["/", "/register"].includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/home" element={<Hero />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<SubmitForm />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}