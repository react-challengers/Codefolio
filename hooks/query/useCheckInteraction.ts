import {
  getCurrentUser,
  getIsBookMark,
  getIsComment,
  getIsLike,
} from "@/utils/APIs/supabase";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useCheckInteraction = (postId: string) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isBookmark, setIsBookmark] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [isComment, setIsComment] = useState(false);

  useQuery(["currentUser"], {
    queryFn: getCurrentUser,
    onSuccess({ data: { user } }) {
      if (user) {
        setCurrentUserId(user.id);
      }
    },
  });

  useQuery(["getBookmark", currentUserId, postId], {
    queryFn: ({ queryKey }) =>
      getIsBookMark(queryKey as [string, string, string]),
    onSuccess(data) {
      if (data) {
        setIsBookmark(!!data);
      }
    },
    onError(error) {
      setIsBookmark(false);
    },
    enabled: !!currentUserId && !!postId,
  });

  useQuery(["getLike", currentUserId, postId], {
    queryFn: ({ queryKey }) => getIsLike(queryKey as [string, string, string]),
    onSuccess(data) {
      if (data) {
        setIsLike(!!data);
      }
    },
    onError(error) {
      setIsLike(false);
    },
    enabled: !!currentUserId && !!postId,
  });

  useQuery(["getComment", currentUserId, postId], {
    queryFn: ({ queryKey }) =>
      getIsComment(queryKey as [string, string, string]),
    onSuccess(data) {
      if (data) {
        setIsComment(!!data);
      }
    },
    onError(error) {
      setIsComment(false);
    },
    enabled: !!currentUserId && !!postId,
  });

  return { isBookmark, isLike, isComment };
};

export default useCheckInteraction;
