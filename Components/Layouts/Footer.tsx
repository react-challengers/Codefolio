import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const router = useRouter();

  if (router.pathname.includes("auth")) return <> </>;

  return (
    <FooterContainer>
      <FooterWrapper>
        <FooterLeft>
          <InfoText>개인정보처리방침</InfoText>
          <InfoText>서비스 이용 약관</InfoText>
          <InfoText>고객 지원</InfoText>
        </FooterLeft>
        <FooterRight>
          <CopyRightText>© Codefolio. 2023. All rights reserved.</CopyRightText>
          <Image
            src="/logos/mainLogo.svg"
            width={24}
            height={24}
            alt="코드폴리오 로고"
          />
        </FooterRight>
      </FooterWrapper>
      <FooterDivider />
      <FooterWrapper>
        <ContributorContainer>
          <ContributorWrapper>
            <CopyRightText>Developer</CopyRightText>
            <Link
              href="https://github.com/Jeremy-Kr"
              style={{ textDecoration: "none" }}
            >
              <CopyRightText>@이정익</CopyRightText>
            </Link>
            <Link
              href="https://github.com/hyoloui"
              style={{ textDecoration: "none" }}
            >
              <CopyRightText>@이승효</CopyRightText>
            </Link>
            <Link
              href="https://github.com/arch-spatula"
              style={{ textDecoration: "none" }}
            >
              <CopyRightText>@김상현</CopyRightText>
            </Link>
            <Link
              href="https://github.com/yunjunhojj"
              style={{ textDecoration: "none" }}
            >
              <CopyRightText>@윤준호</CopyRightText>
            </Link>
            <Link
              href="https://github.com/nno3onn"
              style={{ textDecoration: "none" }}
            >
              <CopyRightText>@허다은</CopyRightText>
            </Link>
          </ContributorWrapper>
          <ContributorDivider />
          <ContributorWrapper>
            <CopyRightText>Designer</CopyRightText>
            <CopyRightText>@하예영</CopyRightText>
          </ContributorWrapper>
        </ContributorContainer>
      </FooterWrapper>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 2rem 10.625rem 3rem;
  gap: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray10};
  margin-top: 5rem;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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

const FooterDivider = styled.hr`
  border: 1px solid ${(props) => props.theme.colors.gray8};
  width: 100%;
  margin: 0;
`;

const InfoText = styled.p`
  ${({ theme }) => theme.fonts.body14En};
  color: ${({ theme }) => theme.colors.gray4};
`;

const CopyRightText = styled.p`
  ${({ theme }) => theme.fonts.body14En};
  color: ${({ theme }) => theme.colors.gray6};
  a:active {
    text-decoration: none;
  }
`;

const ContributorContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ContributorDivider = styled.hr`
  border: 1px solid ${(props) => props.theme.colors.gray8};
  height: 100%;
  margin: 0;
`;

const ContributorWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default Footer;
