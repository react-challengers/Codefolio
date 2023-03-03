import styled from "styled-components";

const LongButton = styled.button`
  width: 100%;
  height: 3.6875rem;

  background: none;

  ${({ theme }) => theme.fonts.subtitle18};
  color: ${({ theme }) => theme.colors.gray1};

  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 0.5rem;

  cursor: pointer;

  :hover {
    background-color: ${({ theme }) => theme.colors.gray9};
  }
`;

export default LongButton;
