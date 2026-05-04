import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import css from "./Header.module.css";

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.inner}>
          <NavLink to="/" className={css.logo}>
            <svg className={css.logoIcon}>
              <use href="/sprite.svg#icon-logo" />
            </svg>
            LearnLingo
          </NavLink>

          <nav className={css.nav}>
            <NavLink to="/" className={css.link}>
              Home
            </NavLink>
            <NavLink to="/teachers" className={css.link}>
              Teachers
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/favorites" className={css.link}>
                Favorites
              </NavLink>
            )}
          </nav>

          <div className={css.auth}>
            {isLoggedIn ? (
              <>
                <span className={css.userEmail}>{user?.email}</span>
                <button type="button" className={css.loginBtn} onClick={logout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <button type="button" className={css.loginBtn}>
                  <svg className={css.loginIcon}>
                    <use href="/sprite.svg#icon-log-in" />
                  </svg>
                  Log in
                </button>
                <button type="button" className={css.registerBtn}>
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
