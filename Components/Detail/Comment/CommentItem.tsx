import { useRef, useState } from "react";
import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import viewCreateAt from "@/utils/commons/viewCreateAt";
import { PrimaryButton, ProfileImage } from "@/Components/Common";
import {
  decrementComment,
  deleteComment,
  editComment,
  getCurrentUser,
  getOnePost,
  getSingleUser,
} from "@/utils/APIs/supabase";
import Image from "next/image";
import supabase from "@/lib/supabase";
import useOutsideClick from "@/hooks/query/useOutsideClick";

/**
 * @TODO useInput으로 리팩토링 고민
 */

interface CommentItemProps {
  comment: any;
  dbType: "comment" | "profile_comment";
}

const CommentItem = ({ comment, dbType }: CommentItemProps) => {
  const queryClient = useQueryClient();

  const dropdownRef = useRef<any>();
  useOutsideClick(dropdownRef, () => setShowMoreModal(false));

  const [showMoreModal, setShowMoreModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [userId, setUserId] = useState<string | undefined>("");
  const [userName, setUserName] = useState("");
  const [userProfileImage, setUserProfileImage] = useState("");
  const [author, setAuthor] = useState("");

  useQuery(["currentUser"], {
    queryFn: getCurrentUser,
    onSuccess({ data: { user } }) {
      if (user) {
        setUserId(user.id);
      }
    },
  });

  useQuery(["getOnePost", comment.post_id], {
    queryFn: ({ queryKey }) => getOnePost(queryKey[1] as string),
    onSuccess: (data) => {
      if (data) {
        setAuthor(data.user_id);
      }
    },
  });

  useQuery(["getSingleUser", comment.user_id], {
    queryFn: ({ queryKey }) => getSingleUser(queryKey[1] as string),
    onSuccess(data) {
      if (!data) return;
      setUserName(data.user_name);
      setUserProfileImage(data.profile_image);
    },
    onError(error) {
      console.log(error);
    },
    enabled: !!comment.user_id,
  });

  // 추후 리팩토링 대상(결합도가 높음)
  const { mutate: deleteNotificationMutate } = useMutation(
    async (type: string) => {
      await supabase
        .from("notification")
        .delete()
        .match({
          user_id: userId,
          target_id: author,
          [dbType === "comment" ? "post_id" : "profile_id"]: (dbType ===
          "comment"
            ? comment.post_id
            : comment.profile_id) as string,
          type,
        });
    }
  );

  const { mutate: deleteCommentMutate } = useMutation(
    () => deleteComment(comment.id, dbType),
    {
      onSuccess: async () => {
        deleteNotificationMutate(dbType);
        await decrementComment(comment.post_id);
        if (dbType === "comment") {
          queryClient.invalidateQueries(["getComment"]);
          queryClient.invalidateQueries(["GET_POSTS"]);
        } else {
          queryClient.invalidateQueries(["getProfileComment"]);
        }
      },
    }
  );

  const { mutate: editCommentMutate } = useMutation(
    () => editComment(comment.id, editContent, dbType),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          dbType === "comment" ? "getComment" : "getProfileComment",
        ]);
      },
    }
  );

  const handleEditClick = async () => {
    setShowMoreModal(false);
    if (isEditing) {
      editCommentMutate();
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
        profileId={comment.user_id}
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
      {userId === comment.user_id ? (
        <ButtonWrapper>
          {isEditing ? (
            <>
              <PrimaryButton
                text="완료"
                buttonType="default"
                size="s"
                onClick={handleEditClick}
              />
              <PrimaryButton
                text="취소"
                buttonType="line"
                size="s"
                onClick={handleCanceled}
              />
            </>
          ) : (
            <MoreButtonsWrappoer>
              <Image
                src={`/icons/more${showMoreModal ? "-on" : ""}.svg`}
                onClick={() => setShowMoreModal((prev) => !prev)}
                width={24}
                height={24}
                alt="더보기 버튼"
              />
            </MoreButtonsWrappoer>
          )}
        </ButtonWrapper>
      ) : (
        <ButtonWrapper />
      )}
      {showMoreModal && (
        <ShowMoreModalContainer ref={dropdownRef}>
          <ItemWrapper onClick={handleEditClick}>수정하기</ItemWrapper>
          <ItemWrapper onClick={() => deleteCommentMutate()}>
            삭제하기
          </ItemWrapper>
        </ShowMoreModalContainer>
      )}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  position: relative;
  display: flex;
  margin-top: 2.5rem;

  @media (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
  }
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
  color: ${({ theme }) => theme.colors.white};
  height: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  span {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.gray4};

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
  background-color: ${({ theme }) => theme.colors.gray11};
  color: ${({ theme }) => theme.colors.white};
`;

const CommentWrapper = styled.div`
  display: flex;
  gap: 1rem;
  h3 {
    ${({ theme }) => theme.fonts.subtitle16}
  }
  span {
    ${({ theme }) => theme.fonts.body14}
  }
`;

const CommentContent = styled.div`
  color: ${({ theme }) => theme.colors.gray2};
  ${({ theme }) => theme.fonts.body16}
`;

const MoreButtonsWrappoer = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 2.5rem;
  gap: 1.2rem;

  cursor: pointer;
`;

const ShowMoreModalContainer = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.gray9};
  z-index: 10;
  width: 11.25rem;
  position: absolute;
  top: 2rem;
  right: -5rem;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
`;

const ItemWrapper = styled.div`
  line-height: 3.5rem;
  cursor: pointer;
  padding-left: 1.5rem;
  :hover {
    background-color: ${({ theme }) => theme.colors.gray8};
  }
`;

export default CommentItem;
