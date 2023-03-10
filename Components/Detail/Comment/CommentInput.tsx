import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useInput } from "@/hooks/common";
import { useUserProfile } from "@/hooks/query";
import { useEffect, useState } from "react";
import { PrimaryButton, ProfileImage } from "@/Components/Common";
import {
  postComment,
  incrementComment,
  getOnePost,
} from "@/utils/APIs/supabase";
import supabase from "@/lib/supabase";
import createNotificationContent from "@/utils/notification/createNotificationContent";
import { initAmplitude, logEvent } from "@/utils/amplitude/amplitude";

interface CommentInputProps {
  postId: string | string[] | undefined;
  userId: string | undefined;
}

const CommentInput = ({ postId, userId }: CommentInputProps) => {
  const queryClient = useQueryClient();

  const [isHelperText, setIsHelperText] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [author, setAuthor] = useState("");

  const { inputValues, handleInputChange, resetAllInput } = useInput({
    comment: "",
  });

  const {
    profileData: { profile_image: profileImage, user_id: userProfileId },
  } = useUserProfile();

  useQuery(["getOnePost", postId], {
    queryFn: ({ queryKey }) => getOnePost(queryKey[1] as string),
    onSuccess: (data) => {
      if (data) {
        setPostTitle(data.title);
        setAuthor(data.user_id);
      }
    },
  });

  // 추후 리팩토링 대상(결합도가 높음)
  const { mutate: addNotificationMutate } = useMutation(
    async (type: string) => {
      await supabase
        .from("notification")
        .insert({
          user_id: userId,
          target_id: author,
          post_id: postId as string,
          content: createNotificationContent(type, postTitle),
          is_read: false,
          type,
        })
        .single();
    }
  );

  const { mutate: createComment } = useMutation(
    () => postComment(inputValues.comment, postId as string, userId as string),
    {
      onSuccess: async () => {
        addNotificationMutate("comment");
        await incrementComment(postId as string);
        logEvent("createComment", { from: "detailPage" });
        queryClient.invalidateQueries(["getComment"]);
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
          profileId={userProfileId}
        />
        <CommentTextarea
          value={inputValues.comment}
          onChange={handleInputChange("comment")}
          placeholder="이 프로젝트에 대한 리뷰를 남겨주세요."
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

  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 1rem 0 1rem;
  }
`;

const PostCommentButton = styled.div`
  display: flex;
  justify-content: end;

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 2rem;
  }
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

  @media (max-width: 768px) {
    ${({ theme }) => theme.fonts.body14};
    margin-right: 1rem;
    width: 70%;
  }
`;

interface HelperTextProps {
  isHelperText: boolean;
}

const HelperText = styled.div<HelperTextProps>`
  margin-top: 0.5rem;
  margin-left: 3.5rem;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.messageError};
  opacity: ${({ isHelperText }) => (isHelperText ? 1 : 0)};
  transition: all 0.5s ease-in-out;
`;

export default CommentInput;
