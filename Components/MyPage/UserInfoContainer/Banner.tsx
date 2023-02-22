import styled from "styled-components";

type BannerProps = {
  userBackground: string;
};

const Banner = styled.div`
  width: 100vw;
  height: 11.25rem;
  background-color: ${(props: BannerProps) => props.userBackground};
`;

export default Banner;
