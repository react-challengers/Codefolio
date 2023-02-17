import Image, { StaticImageData } from "next/image";
import styled from "styled-components";
import anonProfile from "@/public/images/anonProfile.jpeg";

type ProfileImagePageType = "myPage" | "detailPage";
interface ProfileImageProps {
  src?: string | StaticImageData;
  alt: string;
  page: ProfileImagePageType;
}

/**
 * @param {string} src - 이미지 경로
 * @param {string} alt - 이미지 설명
 * @param {string} page - 사용 페이지 ex) myPage: 마이페이지, detailPage: 상세페이지
 * @returns {JSX.Element} - 프로필 이미지
 * @constructor
 * @example
 * <ProfileImage src={src} alt={alt} page={page} />
 */

const ProfileImage = ({ src = anonProfile, alt, page }: ProfileImageProps) => {
  return (
    <ProfileImageItem
      src={src || anonProfile}
      alt={alt}
      width={page === "myPage" ? 100 : 40}
      height={page === "myPage" ? 100 : 40}
    />
  );
};

const ProfileImageItem = styled(Image)`
  border-radius: 50%;
`;

export default ProfileImage;
