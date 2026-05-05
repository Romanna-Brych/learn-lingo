import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import {
  addFavorite,
  getUserFavorites,
  removeFavorite,
} from "../services/favorites";
import toast from "react-hot-toast";

export const useFavorites = () => {
  const { user, isLoggedIn } = useAuth();
  const queryClient = useQueryClient();

  const userId = user?.uid;

  const { data: favoriteIds = [] } = useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => getUserFavorites(userId!),
    enabled: Boolean(userId),
  });

  const addMutation = useMutation({
    mutationFn: (teacherId: string) => addFavorite(userId!, teacherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (teacherId: string) => removeFavorite(userId!, teacherId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites", userId] });
    },
  });

  const isFavorite = (teacherId: string) => {
    return favoriteIds.includes(teacherId);
  };

  const toggleFavorite = (teacherId: string) => {
    if (!isLoggedIn || !userId) {
      alert("This feature is available only for authorized users.");
      return;
    }

    if (isFavorite(teacherId)) {
      removeMutation.mutate(teacherId);
      toast.success("Removed from favorites");
    } else {
      addMutation.mutate(teacherId);
      toast.success("Added to favorites");
    }
  };

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite,
  };
};
