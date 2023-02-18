import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import useInput from "@/hooks/common/useInput";
import ProfileImage from "../Common/ProfileImage";
import DefaultButton from "../Common/DefaultButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * @todo postComment 구현 필요
 * @todo alert는 임시 입니다. 커스텀 필요
 */

interface CommentInputProps {
  POST_ID: string | string[] | undefined;
  USER_ID: string | undefined;
}

const CommentInput = ({ POST_ID, USER_ID }: CommentInputProps) => {
  const queryClient = useQueryClient();

  const [commentInput, setCommentInput, resetCommentInput] = useInput();
  const { mutate: createComment } = useMutation(
    (): any =>
      supabase.from("comment").insert({
        id: crypto.randomUUID(),
        post_id: POST_ID,
        user_id: USER_ID,
        content: commentInput,
      }),
    {
      onSuccess: async () => {
        await supabase.rpc("increment_comment", { row_id: POST_ID });
        queryClient.invalidateQueries(["getComment"]);
        resetCommentInput();
      },
    }
  );

  return (
    <>
      <CommentInputContainer>
        <ProfileImage alt="dummy" page="detailPage" />
        <CommentTextarea
          value={commentInput}
          onChange={setCommentInput}
          placeholder="이 프로젝트에 대한 댓글을 남겨주세요."
        />
      </CommentInputContainer>
      <PostCommentButton>
        <DefaultButton
          text="작성하기"
          type="full"
          size="s"
          onClick={() => createComment()}
        />
      </PostCommentButton>
    </>
  );
};

const CommentInputContainer = styled.div`
  height: 7rem;

  display: flex;
  justify-content: space-between;
`;

const PostCommentButton = styled.div`
  margin-top: 0.875rem;

  display: flex;
  justify-content: end;
`;

const CommentTextarea = styled.textarea`
  width: 70rem;
  vertical-align: text-top;
  padding: 0.5rem 0.75rem;

  border-radius: 0.25rem;
  border: 1px solid #dfdfdf;

  resize: none;
`;

export default CommentInput;
