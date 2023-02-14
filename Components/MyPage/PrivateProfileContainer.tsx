import Image from "next/image";
import styled from "styled-components";

const PrivateProfileContainer = () => {
  return (
    <PrivateContainer>
      <Image
        src="/icons/private.svg"
        alt="비공개 아이콘"
        width={40}
        height={52.5}
      />
      <p>비공개 프로필입니다.</p>
    </PrivateContainer>
  );
};

const PrivateContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 18.75rem;
  p {
    margin-top: 1.5rem;
    color: grey;
    font-size: 1.5rem;
  }
`;

export default PrivateProfileContainer;
