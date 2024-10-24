import { useState } from "react";

import style from "./home.module.css";
import { Header } from "../../components/Header/Header";
import { searchApi } from "../../services/Search.service";
import { Search } from "../../components/Search/Search";
import { Card } from "../../components/Card/Card";
import { ISearchFullResponse } from "../../services/Types";

export const HomePage = () => {
  const [results, setResults] = useState<ISearchFullResponse>();
  const [search, setSearch] = useState("");
  const [typeOfWrapper, setTypeOfWrapper] = useState("table");
  const handlerSearch = async () => {
    const result = await searchApi.getVideos(search);
    if (result) {
      setResults(result);
    }
  };
  return (
    <>
      <Header />
      <div className={style.container}>
        <Search
          results={results?.items}
          search={search}
          setSearch={setSearch}
          handlerSearch={handlerSearch}
        />
        {results?.items.length && (
          <div className={style.result}>
            <div className={style.searchValue}>
              <span>Видео по запросу </span>
              <span className={style.value}> «{search}» </span>
              <span className={style.amount}>
                {results.pageInfo.totalResults}
              </span>
              <div className={style.icons}>
                <img
                  src="/list.svg"
                  alt="list"
                  className={style.icon}
                  onClick={() => setTypeOfWrapper("list")}
                  style={{opacity: typeOfWrapper === "list" ? 1 : 0.3}}
                />
                <img
                  src="/table.svg"
                  alt="table"
                  className={style.icon}
                  onClick={() => setTypeOfWrapper("table")}
                  style={{opacity: typeOfWrapper === "table" ? 1 : 0.3}}
                />
              </div>
            </div>
            <div className={style.videoWrapper} style={{flexDirection: typeOfWrapper === "list" ? "column" : "row"}}>
              {results?.items.map((video) => (
                <Card key={video.id} info={video} typeOfWrapper={typeOfWrapper}></Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
