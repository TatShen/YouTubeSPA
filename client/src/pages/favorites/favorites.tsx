import React from "react";
import style from "./favorites.module.css";
import { useDispatch, useSelector } from "react-redux";
import { IRootSate } from "../../redux/store";
import { searchApi } from "../../services/Search.service";
import { IRequest } from "../../redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import { addRequest, getVideos } from "../../redux/actions/videoAction";

export const FavoritesPage: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state: IRootSate) => state.user);

  const handlerClick = async(request: IRequest) => {
    const results = await searchApi.getVideos(request.request, request.limit, request.sort)
    if (results) {
      dispatch(addRequest(request.request))
      dispatch(getVideos(results))
      navigate("/home")
    }
  }

  return (
    <div className={style.container}>
      <h1 className={style.title}>Избранное</h1>
      {user?.requests?.length ? (
        <ul className={style.list}>
          {user?.requests?.map((request) => (
            <li key={request.id} className={style.request} onClick={() => handlerClick(request)}>
              {request.request}
            </li>
          ))}
        </ul>
      ) : (
        <span className={style.empty}>У Вас нет сохраненных запросов!</span>
      )}
    </div>
  );
};
