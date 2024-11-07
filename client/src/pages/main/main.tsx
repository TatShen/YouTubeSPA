import React, { useEffect } from "react";
import { Header } from "../../components/Header/Header";
import { Outlet } from "react-router-dom";
import style from "./main.module.css"
import { useDispatch } from "react-redux";
import { userApi } from "../../services/User.service";
import { getUser } from "../../redux/actions/userAction";

export const MainPage: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userApi.getUser();
        console.log(data.user)
        dispatch(getUser(data.user));
      } catch (error) {
        console.error("Ошибка получения данных пользователя:", error);
      }
    };
  
    fetchData();
  }, [dispatch]);
  return (
    <div className={style.container}>
      <Header />
      <Outlet/>
    </div>
  );
};
