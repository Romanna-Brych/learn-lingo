import { useEffect, useState } from "react";
import { getTeachers } from "../../services/teachers";
import type { Teacher } from "../../types/teacher";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const data = await getTeachers();
        setTeachers(data);
      } catch {
        setError("Failed to load teachers");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (isLoading) return <p>Loading teachers...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h1>Teachers</h1>

      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.name} {teacher.surname} — ${teacher.price_per_hour}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TeachersPage;
