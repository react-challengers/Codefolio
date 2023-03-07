import Image, { StaticImageData } from "next/image";
import styled from "styled-components";
import anonProfile from "@/public/images/anonProfile.jpeg";
import Link from "next/link";

type ProfileImagePageType = "myPage" | "detailPage" | "GNB";
interface ProfileImageProps {
  src?: string | StaticImageData | null;
  alt: string;
  page: ProfileImagePageType;
  profileId?: string;
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

const ProfileImage = ({
  src = anonProfile,
  alt,
  page,
  profileId,
}: ProfileImageProps) => {
  if (profileId)
    return (
      <ProfileLink href={`/profile/${profileId}`}>
        <ProfileImageItem
          src={src || anonProfile}
          alt={alt}
          width={page === "myPage" ? 100 : 40}
          height={page === "myPage" ? 100 : 40}
        />
      </ProfileLink>
    );

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
  cursor: pointer;
`;

const ProfileLink = styled(Link)`
  cursor: pointer;
`;

export default ProfileImage;
