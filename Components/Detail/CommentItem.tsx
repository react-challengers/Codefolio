import { useState, useEffect } from "react";
import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
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
  const [currentUSER_ID, setCurrentUSER_ID] = useState<string | undefined>("");

  useEffect(() => {
    // 로그인 상태 확인
    const LoginState = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("data확인", data.session?.user.email);
      if (data) {
        setCurrentUSER_ID(data.session?.user.email);
      }
    };

    LoginState();
  }, []);

  const { mutate: deleteComment } = useMutation(
    (): any => supabase.from("comment").delete().eq("id", comment.id),
    {
      onSuccess: () => {
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

  return (
    <CommentContainer>
      <ProfileImage alt="프로필이미지" page="detailPage" />
      <TextBox>
        <CommentTitle>
          <CommentWrapper>
            <h3> {comment.user_id} </h3> <span> {comment.created_at} </span>
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
      {currentUSER_ID === comment.user_id ? (
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

  h3 {
    font-size: 1rem;
  }

  span {
    font-size: 0.8125rem;
    color: #b3b3b3;
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
