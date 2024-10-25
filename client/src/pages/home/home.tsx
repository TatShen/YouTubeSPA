import { useEffect, useState } from "react";

import style from "./home.module.css";
import { Header } from "../../components/Header/Header";
import { searchApi } from "../../services/Search.service";
import { Search } from "../../components/Search/Search";
import { Card } from "../../components/Card/Card";
import { IFullVideo } from "../../services/Types";
import { useDispatch, useSelector } from "react-redux";
import { getVideos } from "../../redux/actions/videoAction";
import { IRootSate } from "../../redux/store";
import { Modal } from "../../components/Modal/Modal";

export const HomePage = () => {
  const dispatch = useDispatch();
  const results = useSelector((state: IRootSate) => state.video);
  const [isModalActive, setIsModalActive] = useState(false)
  const [search, setSearch] = useState("");
  const [typeOfWrapper, setTypeOfWrapper] = useState("table");
  const handlerSearch = async () => {
    const results = await searchApi.getVideos(search);
    if (results) {
      dispatch(getVideos(results));
    }
  };

  useEffect(() => {
    if (isModalActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isModalActive]);
  
  return (
    <>
      <Header />
      {isModalActive && <Modal/>}
      <div className={style.container}>
        <Search
          results={results?.videos}
          search={search}
          setSearch={setSearch}
          handlerSearch={handlerSearch}
          setIsModalActive={setIsModalActive}
        />
        {results?.amountOfVideos && (
          <div className={style.result}>
            <div className={style.searchValue}>
              <span>Видео по запросу </span>
              <span className={style.value}> «{search}» </span>
              <span className={style.amount}>{results.amountOfVideos}</span>
              <div className={style.icons}>
                <img
                  src="/list.svg"
                  alt="list"
                  className={style.icon}
                  onClick={() => setTypeOfWrapper("list")}
                  style={{ opacity: typeOfWrapper === "list" ? 1 : 0.3 }}
                />
                <img
                  src="/table.svg"
                  alt="table"
                  className={style.icon}
                  onClick={() => setTypeOfWrapper("table")}
                  style={{ opacity: typeOfWrapper === "table" ? 1 : 0.3 }}
                />
              </div>
            </div>
            <div
              className={style.videoWrapper}
              style={{
                flexDirection: typeOfWrapper === "list" ? "column" : "row",
              }}
            >
              {results?.videos.map((video: IFullVideo) => (
                <Card
                  key={video.id}
                  info={video}
                  typeOfWrapper={typeOfWrapper}
                ></Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
