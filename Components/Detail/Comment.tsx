import styled from "styled-components";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import supabase from "@/lib/supabase";

const Comment = () => {
  const router = useRouter();
  const POST_ID = router.query.id;
  const [currentUser, setCurrentUser] = useState(false);
  const [USER_ID, setUSER_ID] = useState<string | undefined>("");

  useEffect(() => {
    // 로그인 상태 확인
    const LoginState = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setCurrentUser(true);
      } else {
        setCurrentUser(false);
      }
      setUSER_ID(data.session?.user.email);
    };

    LoginState();
  }, []);

  return (
    <CommentContainer>
      {currentUser && <CommentInput POST_ID={POST_ID} USER_ID={USER_ID} />}
      <CommentList POST_ID={POST_ID} />
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  width: 75rem;
  padding-top: 2.5rem;
`;

export default Comment;
