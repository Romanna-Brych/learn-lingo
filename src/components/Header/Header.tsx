import { NavLink } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.header}>
      <NavLink to="/" className={css.logo}>
        LearnLingo
      </NavLink>

      <nav className={css.nav}>
        <NavLink to="/" className={css.link}>
          Home
        </NavLink>
        <NavLink to="/teachers" className={css.link}>
          Teachers
        </NavLink>
      </nav>

      <div className={css.auth}>
        <button type="button" className={css.loginBtn}>
          Log in
        </button>
        <button type="button" className={css.registerBtn}>
          Registration
        </button>
      </div>
    </header>
  );
};

export default Header;
