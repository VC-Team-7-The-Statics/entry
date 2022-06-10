import "./App.scss";
import { Routes, Route, Link } from "react-router-dom";
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

  const { refetch } = useQuery("auto-login", ApiInstance.login, {
    onSuccess: ({ data }) => {
      if (data.success) {
        window.ReactNativeWebView.postMessage(`token ${data.token}`);

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

  return (
    <>
      {/* FIX ME: 모바일에서 라우팅 기능이 없어 라우팅이 용이하게 임의로 작성한 코드입니다.  */}
      <ul>
        <li>
          <Link to="/">/</Link>
        </li>
        <li>
          <Link to="/coffee-form">/coffee-form</Link>
        </li>
        <li>
          <Link to="/welcome">/welcome</Link>
        </li>
        <li>
          <Link to="/signup">/signup</Link>
        </li>
        <li>
          <Link to="/login">/login</Link>
        </li>
        <li>
          <Link to="/user-form">/user-form</Link>
        </li>
      </ul>
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
