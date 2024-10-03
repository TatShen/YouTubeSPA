import { NavLink } from "react-router-dom"
import style from "./Header.module.css"
import { Button } from "../Button/Button"

export const Header = () => {
    const logout = () => {

    }
    return <div className={style.container}>
      <div className={style.header}>
         <img src="/logo.svg" alt="Logo" />
         <ul className={style.nav}>
           <NavLink to={"/home"} className={style.nav_link}>Поиск</NavLink>
           <NavLink to={"/favorite"}  className={style.nav_link}>Избранные</NavLink>
         </ul>
         <Button type="button" content="Выйти" onClick={logout} className={style.logout_button}/>
    </div>
    </div>
    
}