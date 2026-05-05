import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={css.hero}>
      <div className={css.inner}>
        <div className={css.content}>
          <h1 className={css.title}>
            Unlock your potential with the best{" "}
            <span className={css.highlight}>language</span> tutors
          </h1>

          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors.
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>

          <Link to="/teachers" className={css.ctaBtn}>
            Get started
          </Link>
        </div>

        <div className={css.imageWrapper}>
          <img
            src="/images/hero.webp"
            srcSet="/images/hero-2x.webp 2x"
            alt="Teachers"
            className={css.image}
          />
        </div>
      </div>

      <div className={css.statsBox}>
        <ul className={css.stats}>
          <li className={css.statItem}>
            <span className={css.statNumber}>32,000+</span>
            <span className={css.statLabel}>Experienced tutors</span>
          </li>

          <li className={css.statItem}>
            <span className={css.statNumber}>300,000+</span>
            <span className={css.statLabel}>5-star tutor reviews</span>
          </li>

          <li className={css.statItem}>
            <span className={css.statNumber}>120+</span>
            <span className={css.statLabel}>Subjects taught</span>
          </li>

          <li className={css.statItem}>
            <span className={css.statNumber}>200+</span>
            <span className={css.statLabel}>Tutor nationalities</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HomePage;
