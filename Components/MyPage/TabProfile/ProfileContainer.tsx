import { ReactElement } from "react";
import styled from "styled-components";

interface ProfileContainerProps {
  title?: string;
  children: ReactElement;
  rowGap?: number;
}

const ProfileContainer = ({
  title,
  children,
  rowGap = 32,
}: ProfileContainerProps) => {
  return (
    <ProfileContainerWrapper>
      {title && <Title>{title}</Title>}
      <ContentWrapper rowGap={rowGap}>{children}</ContentWrapper>
    </ProfileContainerWrapper>
  );
};

const ProfileContainerWrapper = styled.div`
  padding: 3rem 2.5rem;
  border: 1px solid ${(props) => props.theme.colors.gray7};
  background-color: ${(props) => props.theme.colors.gray9};
  box-shadow: 0 0.25rem 0.625rem rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  color: ${(props) => props.theme.colors.white};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Title = styled.div`
  ${(props) => props.theme.fonts.subtitle18Bold}
  color: ${(props) => props.theme.colors.gray5};
`;

const ContentWrapper = styled.div<{ rowGap: number }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.rowGap / 16}rem;
  padding: 0 1.5rem;
`;

export default ProfileContainer;
