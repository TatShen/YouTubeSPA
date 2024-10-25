import { useState } from "react";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import style from "./Auth.module.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { userApi } from "../../services/User.service";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("")
  const [isRegistration, setIsRegistration] = useState(false);
  const navigate = useNavigate()
 
  const onFormSubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isRegistration && password===repeatPassword){
      await userApi.registration({login, password})
    }
    
    const data = await userApi.login({login, password})
    localStorage.setItem("token", data.access_token)
    navigate("/home")
  };

  return (
    <div className={style.modal_container}>
      <img src="/logo.svg" alt="Logo" />
      <h1>{isRegistration ? "Регистрация" : "Вход"}</h1>
      <form onSubmit={onFormSubmitHandler}>
        <Input
          type="text"
          label="Логин"
          className={style.input}
          value={login}
          handler={(e) => setLogin(e.target.value)}
        />
        <Input
          type={isPasswordHidden ? "password" : "text"}
          label="Пароль"
          className={style.input}
          icon={isPasswordHidden ? <IoEyeOffOutline /> : <IoEyeOutline />}
          onClick={() => setIsPasswordHidden(!isPasswordHidden)}
          value={password}
          handler={(e) => setPassword(e.target.value)}
        />
        {isRegistration && (
          <Input
            type={isPasswordHidden ? "password" : "text"}
            label="Повторите пароль"
            className={style.input}
            icon={isPasswordHidden ? <IoEyeOffOutline /> : <IoEyeOutline />}
            onClick={() => setIsPasswordHidden(!isPasswordHidden)}
            value={repeatPassword}
            handler={(e) => setRepeatPassword(e.target.value)}
          />
        )}
        <Button
          type="submit"
          content={isRegistration ? "Зарегистрироваться" : "Войти"}
        />
      </form>

      <Button
        type="button"
        content={isRegistration ? "Вход" : "Регистрация"}
        className={style.change_form}
        onClick={() => setIsRegistration(!isRegistration)}
      />
    </div>
  );
};
