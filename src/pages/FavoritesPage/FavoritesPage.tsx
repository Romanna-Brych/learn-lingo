import { useQuery } from "@tanstack/react-query";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../hooks/useFavorites";
import { getTeachersByIds } from "../../services/teachers";
import css from "./FavoritesPage.module.css";

const FavoritesPage = () => {
  const { isLoggedIn } = useAuth();
  const { favoriteIds } = useFavorites();

  const {
    data: favoriteTeachers = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["favoriteTeachers", favoriteIds],
    queryFn: () => getTeachersByIds(favoriteIds),
    enabled: isLoggedIn && favoriteIds.length > 0,
  });

  if (!isLoggedIn) {
    return (
      <section className={css.section}>
        <p className={css.message}>Please log in to view your favorites.</p>
      </section>
    );
  }

  if (favoriteIds.length === 0) {
    return (
      <section className={css.section}>
        <p className={css.message}>You have no favorite teachers yet.</p>
      </section>
    );
  }

  if (isPending) {
    return (
      <section className={css.section}>
        <p className={css.message}>Loading favorites...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={css.section}>
        <p className={css.message}>Failed to load favorites.</p>
      </section>
    );
  }

  return (
    <section className={css.section}>
      <ul className={css.list}>
        {favoriteTeachers.map((teacher) => (
          <li key={teacher.id}>
            <TeacherCard teacher={teacher} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FavoritesPage;
