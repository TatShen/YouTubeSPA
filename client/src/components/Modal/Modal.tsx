import { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import style from "./Modal.module.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export const Modal = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onFormSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(login, password);
  };

  return (
    <div className={style.modal_container}>
      <img src="/logo.svg" alt="Logo" />
      <h1>Вход</h1>
      <form onSubmit={onFormSubmitHandler}>
        <Input
          type="text"
          label="Логин"
          className={style.input}
          value={password}
          handler={(e) => setLogin(e.target.value)}
        />
        <Input
          type={isPasswordHidden ? "password" : "text"}
          label="Пароль"
          className={style.input}
          icon={isPasswordHidden ? <IoEyeOffOutline /> : <IoEyeOutline />}
          onClick={() => setIsPasswordHidden(!isPasswordHidden)}
          value={login}
          handler={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" content="Войти" />
      </form>
    </div>
  );
};
