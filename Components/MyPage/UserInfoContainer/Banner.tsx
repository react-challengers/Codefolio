import Image, { StaticImageData } from "next/image";
import styled from "styled-components";
import icophoto from "@/public/icons/ico-photo.svg";
import useUserImage from "./useUserImage";

interface BannerProps {
  src?: string;
  alt?: string;
  checkProfileAuthorization?: boolean;
}

/**
 * @param {string} src - 이미지 경로
 * @param {string} alt - 이미지 설명
 * @returns {JSX.Element} - 이미지
 * @example
 * <ProfileImage src={src} alt={alt} />
 */

const Banner = ({
  src = "",
  alt = "프로필 배경이미지",
  checkProfileAuthorization = false,
}: BannerProps) => {
  const { handleImage: handleBackgroundImage } =
    useUserImage("background_image");

  if (!src) {
    return (
      <BannerColor>
        <ImgLabel
          htmlFor="title-background-image"
          checkProfileAuthorization={checkProfileAuthorization}
        >
          <ImgIcon
            src={icophoto}
            alt="배경 사진 지정 아이콘"
            width={36}
            height={36}
          />
          <UserBackgroundImagePicker
            id="title-background-image"
            type="file"
            accept="image/*"
            onChange={handleBackgroundImage}
          />
        </ImgLabel>
      </BannerColor>
    );
  }

  return (
    <BannerContainer>
      <BannerImage src={src} alt={alt} sizes="100vw" width={100} height={180} />
      <ImgLabel
        htmlFor="title-background-image"
        checkProfileAuthorization={checkProfileAuthorization}
      >
        <ImgIcon
          src={icophoto}
          alt="배경 사진 지정 아이콘"
          width={36}
          height={36}
        />
        <UserBackgroundImagePicker
          id="title-background-image"
          type="file"
          accept="image/*"
          onChange={handleBackgroundImage}
        />
      </ImgLabel>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  position: relative;
`;

const BannerColor = styled.div`
  display: flex;
  justify-content: center;

  width: 100vw;
  height: 11.25rem;
  background-color: ${(props) => props.theme.colors.gray9};
  position: relative;
`;

const BannerImage = styled(Image)`
  min-width: 100vw;
  min-height: 11.25rem;
  object-fit: cover;
  opacity: 80%;
`;

const ImgLabel = styled.label<{ checkProfileAuthorization: boolean }>`
  position: absolute;
  right: 2.5rem;
  bottom: 1.25rem;
  z-index: 1;
  visibility: ${(props) =>
    props.checkProfileAuthorization ? "visible" : "hidden"};
`;

const ImgIcon = styled(Image)<StaticImageData>`
  cursor: pointer;
`;

const UserBackgroundImagePicker = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export default Banner;
