import supabase from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

const ShowMoreModal = () => {
  const router = useRouter();
  const {
    query: { id: postId },
  } = router;
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const editPost = async () => {
    router.push(`/edit-post/${postId}`);
  };

  const deletePost = async () => {
    const { error } = await supabase.from("post").delete().eq("id", postId);
    if (error) {
      alert("오류가 발생했습니다. 다시 시도홰주세요.");
      return;
    }
    alert("게시물이 삭제되었습니다.");
    router.push("/");
  };

  return (
    <ShowMoreModalContainer>
      <ItemWrapper onClick={editPost}>수정하기</ItemWrapper>
      <ItemWrapper onClick={deletePost}>삭제하기</ItemWrapper>
    </ShowMoreModalContainer>
  );
};

const ShowMoreModalContainer = styled.div`
  background-color: white;
  width: 11.25rem;
  position: absolute;
  top: 3.75rem;
  right: 2.5rem;
  border: 1px solid #dfdfdf;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
`;

const ItemWrapper = styled.div`
  line-height: 3.5rem;
  cursor: pointer;
  padding-left: 0.75rem;
  :hover {
    background-color: #e6e6e6;
  }
`;

export default ShowMoreModal;
