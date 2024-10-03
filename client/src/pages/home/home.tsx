import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";

import style from "./home.module.css";
import { IoHeartOutline } from "react-icons/io5";

export const HomePage = () => {
  const [results, setResults] = useState(["k"]);
  const [search, setSearch] = useState("");
  const handlerSearch = () => {
    console.log(search)
  }
  return (
    <div className={style.container}>
      <div className={results.length ? style.search_on_top : style.search}>
        <h1 className={style.search_title}>Поиск видео</h1>
        <div className={style.input_div}>
          <Input
            type="text"
            value={search}
            placeholder={"Что хотите посмотреть?"}
            className={style.search_input}
            handler={(e) => setSearch(e.target.value)}
            icon={results.length && <IoHeartOutline/>}
          />
          <Button
            type={"button"}
            content={"Найти"}
            className={style.search_button}
            onClick={handlerSearch}
          />
        </div>
      </div>
    </div>
  );
};
