import { ReactElement } from "react";
import styled from "styled-components";

interface ProfileContainerProps {
  title: string;
  children: ReactElement;
}

const ProfileContainer = ({ title, children }: ProfileContainerProps) => {
  return (
    <ProfileContainerWrapper>
      <Title>{title}</Title>
      <ContentWrapper>{children}</ContentWrapper>
    </ProfileContainerWrapper>
  );
};

const ProfileContainerWrapper = styled.div`
  padding: 3.25rem;
  background-color: #f2f2f2;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  margin-bottom: 3rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default ProfileContainer;
