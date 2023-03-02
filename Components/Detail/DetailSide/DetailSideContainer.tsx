import styled from "styled-components";

const DetailSideContainer = styled.div`
  width: 17.1875rem;
  padding: 1.5rem 2rem;

  border: 1px solid ${({ theme }) => theme.colors.gray9};
  background-color: ${({ theme }) => theme.colors.gray10};
  border-radius: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default DetailSideContainer;
