/* eslint-disable react/button-has-type */
// todo! input 박스 텍스트 길이에 따라 늘어나도록

import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

/**
 * width: 100% 반영 피드백 반영 완료
 * @TODO  input을 커스텀 훅으로 만들기
 */
const PostTitle = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return;
      }
      console.log(e.target.files[0].name);
    },
    []
  );

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <TitleContainer>
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
        <FileInput
          type="file"
          accept="images/*"
          ref={inputRef}
          onChange={onUploadImage}
        />
        <button label="이미지 업로드" onClick={onUploadImageButtonClick} />
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
  border: 1px solid;
`;
const TitleInput = styled.input`
  display: inline-block;
  width: 100%;
  height: 3.625rem;
  font-size: 2.5rem;
  font-weight: 700;
  border: none;
`;
const SubTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const SubTitleInput = styled.input`
  width: 90%;
  height: 2rem;
  font-size: 1.375rem;
  font-weight: 400;
  border: none;
`;
const FileInput = styled.input`
  width: 0;
  height: 0;
  padding: 0;
  border: 0;
  overflow: hidden;
`;
