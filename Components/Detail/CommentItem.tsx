import styled from "styled-components";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import DefaultButton from "../Common/DefaultButton";
import ProfileImage from "../Common/ProfileImage";
import { useState } from "react";
import useInput from "@/hooks/common/useInput";

interface CommentType {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
}
interface CommentItemProps {
  comment: CommentType;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, changeEditContent] = useInput(comment.content);

  const queryClient = useQueryClient();
  const { mutate: deleteComment, isError: deleteError } = useMutation(
    (): any => supabase.from("comment").delete().eq("id", comment.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getComment"]);
      },
    }
  );
  const { mutate: editComment, isError: editError } = useMutation(
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

  return (
    <CommentContainer>
      <ProfileImage alt="" page="detailPage" />
      <TextBox>
        <CommentTitle>
          <CommentWrapper>
            <h3> Alex </h3> <span> 5시간 전 </span>
          </CommentWrapper>
        </CommentTitle>
        {isEditing ? (
          <EditInput value={editContent} onChange={changeEditContent} />
        ) : (
          <CommentContent>{comment.content}</CommentContent>
        )}
      </TextBox>
      <ButtonWrapper>
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
      </ButtonWrapper>
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
  width: 80%;
`;

const CommentWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const CommentContent = styled.div`
  color: #666666;
`;

export default CommentItem;
