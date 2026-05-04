import { get, ref } from "firebase/database";
import { database } from "./firebase";
import type { Teacher } from "../types/teacher";

type TeacherFromDb = Omit<Teacher, "id">;

export const getTeachers = async (): Promise<Teacher[]> => {
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
