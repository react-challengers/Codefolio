import Image, { StaticImageData } from "next/image";
import styled from "styled-components";

interface BannerProps {
  src?: string;
  alt?: string;
}

/**
 * @param {string} src - 이미지 경로
 * @param {string} alt - 이미지 설명
 * @returns {JSX.Element} - 이미지
 * @example
 * <ProfileImage src={src} alt={alt} />
 */

const Banner = ({ src = "", alt = "프로필 배경이미지" }: BannerProps) => {
  if (!src) {
    return <BannerColor />;
  }

  return (
    <BannerImage src={src} alt={alt} sizes="100vw" width={100} height={180} />
  );
};

const BannerColor = styled.div`
  width: 100vw;
  height: 11.25rem;
  background-color: ${(props) => props.theme.colors.gray9};
`;

const BannerImage = styled(Image)`
  width: 100vw;
  height: 11.25rem;
  object-fit: cover;
`;

export default Banner;
