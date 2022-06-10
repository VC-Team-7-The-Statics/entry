import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery } from "react-query";
import axios from "axios";

import WelcomePage from "./pages/WelcomePage";
import HomePage from "./pages/HomePage";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UserFormPage from "./pages/UserFormPage";
import CoffeeFormPage from "./pages/CoffeeFormPage";
import { setUser } from "./features/user/userSlice";
import ApiService from "./services/Api";
import { useEffect } from "react";

const ApiInstance = new ApiService(axios);

function App() {
  const dispatch = useDispatch();

  const { isLoading, refetch } = useQuery("auto-login", ApiInstance.login, {
    onSuccess: ({ data }) => {
      if (data.success) {
        if (window.isNativeApp) {
          window.ReactNativeWebView.postMessage(`token ${data.token}`);
        }

        const user = {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          location: data.user.location,
        };

        dispatch(setUser(user));
      }
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
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
