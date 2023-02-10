import styled from "styled-components";

interface PositionTagProps {
  active: boolean;
}

const PositionTag = styled.button<PositionTagProps>`
  height: 34px;
  padding: 0 16px;
  border-radius: 50px;
  cursor: pointer;
  color: ${({ active }) => (active ? "white" : "#999999")};
  border: 1px solid ${({ active }) => (active ? "transparent" : "#999999")};
  background-color: ${({ active }) => (active ? "#999999" : "white")};
`;

export default PositionTag;
