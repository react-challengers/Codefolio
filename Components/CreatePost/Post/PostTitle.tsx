import React from "react";
import styled from "styled-components";
import Image, { StaticImageData } from "next/image";
import color_fill from "@/public/icons/color_fill.svg";
import { useRecoilState } from "recoil";
import {
  postSubTitle,
  postTitle,
  postTitleBackgroundColor,
} from "@/lib/recoil";

/**
 * @TODO  input을 커스텀 훅으로 만들기.
 */

const PostTitle = () => {
  const [backgroundColor, setBackgroundColor] = useRecoilState(
    postTitleBackgroundColor
  );
  // common input 으로 변경
  const [title, setTitle] = useRecoilState(postTitle);
  const [subTitle, setSubTitle] = useRecoilState(postSubTitle);

  const onChangeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundColor(e.target.value);
  };

  return (
    <TitleContainer color={backgroundColor ?? "#fff"}>
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="프로젝트 제목을 입력하세요"
      />
      <SubTitleWrapper>
        <SubTitleInput
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="‘SA’, ‘프로젝트 회고’ 등 글의 종류를 입력하세요"
        />
        <ImgLabel htmlFor="background-color-picker">
          <ImgIcon
            src={color_fill}
            alt="배경색 지정 아이콘"
            width={24}
            height={24}
          />
        </ImgLabel>
        <TitleBackgroundColorPicker
          id="background-color-picker"
          type="color"
          onChange={onChangeColor}
        />
      </SubTitleWrapper>
    </TitleContainer>
  );
};

export default PostTitle;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8rem 4.5rem 2.5rem;
  gap: 1rem;
  position: relative;
  background-color: ${(props) => props.color};
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
const ImgLabel = styled.label``;

const ImgIcon = styled(Image)<StaticImageData>`
  cursor: pointer;
`;
const TitleBackgroundColorPicker = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;
