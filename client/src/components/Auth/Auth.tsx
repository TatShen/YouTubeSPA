import { useState } from "react";
import { Input } from 'antd';
import { Button } from "../Button/Button";
import style from "./Auth.module.css";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
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
      return
    }
    
    const data = await userApi.login({login, password})
    localStorage.setItem("token", data.access_token)
    navigate("/home")
  };

  return (
    <div className={style.modal_container}>
      <img src="/logo.svg" alt="Logo" />
      <h1>{isRegistration ? "Регистрация" : "Вход"}</h1>
      <form onSubmit={onFormSubmitHandler} className={style.form}>
        <span>Логин</span>
        <Input
          type="text"
          placeholder=""
          className={style.input}
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <span>Пароль</span>
        <Input.Password
          type={isPasswordHidden ? "password" : "text"}
          placeholder=""
          className={style.input}
          iconRender={(isPasswordHidden: boolean) => (isPasswordHidden ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          onClick={() => setIsPasswordHidden(!isPasswordHidden)}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isRegistration && (
          <>
          <span>Повторите пароль</span>
          <Input.Password
            type={isPasswordHidden ? "password" : "text"}
            placeholder=""
            className={style.input}
            iconRender={(isPasswordHidden: boolean) => (isPasswordHidden ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            onClick={() => setIsPasswordHidden(!isPasswordHidden)}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          </>
        )}
        <Button
          type="submit"
          content={isRegistration ? "Зарегистрироваться" : "Войти"}
          className={style.btn}
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
