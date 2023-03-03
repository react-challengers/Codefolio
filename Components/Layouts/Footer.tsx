import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";

const Footer = () => {
  const router = useRouter();

  if (router.pathname.includes("auth")) return <> </>;

  return (
    <FooterContainer>
      <FooterLeft>
        <FooterText>개인정보처리방침</FooterText>
        <FooterText>서비스 이용 약관</FooterText>
        <FooterText>고객 지원</FooterText>
      </FooterLeft>
      <FooterRight>
        <FooterText>© Codefolio. 2023. All rights reserved.</FooterText>
        <Image
          src="/logos/mainLogo.svg"
          width={24}
          height={24}
          alt="코드폴리오 로고"
        />
      </FooterRight>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 2rem 10.625rem;
  height: 5.5rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray10};
  margin-top: 5rem;
`;

const FooterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const FooterText = styled.p`
  ${({ theme }) => theme.fonts.body14En};
  color: ${({ theme }) => theme.colors.gray6};
`;

export default Footer;
