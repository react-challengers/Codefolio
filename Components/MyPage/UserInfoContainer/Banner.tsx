import Image, { StaticImageData } from "next/image";
import styled from "styled-components";
import useUserImage from "./useUserImage";

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
  const { handleImage: handleBackgroundImage } =
    useUserImage("background_image");

  if (!src) {
    return (
      <BannerColor>
        <ImgLabel htmlFor="background-color-picker">
          <ImgIcon
            src="/icons/ico-photo.svg"
            alt="배경색 지정 아이콘"
            width={36}
            height={36}
          />
          <UserBackgroundImagePicker
            id="background-color-picker"
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
      <ImgLabel htmlFor="background-color-picker">
        <ImgIcon
          src="/icons/ico-photo.svg"
          alt="배경색 지정 아이콘"
          width={36}
          height={36}
        />
        <UserBackgroundImagePicker
          id="background-color-picker"
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
  width: 100vw;
  height: 11.25rem;
  background-color: ${(props) => props.theme.colors.gray9};
  position: relative;
`;

const BannerImage = styled(Image)`
  width: 100vw;
  height: 11.25rem;
  object-fit: cover;
  opacity: 80%;
`;

const ImgLabel = styled.label`
  position: absolute;
  right: 2.5rem;
  bottom: 1.25rem;
  z-index: 1;
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
