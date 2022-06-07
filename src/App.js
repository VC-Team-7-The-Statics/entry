import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";

import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UserFormPage from "./pages/UserFormPage";
import CoffeeFormPage from "./pages/CoffeeFormPage";
import { selectUser, setUser } from "./features/user/userSlice";
import ApiService from "./services/Api";

const ApiInstance = new ApiService(axios);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const { isLoading, data } = useQuery("auth-status-check", ApiInstance.login);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (data.data.success && window.isNativeApp) {
    window.ReactNativeWebView.postMessage(`token ${data.data.token}`);

    const { _id, name, email, location } = data.data.user;
    const user = {
      id: _id,
      name,
      email,
      location,
    };

    dispatch(setUser(user));
  }

  const isLoggedIn = !!user.name;

  return (
    <>
      <h1>{JSON.stringify(user)}</h1>
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
