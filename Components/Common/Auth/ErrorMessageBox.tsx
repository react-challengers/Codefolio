import styled from "styled-components";

interface ErrorMessageBoxProps {
  Error: boolean;
}

const ErrorMessageBox = styled.div<ErrorMessageBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.subtitle16}
  color: ${({ theme }) => theme.colors.white};

  width: 27.25rem;
  height: 3.5rem;

  background: ${(props) =>
    props.Error ? props.theme.colors.messageError : props.theme.colors.gray11};

  margin-bottom: 1.75rem;
  border-radius: 0.5rem;

  @media (max-width: 768px) {
    width: 20rem;
  }
`;

export default ErrorMessageBox;
