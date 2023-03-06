import styled from "styled-components";

interface PositionTagProps {
  active: boolean;
}

const PositionTag = styled.button<PositionTagProps>`
  all: unset;
  ${(props) => props.theme.fonts.body14En}
  height: 2.125rem;
  padding: 0 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  color: ${({ active, theme }) =>
    active ? theme.colors.white : theme.colors.gray6};
  background-color: ${(props) => props.theme.colors.gray8};
`;

export default PositionTag;
