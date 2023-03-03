import styled from "styled-components";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/utils/APIs/supabase";
import { useState } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const Comment = () => {
  const router = useRouter();
  const postId = router.query.id;
  const [userId, setUserId] = useState<string | undefined>("");

  useQuery(["currentUser"], {
    queryFn: getCurrentUser,
    onSuccess({ data: { user } }) {
      if (user) {
        setUserId(user.id);
      }
    },
  });

  return (
    <CommentContainer>
      {userId && <CommentInput postId={postId} userId={userId} />}
      {postId && <CommentList postId={postId} />}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  width: 75rem;
  padding-top: 2.5rem;
  /* padding-bottom: 20px; */
`;

export default Comment;
