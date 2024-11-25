import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import { LoginPage } from "./pages/login/login";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { HomePage } from "./pages/home/home";
import { FavoritesPage } from "./pages/favorites/favorites";
import { MainPage } from "./pages/main/main";
import { Result } from "antd";
import { Button } from "./components/Button/Button";
import { useSelector } from "react-redux";
import { IRootSate } from "./redux/store";

function App() {
  const isAuth = localStorage.getItem("token");
  const { error } = useSelector((state: IRootSate) => state.error);
  return (
    <BrowserRouter>
      {error && (
        <div className="mask"> 
          <Result
            status="error"
            title="Submission Failed"
            subTitle="Please check and modify the following information before resubmitting."
            extra={[<Button type="button" content="console" />]}
          ></Result>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            isAuth ? <Navigate to={"/home"} /> : <Navigate to={"/login"} />
          }
        />
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
