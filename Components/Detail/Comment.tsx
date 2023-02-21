import styled from "styled-components";
import supabase from "@/lib/supabase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const Comment = () => {
  const router = useRouter();
  const postId = router.query.id;
  const [currentUser, setCurrentUser] = useState(false);
  const [userId, setUserId] = useState<string | undefined>("");

  useEffect(() => {
    // 로그인 상태 확인
    const LoginState = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setCurrentUser(true);
      } else {
        setCurrentUser(false);
      }
      setUserId(data.session?.user.id);
    };

    LoginState();
  }, [router]);

  return (
    <CommentContainer>
      {currentUser && <CommentInput POST_ID={postId} USER_ID={userId} />}
      {postId && <CommentList POST_ID={postId} />}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  width: 75rem;
  padding-top: 2.5rem;
`;

export default Comment;
