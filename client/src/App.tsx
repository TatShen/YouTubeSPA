import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { LoginPage } from "./pages/login/login";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { HomePage } from "./pages/home/home";
import { FavoritesPage } from "./pages/favorites/Favorites";
import { MainPage } from "./pages/main/main";

function App() {
  const isAuth = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to={"/home"}/> :<Navigate to={"/login"}/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainPage />}>
            <Route path="home" element={<HomePage />} />
            <Route path="favorite" element={<FavoritesPage />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
