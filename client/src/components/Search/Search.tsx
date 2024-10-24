import React from "react";
import style from "./Search.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { IVideo } from "../../services/Search.service";
import { IoHeartOutline } from "react-icons/io5";

interface ISearchProps {
  results?: IVideo[];
  search: string;
  setSearch: (value: string) => void;
  handlerSearch: () => void;
}

export const Search: React.FC<ISearchProps> = ({
  results,
  search,
  setSearch,
  handlerSearch,
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
          icon={results?.length && <IoHeartOutline />}
        />
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
