import styled from "styled-components";
import Image from "next/image";
import ico_ExclamationMark from "@/public/icons/ico_ExclamationMark.svg";

interface PostErrorMessageProps {
  children: string;
}

const PostErrorMessage = ({ children }: PostErrorMessageProps) => {
  return (
    <ErrorMessageBox>
      <ExclamationMarkIcon
        src={ico_ExclamationMark}
        alt="에러 느낌표"
        width={20}
        height={20}
      />
      <TextBox>{children}</TextBox>
    </ErrorMessageBox>
  );
};

const ErrorMessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.subtitle16}

  background-color: #e22c36;

  margin-right: 2rem;

  padding: 0 1rem 0 1rem;

  border-radius: 0.5rem;
  height: 3.5rem;
`;

const ExclamationMarkIcon = styled(Image)`
  margin-right: 0.5rem;
`;

const TextBox = styled.div<PostErrorMessageProps>`
  color: ${({ theme }) => theme.colors.white};
  size: ${(props) => props.children};
`;

export default PostErrorMessage;
