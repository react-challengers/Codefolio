import styled from "styled-components";
import Image from "next/image";
import ico_ExclamationMark from "@/public/icons/ico_ExclamationMark.svg";

interface PostErrorMassageProps {
  children: string;
}

const PostErrorMassage = ({ children }: PostErrorMassageProps) => {
  return (
    <ErrorMassageBox>
      <ExclamationMarkIcon
        src={ico_ExclamationMark}
        alt="에러 느낌표"
        width={20}
        height={20}
      />
      <TextBox>{children}</TextBox>
    </ErrorMassageBox>
  );
};

const ErrorMassageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theme }) => theme.fonts.subtitle16}

  background-color: #e22c36;

  margin-right: 32px;

  padding: 0 16px 0 16px;

  border-radius: 8px;
  height: 56px;
`;

const ExclamationMarkIcon = styled(Image)`
  margin-right: 0.5rem;
`;

const TextBox = styled.div<PostErrorMassageProps>`
  color: ${({ theme }) => theme.colors.white};
  size: ${(props) => props.children};
`;

export default PostErrorMassage;
