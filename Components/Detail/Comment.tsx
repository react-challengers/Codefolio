import styled from "styled-components";
import ProfileImage from "../Common/ProfileImage";
import DefaultButton from "../Common/DefaultButton";
import CommentItem from "./CommentItem";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const Comment = () => {
  return (
    <>
      <CommentContainer>
        <CommentInput />
        <CommentList />
      </CommentContainer>
    </>
  );
};

const CommentContainer = styled.div`
  width: 75rem;
`;

export default Comment;
