import styled from "styled-components";

interface PositionTagProps {
  active: boolean;
}

const PositionTag = styled.button<PositionTagProps>`
  height: 2.125rem;
  padding: 0 1rem;
  border-radius: 3.125rem;
  cursor: pointer;
  color: ${({ active }) => (active ? "white" : "#999999")};
  border: 0.0625rem solid
    ${({ active }) => (active ? "transparent" : "#999999")};
  background-color: ${({ active }) => (active ? "#999999" : "white")};
`;

export default PositionTag;
