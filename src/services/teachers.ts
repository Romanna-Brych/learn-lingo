import {
  get,
  limitToFirst,
  orderByKey,
  query,
  ref,
  startAfter,
} from "firebase/database";
import { database } from "./firebase";
import type { Teacher } from "../types/teacher";

type TeacherFromDb = Omit<Teacher, "id">;

const TEACHERS_PER_PAGE = 4;

type TeachersPageResponse = {
  teachers: Teacher[];
  nextCursor: string | null;
};

export const getTeachersPage = async (
  cursor: string | null = null,
): Promise<TeachersPageResponse> => {
  const teachersRef = ref(database, "teachers");

  const teachersQuery = cursor
    ? query(
        teachersRef,
        orderByKey(),
        startAfter(cursor),
        limitToFirst(TEACHERS_PER_PAGE),
      )
    : query(teachersRef, orderByKey(), limitToFirst(TEACHERS_PER_PAGE));

  const snapshot = await get(teachersQuery);

  if (!snapshot.exists()) {
    return {
      teachers: [],
      nextCursor: null,
    };
  }

  const data = snapshot.val() as Record<string, TeacherFromDb>;

  const teachers = Object.entries(data).map(([id, teacher]) => ({
    id,
    ...teacher,
  }));

  const nextCursor =
    teachers.length === TEACHERS_PER_PAGE
      ? teachers[teachers.length - 1].id
      : null;

  return {
    teachers,
    nextCursor,
  };
};

export const getTeacherById = async (
  teacherId: string,
): Promise<Teacher | null> => {
  const snapshot = await get(ref(database, `teachers/${teacherId}`));

  if (!snapshot.exists()) {
    return null;
  }

  const teacher = snapshot.val() as TeacherFromDb;

  return {
    id: teacherId,
    ...teacher,
  };
};

export const getTeachersByIds = async (
  teacherIds: string[],
): Promise<Teacher[]> => {
  const teachers = await Promise.all(
    teacherIds.map((teacherId) => getTeacherById(teacherId)),
  );

  return teachers.filter((teacher): teacher is Teacher => teacher !== null);
};
export const getAllTeachers = async (): Promise<Teacher[]> => {
  const snapshot = await get(ref(database, "teachers"));

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val() as Record<string, TeacherFromDb>;

  return Object.entries(data).map(([id, teacher]) => ({
    id,
    ...teacher,
  }));
};
