import { useEffect, useState } from "react";

import style from "./home.module.css";
import { Search } from "../../components/Search/Search";
import { Card } from "../../components/Card/Card";
import { IFullVideo } from "../../services/Types";
import { useSelector } from "react-redux";
import { IRootSate } from "../../redux/store";
import { Modal } from "../../components/Modal/Modal";

export const HomePage = () => {
  const {videos, amountOfVideos, request} = useSelector((state: IRootSate) => state.video);
  const [isModalActive, setIsModalActive] = useState(false)
  const [typeOfWrapper, setTypeOfWrapper] = useState("table");


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
      {isModalActive && <Modal searchValue={request} setIsModalActive={setIsModalActive}/>}
      <div className={style.container}>
        <Search
          setIsModalActive={setIsModalActive}
        />
        {amountOfVideos && (
          <div className={style.result}>
            <div className={style.searchValue}>
              <span>Видео по запросу </span>
              <span className={style.value}> «{request}» </span>
              <span className={style.amount}>{amountOfVideos}</span>
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
              {videos.map((video: IFullVideo) => (
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
