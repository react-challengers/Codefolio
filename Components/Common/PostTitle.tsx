// todo! input 박스 텍스트 길이에 따라 늘어나도록

import React, { useState } from "react";
import styled from "styled-components";

/**
 * width: 100% 반영 피드백 반영 완료
 * @TODO  input을 커스텀 훅으로 만들기
 */
const PostTitle = () => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  return (
    <TitleWrapper>
      <TitleInput
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="프로젝트 제목을 입력하세요"
      />
      <SubTitleInput
        value={subTitle}
        onChange={(e) => setSubTitle(e.target.value)}
        placeholder="소제목을 입력하세요"
      />
    </TitleWrapper>
  );
};

export default PostTitle;

const TitleWrapper = styled.div`
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
const SubTitleInput = styled.input`
  width: 100%;
  height: 2rem;
  font-size: 1.375rem;
  font-weight: 400;
  border: none;
`;
