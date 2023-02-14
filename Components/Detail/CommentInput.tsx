import styled from "styled-components";
import ProfileImage from "../Common/ProfileImage";
import DefaultButton from "../Common/DefaultButton";

const CommentInput = () => {
  const postComment = () => {
    alert("댓글 입력");

    return;
  };

  return (
    <>
      <CommentInputContainer>
        <ProfileImage alt="" page="detailPage" />
        <CommentTextarea placeholder="이 프로젝트에 대한 댓글을 남겨주세요." />
      </CommentInputContainer>
      <PostCommentButton>
        <DefaultButton
          text="작성하기"
          type="full"
          size="s"
          onClick={() => postComment()}
        ></DefaultButton>
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
