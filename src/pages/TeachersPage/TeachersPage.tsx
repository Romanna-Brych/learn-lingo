import { useInfiniteQuery } from "@tanstack/react-query";
import TeacherCard from "../../components/TeacherCard/TeacherCard";
import { getTeachersPage } from "../../services/teachers";
import css from "./TeachersPage.module.css";

const TeachersPage = () => {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["teachers"],
    queryFn: ({ pageParam }) => getTeachersPage(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const teachers = data?.pages.flatMap((page) => page.teachers) ?? [];

  if (isPending) return <p>Loading teachers...</p>;
  if (isError) return <p>Failed to load teachers</p>;

  return (
    <section className={css.section}>
      <div>
        <ul className={css.list}>
          {teachers.map((teacher) => (
            <li key={teacher.id} className={css.item}>
              <TeacherCard teacher={teacher} />
            </li>
          ))}
        </ul>

        {hasNextPage && (
          <div className={css.loadMoreWrapper}>
            <button
              type="button"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className={css.loadMoreBtn}
            >
              {isFetchingNextPage ? "Loading..." : "Load more"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TeachersPage;
