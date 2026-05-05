import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import TeachersFilters from "../../components/TeachersFilters/TeachersFilters";
import { getAllTeachers } from "../../services/teachers";
import { filterTeachers } from "../../utils/filterTeachers";
import css from "./TeachersPage.module.css";

const TEACHERS_PER_PAGE = 4;

const TeachersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(TEACHERS_PER_PAGE);

  const language = searchParams.get("language") ?? "";
  const level = searchParams.get("level") ?? "";
  const price = searchParams.get("price") ?? "";

  const {
    data: teachers = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["teachers", "all"],
    queryFn: getAllTeachers,
  });

  const filteredTeachers = useMemo(() => {
    return filterTeachers(teachers, { language, level, price });
  }, [teachers, language, level, price]);

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTeachers.length;

  const handleFilterChange = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    setVisibleCount(TEACHERS_PER_PAGE);
    setSearchParams(params);
  };

  const handleReset = () => {
    setVisibleCount(TEACHERS_PER_PAGE);
    setSearchParams({});
  };

  if (isPending) return <p>Loading teachers...</p>;
  if (isError) return <p>Failed to load teachers.</p>;

  return (
    <section className={css.section}>
      <TeachersFilters
        language={language}
        level={level}
        price={price}
        onChange={handleFilterChange}
        onReset={handleReset}
      />

      {visibleTeachers.length === 0 ? (
        <p className={css.message}>No teachers found.</p>
      ) : (
        <>
          <ul className={css.list}>
            {visibleTeachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherCard teacher={teacher} />
              </li>
            ))}
          </ul>

          {hasMore && (
            <div className={css.loadMoreWrapper}>
              <button
                type="button"
                className={css.loadMoreBtn}
                onClick={() =>
                  setVisibleCount((prev) => prev + TEACHERS_PER_PAGE)
                }
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default TeachersPage;
