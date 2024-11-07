import React, { useEffect, useState } from "react";
import style from "./Search.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IRootSate } from "../../redux/store";
import { addRequest, getVideos } from "../../redux/actions/videoAction";
import { searchApi } from "../../services/Search.service";

interface ISearchProps {
  setIsModalActive: (value: boolean) => void;
}

export const Search: React.FC<ISearchProps> = ({
  setIsModalActive
}) => {
  const [search, setSearch] = useState("")
  const dispatch = useDispatch();
  const {videos, request} = useSelector((state: IRootSate) => state.video);

  useEffect(()=> {
    if(request){
      setSearch(request)
    }
  },[request])

  const handlerChangeRequest = (value: string) => {
    setSearch(value)
  }

  const handlerSearch = async () => {
    const results = await searchApi.getVideos(search);
    if (results) {
      dispatch(getVideos(results));
      dispatch(addRequest(search))
    }
  };
  
  
  return (
    <div className={videos?.length ? style.search_on_top : style.search}>
      <h1 className={style.search_title}>Поиск видео</h1>
      <div className={style.input_div}>
        <Input
          type="text"
          value={search}
          placeholder={"Что хотите посмотреть?"}
          className={style.search_input}
          handler={(e) => handlerChangeRequest(e.target.value)}
        />
        {videos?.length && (
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
