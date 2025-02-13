import React, { useEffect, useState } from "react";
import style from "./Search.module.css";
import { Input } from "antd";
import { Button } from "../Button/Button";
import { IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IRootSate } from "../../redux/store";
import { addRequest, getVideos } from "../../redux/actions/videoAction";
import { searchApi } from "../../services/Search.service";
import { Tooltip } from "antd";

interface ISearchProps {
  setIsModalActive: (value: boolean) => void;
}

export const Search: React.FC<ISearchProps> = ({ setIsModalActive }) => {
  const [search, setSearch] = useState("");
  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(false);
  const dispatch = useDispatch();
  const { videos, request } = useSelector((state: IRootSate) => state.video);
  const { user } = useSelector((state: IRootSate) => state.user);

  useEffect(() => {
    const isFavorite = user?.requests.some((item) => item.request === search);
    setIsFavorite(isFavorite);
  }, [search, user?.requests]);

  useEffect(() => {
    if (request) {
      setSearch(request);
    }
  }, [request]);

  const handlerChangeRequest = (value: string) => {
    setSearch(value);
  };

  const handlerSearch = async () => {
    const results = await searchApi.getVideos(search);
    if (results) {
      dispatch(getVideos(results));
      dispatch(addRequest(search));
    }
  };

  const onFormSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = await searchApi.getVideos(search);
    if (results) {
      dispatch(getVideos(results));
      dispatch(addRequest(search));
    }
  };

  return (
    <div className={videos?.length ? style.search_on_top : style.search}>
      <h1 className={style.search_title}>Поиск видео</h1>
      <form className={style.input_div} onSubmit={onFormSubmitHandler}>
        <Input
          type="text"
          value={search}
          placeholder={"Что хотите посмотреть?"}
          className={style.search_input}
          onChange={(e) => handlerChangeRequest(e.target.value)}
          suffix={
            search && (
              <Tooltip
                placement="bottom"
                title={
                  <div className={style.tooltip}>
                    <span className={style.tooltipTitle}>
                      Поиск сохранён в разделе «Избранное»
                    </span>
                    <a href="/favorite" className={style.tooltipLink}>
                      Перейти в избранное
                    </a>
                  </div>
                }
                arrow={true}
                color={"#fcfafaf1"}
                open={isFavorite}
                trigger={"hover"}
              >
                <div
                  className={style.icon}
                  onClick={() => setIsModalActive(true)}
                >
                  <IoHeartOutline color={isFavorite ? "#1890FF" : "#d1d1d1"} />
                </div>
              </Tooltip>
            )
          }
        />

        <Button
          type={"button"}
          content={"Найти"}
          className={style.search_button}
          onClick={handlerSearch}
        />
      </form>
    </div>
  );
};
