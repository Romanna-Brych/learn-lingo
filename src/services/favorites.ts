import { get, ref, remove, set } from "firebase/database";
import { database } from "./firebase";

export const getUserFavorites = async (userId: string): Promise<string[]> => {
  const snapshot = await get(ref(database, `users/${userId}/favorites`));

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val() as Record<string, true>;

  return Object.keys(data);
};

export const addFavorite = async (userId: string, teacherId: string) => {
  await set(ref(database, `users/${userId}/favorites/${teacherId}`), true);
};

export const removeFavorite = async (userId: string, teacherId: string) => {
  await remove(ref(database, `users/${userId}/favorites/${teacherId}`));
};
