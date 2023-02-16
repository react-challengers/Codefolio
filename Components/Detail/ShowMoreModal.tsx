import styled from "styled-components";

const ShowMoreModal = () => {
  return (
    <ShowMoreModalContainer>
      <ItemWrapper>수정하기</ItemWrapper>
      <ItemWrapper>삭제하기</ItemWrapper>
    </ShowMoreModalContainer>
  );
};

const ShowMoreModalContainer = styled.div`
  background-color: white;
  width: 11.25rem;
  position: absolute;
  top: 3.75rem;
  right: 2.5rem;
  border: 1px solid #dfdfdf;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
`;

const ItemWrapper = styled.div`
  line-height: 3.5rem;
  cursor: pointer;
  padding-left: 0.75rem;
  :hover {
    background-color: #e6e6e6;
  }
`;

export default ShowMoreModal;
