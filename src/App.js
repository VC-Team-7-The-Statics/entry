import "./App.scss";
import { Routes, Route, useLocation } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UserFormPage from "./pages/UserFormPage";
import CoffeeFormPage from "./pages/CoffeeFormPage";

function App() {
  const location = useLocation();

  const [state, setState] = useState("");

  useEffect(() => {
    if (window.isNativeApp && window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify(location.pathname));
      setState(window.token);
    }
  }, [location]);

  const isLoggedIn = false;

  return (
    <>
      <h1>Header: {state}</h1>
      <Routes>
        <Route element={<ProtectedRoutes isLoggedIn={isLoggedIn} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/coffee-form" element={<CoffeeFormPage />} />
        </Route>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user-form" element={<UserFormPage />} />
      </Routes>
    </>
  );
}

export default App;
