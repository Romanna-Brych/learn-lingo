import { useState } from "react";
import type { Teacher } from "../../types/teacher";
import css from "./TeacherCard.module.css";

type Props = {
  teacher: Teacher;
};

const getLevelClassName = (index: number) => {
  return index === 0 ? `${css.level} ${css.activeLevel}` : css.level;
};

const TeacherCard = ({ teacher }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <article className={css.card}>
      <div className={css.avatarWrapper}>
        <img
          src={teacher.avatar_url}
          alt={`${teacher.name} ${teacher.surname}`}
          className={css.avatar}
        />
        <span className={css.onlineDot}></span>
      </div>

      <div className={css.content}>
        <div className={css.headerRow}>
          <div>
            <p className={css.label}>Languages</p>
            <h2 className={css.name}>
              {teacher.name} {teacher.surname}
            </h2>
          </div>

          <div className={css.meta}>
            <span className={css.metaItem}>
              <svg className={css.bookIcon}>
                <use href="/sprite.svg#icon-book-open" />
              </svg>
              Lessons online
            </span>

            <span className={css.metaItem}>
              Lessons done: {teacher.lessons_done}
            </span>

            <span className={css.metaItem}>
              <svg className={css.star}>
                <use href="/sprite.svg#icon-star" />
              </svg>
              Rating: {teacher.rating}
            </span>

            <span className={css.metaItem}>
              Price / 1 hour:{" "}
              <strong className={css.price}>{teacher.price_per_hour}$</strong>
            </span>

            <button
              type="button"
              className={css.heartBtn}
              aria-label="Add to favorites"
            >
              <svg className={css.heartIcon}>
                <use href="/sprite.svg#icon-heart" />
              </svg>
            </button>
          </div>
        </div>

        <div className={css.info}>
          <p className={css.infoRow}>
            <span className={css.infoTitle}>Speaks: </span>
            <span className={css.underlined}>
              {teacher.languages.join(", ")}
            </span>
          </p>

          <p className={css.infoRow}>
            <span className={css.infoTitle}>Lesson Info: </span>
            <span>{teacher.lesson_info}</span>
          </p>

          <p className={css.infoRow}>
            <span className={css.infoTitle}>Conditions: </span>
            <span>{teacher.conditions.join(" ")}</span>
          </p>
        </div>

        {!isExpanded && (
          <button
            type="button"
            className={css.readMoreBtn}
            onClick={() => setIsExpanded(true)}
          >
            Read more
          </button>
        )}

        {isExpanded && (
          <div className={css.expanded}>
            <p className={css.experience}>{teacher.experience}</p>

            <ul className={css.reviews}>
              {teacher.reviews.map((review, index) => (
                <li key={index} className={css.review}>
                  <div className={css.reviewHeader}>
                    <img
                      src={
                        review.reviewer_avatar_url ||
                        "/images/default-avatar.jpeg"
                      }
                      alt={review.reviewer_name}
                      className={css.reviewAvatar}
                    />

                    <div>
                      <p className={css.reviewName}>{review.reviewer_name}</p>
                      <p className={css.reviewRating}>
                        <svg className={css.star}>
                          <use href="/sprite.svg#icon-star" />
                        </svg>
                        {review.reviewer_rating}.0
                      </p>
                    </div>
                  </div>

                  <p className={css.reviewText}>{review.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ul className={css.levels}>
          {teacher.levels.map((level, index) => (
            <li key={level} className={getLevelClassName(index)}>
              #{level}
            </li>
          ))}
        </ul>

        {isExpanded && (
          <button type="button" className={css.bookBtn}>
            Book trial lesson
          </button>
        )}
      </div>
    </article>
  );
};

export default TeacherCard;
