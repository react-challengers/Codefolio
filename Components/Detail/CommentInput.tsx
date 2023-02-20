import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import { useInput } from "@/hooks/common";
import ProfileImage from "../Common/ProfileImage";
import DefaultButton from "../Common/DefaultButton";

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

  const { inputValues, handleInputChange, resetAllInput } = useInput({
    comment: "",
  });

  const { mutate: createComment } = useMutation(
    (): any =>
      supabase.from("comment").insert({
        id: crypto.randomUUID(),
        post_id: POST_ID,
        user_id: USER_ID,
        content: inputValues.comment,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getComment"]);
      },
    }
  );

  const handleAddComment = () => {
    createComment();
    resetAllInput();
  };

  return (
    <>
      <CommentInputContainer>
        <ProfileImage alt="dummy" page="detailPage" />
        <CommentTextarea
          value={inputValues.comment}
          onChange={handleInputChange("comment")}
          placeholder="이 프로젝트에 대한 댓글을 남겨주세요."
        />
      </CommentInputContainer>
      <PostCommentButton>
        <DefaultButton
          text="작성하기"
          type="full"
          size="s"
          onClick={handleAddComment}
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
