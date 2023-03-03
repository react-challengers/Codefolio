import styled from "styled-components";

interface HelperTextBoxProps {
  text: string | null;
}

const HelperTextBox = ({ text }: HelperTextBoxProps) => {
  return <HelperTextBoxContainer>{text}</HelperTextBoxContainer>;
};

const HelperTextBoxContainer = styled.div`
  ${({ theme }) => theme.fonts.body14}
  width: 27.25rem;
  height: 1.25rem;
  margin-bottom: 1.5rem;

  color: red;
`;

export default HelperTextBox;
