import React from "react";
import style from "./Search.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { IoHeartOutline } from "react-icons/io5";
import { IFullVideo } from "../../services/Types";

interface ISearchProps {
  results?: IFullVideo[];
  search: string;
  setSearch: (value: string) => void;
  handlerSearch: () => void;
  setIsModalActive: (value: boolean) => void;
}

export const Search: React.FC<ISearchProps> = ({
  results,
  search,
  setSearch,
  handlerSearch,
  setIsModalActive
}) => {
  return (
    <div className={results?.length ? style.search_on_top : style.search}>
      <h1 className={style.search_title}>Поиск видео</h1>
      <div className={style.input_div}>
        <Input
          type="text"
          value={search}
          placeholder={"Что хотите посмотреть?"}
          className={style.search_input}
          handler={(e) => setSearch(e.target.value)}
        />
        {results?.length && (
          <div className={style.icon} onClick={() => setIsModalActive(true)}>
            <IoHeartOutline />
          </div>
        )}
        <Button
          type={"button"}
          content={"Найти"}
          className={style.search_button}
          onClick={handlerSearch}
        />
      </div>
    </div>
  );
};
