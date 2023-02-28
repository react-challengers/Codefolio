import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useInput } from "@/hooks/common";
import { useUserProfile } from "@/hooks/query";
import { useState } from "react";
import { DefaultButton, ProfileImage } from "@/Components/Common";
import { postComment, incrementComment } from "@/utils/APIs/supabase";

interface CommentInputProps {
  postId: string | string[] | undefined;
  userId: string | undefined;
}

const CommentInput = ({ postId, userId }: CommentInputProps) => {
  const queryClient = useQueryClient();

  const { inputValues, handleInputChange, resetAllInput } = useInput({
    comment: "",
  });

  const [isHelperText, setIsHelperText] = useState(false);

  const {
    profileData: { profile_image: profileImage },
  } = useUserProfile();

  const { mutate: createComment } = useMutation(
    () => postComment(inputValues.comment, postId as string, userId as string),
    {
      onSuccess: async () => {
        await Promise.all([
          incrementComment(postId as string),
          queryClient.invalidateQueries(["getComment"]),
        ]);
        queryClient.invalidateQueries(["GET_POSTS"]);
      },
    }
  );

  const handleAddComment = () => {
    if (!inputValues.comment) {
      setIsHelperText(true);

      setTimeout(() => {
        setIsHelperText(false);
      }, 2000);

      return;
    }
    createComment();
    resetAllInput();
  };

  return (
    <>
      <CommentInputContainer>
        <ProfileImage
          src={profileImage}
          alt="사용자 프로필 이미지"
          page="detailPage"
        />
        <CommentTextarea
          value={inputValues.comment}
          onChange={handleInputChange("comment")}
          placeholder="이 프로젝트에 대한 댓글을 남겨주세요."
        />
      </CommentInputContainer>
      <HelperText isHelperText={isHelperText}>댓글을 입력해주세요.</HelperText>
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

interface HelperTextProps {
  isHelperText: boolean;
}

const HelperText = styled.div<HelperTextProps>`
  margin-top: 0.5rem;
  margin-left: 3.5rem;
  font-size: 1rem;
  color: #ff0000;
  opacity: ${({ isHelperText }) => (isHelperText ? 1 : 0)};
  transition: all 0.5s ease-in-out;
`;

export default CommentInput;
