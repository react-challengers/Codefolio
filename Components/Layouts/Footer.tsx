import styled from "styled-components";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  if (router.pathname.includes("auth")) return <> </>;

  return <FooterContainer />;
};

const FooterContainer = styled.footer`
  height: 5rem;
`;

export default Footer;
