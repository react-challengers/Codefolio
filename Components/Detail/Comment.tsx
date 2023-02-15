import styled from "styled-components";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const Comment = () => {
  return (
    <CommentContainer>
      <CommentInput />
      <CommentList />
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  width: 100%;
`;

export default Comment;
