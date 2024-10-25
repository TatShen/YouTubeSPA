import { Auth } from "../../components/Auth/Auth";
import style from "./login.module.css"

export const LoginPage = () => {
  return (
    <div className={style.container}>
      <Auth />
    </div>
  );
};
