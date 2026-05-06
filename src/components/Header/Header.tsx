import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import css from "./Header.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <header className={css.header}>
      <div className={css.inner}>
        <NavLink to="/" className={css.logo}>
          <svg className={css.logoIcon}>
            <use href="/sprite.svg#icon-logo" />
          </svg>
          LearnLingo
        </NavLink>

        <nav className={css.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/teachers"
            className={({ isActive }) =>
              isActive ? `${css.link} ${css.active}` : css.link
            }
          >
            Teachers
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                isActive ? `${css.link} ${css.active}` : css.link
              }
            >
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
              <button
                type="button"
                className={css.loginBtn}
                onClick={() => setIsLoginOpen(true)}
              >
                <svg className={css.loginIcon}>
                  <use href="/sprite.svg#icon-log-in" />
                </svg>
                Log in
              </button>
              <button
                type="button"
                className={css.registerBtn}
                onClick={() => setIsRegisterOpen(true)}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>
      {isLoginOpen && (
        <Modal onClose={() => setIsLoginOpen(false)}>
          <LoginForm onClose={() => setIsLoginOpen(false)} />
        </Modal>
      )}
      {isRegisterOpen && (
        <Modal onClose={() => setIsRegisterOpen(false)}>
          <RegisterForm onClose={() => setIsRegisterOpen(false)} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
