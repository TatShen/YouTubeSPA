import React from "react";
import style from "./Modal.module.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export const Modal: React.FC = () => {
  return (
    <div className={style.mask}>
      <div className={style.modal}>
        <h1>Сохранить запрос</h1>
        <Input
          type="text"
          label="Запрос"
          className={style.input}
          value={"jjj"}
          readonly={true}
        />
        <Input
          type="text"
          label="Название"
          className={style.input}
          value={"jjj"}
          readonly={true}
          placeholder="Укажите название"
        />
        <Button
          type="button"
          content={"Не сохранять"}
          className={style.change_form}
          onClick={() => {}}
        />
        <Button
          type="button"
          content={"Сохранить"}
          className={style.change_form}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};
