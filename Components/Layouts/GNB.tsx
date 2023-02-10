import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";

const GNB = () => {
  const router = useRouter();
  return (
    <GNBContainer>
      <ButtonWrapper onClick={() => router.push("/")}>Codefolio</ButtonWrapper>
      <ButtonsContainer>
        <ButtonWrapper onClick={() => null}>
          <Image src="/icons/search.svg" alt="" width="24" height="24" />
        </ButtonWrapper>
        <ButtonWrapper onClick={() => null}>
          <Image src="/icons/notification.svg" alt="" width="24" height="24" />
        </ButtonWrapper>
        <ButtonWrapper onClick={() => router.push("/create-post")}>
          <Image src="/icons/post.svg" alt="" width="24" height="24" />
        </ButtonWrapper>
        <ButtonWrapper onClick={() => router.push("/profile")}>
          <Image src="/icons/person.svg" alt="" width="24" height="24" />
        </ButtonWrapper>
      </ButtonsContainer>
    </GNBContainer>
  );
};

const GNBContainer = styled.div`
  width: 100vw;
  height: 3.5rem;
  background-color: grey;
  position: sticky;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  padding: 8px;
`;

export default GNB;
