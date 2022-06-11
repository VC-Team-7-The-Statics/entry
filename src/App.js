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
import CoffeeFormPage from "./pages/CoffeeFormPage";
import { setUser } from "./features/user/userSlice";
import ApiService from "./services/Api";

const ApiInstance = new ApiService(axios);

function App() {
  const dispatch = useDispatch();

  const { isLoading } = useQuery("auto-login", ApiInstance.login, {
    onSuccess: ({ data }) => {
      if (data.success) {
        if (window.isNativeApp) {
          window.ReactNativeWebView.postMessage(`token ${data.token}`);
        }

        const user = {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          image: data.user.image,
          languages: data.user.languages,
          expertise: data.user.expertise,
          price: data.user.price,
          likes: data.user.likes,
          match: data.user.match,
          location: data.user.location,
        };

        dispatch(setUser(user));
      }
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/coffee-form/:userId" element={<CoffeeFormPage />} />
        </Route>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
