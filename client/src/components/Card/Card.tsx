import React from "react";
import style from "./Card.module.css";
import { IFullVideo } from "../../services/Types";

interface ICard {
  info: IFullVideo;
}

export const Card: React.FC<ICard> = ({ info }) => {
  return (
    <div className={style.card}>
      <div>
        <div dangerouslySetInnerHTML={{ __html: info.player.embedHtml }} />
      </div>

      <div className={style.info}>
        <h2 className={style.title}>{info?.snippet.title}</h2>
        <span className={style.channel}>{info?.snippet.channelTitle}</span>
        <span className={style.viewCount}>
          {Math.floor(Number(info.statistics.viewCount) / 1000)} тыс. просмотров
        </span>
      </div>
    </div>
  );
};
