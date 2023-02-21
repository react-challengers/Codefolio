import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import viewCreateAt from "@/utils/commons/viewCreateAt";
import DefaultButton from "../Common/DefaultButton";
import ProfileImage from "../Common/ProfileImage";

/**
 * @TODO useInput으로 리팩토링 고민
 */

interface CommentType {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

interface CommentItemProps {
  comment: CommentType;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [currentUSERID, setCurrentUSERID] = useState<string | undefined>("");
  const [userName, setUserName] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");

  useEffect(() => {
    // 로그인 상태 확인
    const LoginState = async () => {
      const { data } = await supabase.auth.getSession();
      if (data) {
        setCurrentUSERID(data.session?.user.email);
      }
    };

    LoginState();
  }, []);

  useEffect(() => {
    const getUserProfile = async () => {
      const { data } = await supabase
        .from("user_profile")
        .select("*")
        .eq("user_id", comment.user_id)
        .single();

      setUserName(data.user_name);
      setUserProfileImage(data.profile_image);
    };

    getUserProfile();
  }, [comment.user_id]);

  const { mutate: deleteComment } = useMutation(
    (): any => supabase.from("comment").delete().eq("id", comment.id),
    {
      onSuccess: async () => {
        await supabase.rpc("decrement_comment", { row_id: comment.post_id });
        queryClient.invalidateQueries(["getComment"]);
      },
    }
  );

  const { mutate: editComment } = useMutation(
    (): any =>
      supabase
        .from("comment")
        .update({ content: editContent })
        .eq("id", comment.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getComment"]);
      },
    }
  );

  const handleEditClick = async () => {
    if (isEditing) {
      editComment();
    }
    setIsEditing((prev) => !prev);
  };

  const handleCanceled = async () => {
    setEditContent(comment.content);
    setIsEditing((prev) => !prev);
  };

  const commentDateView = viewCreateAt(comment.created_at);

  return (
    <CommentContainer>
      <ProfileImage
        alt="프로필이미지"
        page="detailPage"
        src={userProfileImage}
      />
      <TextBox>
        <CommentTitle>
          <CommentWrapper>
            <h3> {userName} </h3>
            <span> {commentDateView} </span>
          </CommentWrapper>
        </CommentTitle>
        {isEditing ? (
          <EditInput
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <CommentContent>{comment.content}</CommentContent>
        )}
      </TextBox>
      {currentUSERID === comment.user_id ? (
        <ButtonWrapper>
          {isEditing ? (
            <>
              <DefaultButton
                text="완료"
                type="outline"
                size="s"
                onClick={handleEditClick}
              />
              <DefaultButton
                text="취소"
                type="outline"
                size="s"
                onClick={handleCanceled}
              />
            </>
          ) : (
            <>
              <DefaultButton
                text="수정"
                type="outline"
                size="s"
                onClick={handleEditClick}
              />
              <DefaultButton
                text="삭제"
                type="outline"
                size="s"
                onClick={() => deleteComment()}
              />
            </>
          )}
        </ButtonWrapper>
      ) : (
        <ButtonWrapper />
      )}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  margin-top: 2.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const TextBox = styled.div`
  margin-left: 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;

  justify-content: space-between;
`;

const CommentTitle = styled.div`
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    font-size: 1rem;
    color: #b3b3b3;

    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const EditInput = styled.input`
  width: 90%;
  margin-top: 0.25rem;
  outline: 0;

  border-width: 0 0 1px;
`;

const CommentWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const CommentContent = styled.div`
  color: #666666;
`;

export default CommentItem;
