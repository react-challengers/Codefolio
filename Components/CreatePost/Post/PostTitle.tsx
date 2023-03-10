import React, { ChangeEvent } from "react";
import styled from "styled-components";
import Image, { StaticImageData } from "next/image";
import image_upload from "@/public/icons/image_upload.svg";
import disable_check from "@/public/icons/disable_check.svg";
import enable_check from "@/public/icons/enable_check.svg";
import { useRecoilState } from "recoil";
import {
  postId,
  postSubTitle,
  postThumbnailCheck,
  postTitle,
  postTitleBackgroundImage,
} from "@/lib/recoil";
import convertEase64ToFile from "@/utils/commons/convertBase64ToFile";
import uploadImage from "@/utils/commons/uploadImage";
import { v4 as uuidv4 } from "uuid";
import compressImg from "@/utils/commons/compressImg";

/**
 * @TODO  input을 커스텀 훅으로 만들기.
 */

const PostTitle = () => {
  const [isPostId] = useRecoilState(postId);
  const [titlieBackgroundImage, setTitleBackgroundImage] = useRecoilState(
    postTitleBackgroundImage
  );
  // common input 으로 변경
  const [title, setTitle] = useRecoilState(postTitle);
  const [subTitle, setSubTitle] = useRecoilState(postSubTitle);
  const [thumbnailCheck, setThumbnailCheck] =
    useRecoilState(postThumbnailCheck);

  const handleThumbnail = () => {
    setThumbnailCheck((prev) => !prev);
  };

  const onChangeBackgroundImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (!file) return;

    const compression = await compressImg(file[0]);
    if (!compression) return;

    const reader = new FileReader();
    reader.readAsDataURL(compression);
    reader.onload = async (uploadedImg) => {
      const base64 = uploadedImg.target?.result;
      if (typeof base64 !== "string") return;
      const fileId = uuidv4();

      const imgFile = await convertEase64ToFile(base64);
      const publicImageUrl = await uploadImage(
        imgFile,
        "post-image",
        `${isPostId}/${fileId}`
      );
      if (!publicImageUrl) return;

      setTitleBackgroundImage(publicImageUrl);
    };
  };

  return (
    <TitleContainer>
      {titlieBackgroundImage && (
        <TitleBackground
          src={titlieBackgroundImage}
          width={1400}
          height={262}
          alt="커버 이미지"
        />
      )}
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="프로젝트 제목을 입력하세요"
        maxLength={30}
      />
      <SubTitleWrapper>
        <SubTitleInput
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="‘SA’, ‘프로젝트 회고’ 등 글의 종류를 입력하세요"
          maxLength={40}
        />
        <ThumbnailContainer onClick={handleThumbnail}>
          {thumbnailCheck ? (
            <CheckInput
              src={enable_check}
              width={24}
              height={24}
              alt="checked"
            />
          ) : (
            <CheckInput
              src={disable_check}
              width={24}
              height={24}
              alt="Unchecked"
            />
          )}
          <CheckLabel>썸네일로 지정</CheckLabel>
        </ThumbnailContainer>
        <ImgLabel htmlFor="background-image">
          <ImgIcon
            src={image_upload}
            alt="배경색 지정 아이콘"
            width={24}
            height={24}
          />
        </ImgLabel>
        <TitleBackgroundInput
          id="background-image"
          type="file"
          accept="image/*"
          multiple={false}
          onChange={onChangeBackgroundImage}
        />
      </SubTitleWrapper>
    </TitleContainer>
  );
};

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8rem 4.5rem 2.5rem;
  gap: 1rem;
  position: relative;
  overflow: hidden;
`;

const TitleBackground = styled(Image)`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: auto;
  z-index: -1;
  opacity: 0.8;
`;

const TitleInput = styled.input`
  display: inline-block;
  width: 100%;
  height: 2.875rem;
  ${({ theme }) => theme.fonts.title36};
  color: ${({ theme }) => theme.colors.white};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray6};
  }
  border: none;
  background-color: transparent;
`;

const SubTitleWrapper = styled.div`
  display: flex;
  background-color: transparent;
`;

const SubTitleInput = styled.input`
  width: 100%;
  height: 1.75rem;
  margin-right: 1rem;
  ${({ theme }) => theme.fonts.subtitle18};
  color: ${({ theme }) => theme.colors.gray2};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray7};
  }
  border: none;
  background-color: transparent;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  cursor: pointer;
  padding-right: 1rem;
`;

const CheckInput = styled(Image)<StaticImageData>``;

const CheckLabel = styled.span`
  width: max-content;
  padding: 0.25rem;
  ${({ theme }) => theme.fonts.body14}
  color: ${({ theme }) => theme.colors.white};
`;

const ImgLabel = styled.label`
  cursor: pointer;
`;

const ImgIcon = styled(Image)<StaticImageData>`
  cursor: pointer;
`;
const TitleBackgroundInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;

export default PostTitle;
