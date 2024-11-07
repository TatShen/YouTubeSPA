import React from "react";
import style from "./favorites.module.css";
import { useSelector } from "react-redux";
import { IRootSate } from "../../redux/store";

export const FavoritesPage: React.FC = () => {
  const { user } = useSelector((state: IRootSate) => state.user);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Избранное</h1>
      {user?.requests?.length ? (
        <ul className={style.list}>
          {user?.requests?.map((request) => (
            <li key={request.id} className={style.request}>
              {request.request}
            </li>
          ))}
        </ul>
      ) : (
        <div>gfgfgf</div>
      )}
    </div>
  );
};
