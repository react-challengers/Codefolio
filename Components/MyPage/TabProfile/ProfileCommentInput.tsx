import { PrimaryButton, ProfileImage } from "@/Components/Common";
import { useInput } from "@/hooks/common";
import { useUserProfile } from "@/hooks/query";
import { initAmplitude } from "@/utils/amplitude/amplitude";
import postProfileComment from "@/utils/APIs/supabase/postProfileComment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface ProfileCommentInputProps {
  userId: string | string[] | undefined;
  profileId: string | undefined;
}

const ProfileCommentInput = ({
  userId,
  profileId,
}: ProfileCommentInputProps) => {
  const queryClient = useQueryClient();

  const [isHelperText, setIsHelperText] = useState(false);
  const { inputValues, handleInputChange, resetAllInput } = useInput({
    comment: "",
  });

  const {
    profileData: { profile_image: profileImage },
  } = useUserProfile();
  const {
    profileData: { user_name: username },
  } = useUserProfile(profileId as string);

  const { mutate: createComment } = useMutation(
    () =>
      postProfileComment(
        inputValues.comment,
        profileId as string,
        userId as string
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getProfileComment"]);
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

  useEffect(() => {
    initAmplitude();
  }, []);

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
          placeholder={`칭찬배지와 함께 ${username}님에 대한 칭찬 코멘트를 남겨주세요.`}
        />
      </CommentInputContainer>
      <HelperText isHelperText={isHelperText}>댓글을 입력해주세요.</HelperText>
      <PostCommentButton>
        <PrimaryButton
          text="작성하기"
          buttonType="default"
          size="m"
          onClick={handleAddComment}
        />
      </PostCommentButton>
    </>
  );
};

const CommentInputContainer = styled.div`
  height: 7rem;
  padding-top: 3rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray4};

  display: flex;
  justify-content: space-between;
  gap: 2rem;
`;

const PostCommentButton = styled.div`
  display: flex;
  justify-content: end;
`;

const CommentTextarea = styled.textarea`
  width: 70rem;
  vertical-align: text-top;
  padding: 0.5rem 0.75rem;

  border-radius: 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.gray6};

  resize: none;

  background-color: ${({ theme }) => theme.colors.gray11};
  color: ${({ theme }) => theme.colors.white};
`;

interface HelperTextProps {
  isHelperText: boolean;
}

const HelperText = styled.div<HelperTextProps>`
  margin-top: 0.5rem;
  margin-left: 3.5rem;
  padding-left: 1rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.messageError};
  opacity: ${({ isHelperText }) => (isHelperText ? 1 : 0)};
  transition: all 0.5s ease-in-out;
`;

export default ProfileCommentInput;
