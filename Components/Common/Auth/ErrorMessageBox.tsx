import styled from "styled-components";

interface ErrorMessageBoxProps {
  background: string | null;
}

const ErrorMessageBox = styled.div<ErrorMessageBoxProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.subtitle16}
  color: ${({ theme }) => theme.colors.white};
  background: ${(props) => props.background};

  width: 27.25rem;
  height: 3.5rem;

  background: ${(props) =>
    props.background ? "red" : props.theme.colors.gray11};

  margin-bottom: 1.75rem;
  border-radius: 0.5rem;
`;

export default ErrorMessageBox;
