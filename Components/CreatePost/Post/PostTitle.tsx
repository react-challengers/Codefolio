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
          placeholder="소제목을 입력하세요"
        />
        <ImgLabel htmlFor="background-color-picker">
          <ImgIcon
            src={color_fill}
            alt="배경색 지정 아이콘"
            width={36}
            height={36}
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
  padding: 3rem;
  gap: 1.375rem;
  position: relative;
  background-color: ${(props) => props.color};
`;
const TitleInput = styled.input`
  display: inline-block;
  width: 100%;
  height: 3.625rem;
  font-size: 2.5rem;
  font-weight: 700;
  border: none;
  background-color: transparent;
`;
const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: transparent;
`;
const SubTitleInput = styled.input`
  width: 90%;
  height: 2rem;
  font-size: 1.375rem;
  font-weight: 400;
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
