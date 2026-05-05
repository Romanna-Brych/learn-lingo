import type { Teacher } from "../types/teacher";

export type TeacherFilters = {
  language: string;
  level: string;
  price: string;
};

export const filterTeachers = (
  teachers: Teacher[],
  filters: TeacherFilters,
): Teacher[] => {
  return teachers.filter((teacher) => {
    const matchesLanguage = filters.language
      ? teacher.languages.includes(filters.language)
      : true;

    const matchesLevel = filters.level
      ? teacher.levels.includes(filters.level)
      : true;

    const matchesPrice = filters.price
      ? teacher.price_per_hour <= Number(filters.price)
      : true;

    return matchesLanguage && matchesLevel && matchesPrice;
  });
};
