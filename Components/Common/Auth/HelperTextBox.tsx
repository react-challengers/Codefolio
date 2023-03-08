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

  color: ${({ theme }) => theme.colors.messageError};

  @media (max-width: 768px) {
    width: 20rem;
  }
`;

export default HelperTextBox;
