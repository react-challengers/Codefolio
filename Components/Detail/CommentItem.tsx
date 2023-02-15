import styled from "styled-components";
import DefaultButton from "../Common/DefaultButton";
import ProfileImage from "../Common/ProfileImage";

const CommentItem = () => {
  return (
    <CommentContainer>
      <ProfileImage alt="" page="detailPage" />
      <TextBox>
        <CommentTitle>
          <CommentWrapper>
            <h3> Alex </h3> <span> 5시간 전 </span>
          </CommentWrapper>
          <CommentWrapper>
            <DefaultButton
              text="수정"
              type="outline"
              size="s"
              onClick={() => null}
            />
            <DefaultButton
              text="삭제"
              type="outline"
              size="s"
              onClick={() => null}
            />
          </CommentWrapper>
        </CommentTitle>
        <CommentContent>내용 잘 봤습니다!!</CommentContent>
      </TextBox>
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  margin-top: 2.5rem;
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

const CommentWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const CommentContent = styled.div`
  color: #666666;
`;

export default CommentItem;
