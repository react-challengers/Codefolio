import { useState } from "react";
import styled from "styled-components";

/**
 * @see https://velog.io/@whljm1003/React-toggle-switch-%EA%B8%B0%EB%8A%A5
 * @TODO 브랜드 컬러가 지정되면 ToggleController에서 #999999을 변경합니다.
 * @param {boolean} flicker - 기본은 off. 초기값을 true로 변경 가능
 * @example
 * <Toggle />
 */

interface ToggleProps {
  flicker?: boolean;
}

const Toggle = ({ flicker = false }: ToggleProps) => {
  const [toggle, setToggle] = useState(flicker);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };
  return (
    <ToggleContainer onClick={handleToggle} toggle={toggle}>
      <ToggleController toggle={toggle} />
    </ToggleContainer>
  );
};

const ToggleContainer = styled.button<{ toggle: boolean }>`
  width: 2.5rem;
  height: 1.5rem;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  background-color: ${(props) => (!props.toggle ? "#DFDFDF;" : "#999999")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;

const ToggleController = styled.div<{ toggle: boolean }>`
  background-color: white;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  position: absolute;
  left: 0.125rem;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.1);
  ${(props) =>
    props.toggle &&
    `
      transform: translate(1rem, 0);
      transition: all 0.3s ease-in-out;
    `}
`;

export default Toggle;
