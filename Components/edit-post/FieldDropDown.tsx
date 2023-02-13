import { useReducer, useState } from "react";
import styled from "styled-components";

/**
 * @TODO Tabs 로직 참조하기
 */

type LargeCategoryType =
  | "웹"
  | "앱"
  | "소프트웨어"
  | "데이터"
  | "블록체인"
  | "데브옵스"
  | "IoT/임베디드"
  | "보안";

const field: LargeCategoryType[] = [
  "웹",
  "앱",
  "소프트웨어",
  "데이터",
  "블록체인",
  "데브옵스",
  "IoT/임베디드",
  "보안",
];

// const initialState: { largeCategory: LargeCategoryType } = {
//   largeCategory: "웹",
// };

// const reducer = (state, action) => {
//   switch (action) {
//     case value:
//       break;

//     default:
//       break;
//   }
// };

const FieldDropDown = () => {
  const [largeCategory, setLargeCategory] = useState<string>("웹");
  const handleLargeCategory = (item: LargeCategoryType) => {
    setLargeCategory(item);
  };

  // const [] = useReducer();

  return (
    <FieldDropDownContainer>
      <ul>
        {field.map((item) => (
          <FiledItemContainer
            onMouseOver={() => handleLargeCategory(item)}
            key={item}
          >
            {item}
          </FiledItemContainer>
        ))}
      </ul>
      <Divider />
      {LookUp(largeCategory as LargeCategoryType)}
    </FieldDropDownContainer>
  );
};

const LookUp = (LargeFiled: LargeCategoryType) => {
  switch (LargeFiled) {
    case "웹":
      return (
        <ul>
          <FiledItemContainer>프론트엔드</FiledItemContainer>
          <FiledItemContainer>백엔드</FiledItemContainer>
          <FiledItemContainer>풀스택</FiledItemContainer>
        </ul>
      );
    case "앱":
      return (
        <ul>
          <FiledItemContainer>안드로이드</FiledItemContainer>
          <FiledItemContainer>iOS</FiledItemContainer>
          <FiledItemContainer>리액트 네이티브</FiledItemContainer>
          <FiledItemContainer>플러터</FiledItemContainer>
        </ul>
      );
    case "소프트웨어":
      return (
        <ul>
          <FiledItemContainer>사무자동화</FiledItemContainer>
          <FiledItemContainer>공장자동화</FiledItemContainer>
          <FiledItemContainer>ERP</FiledItemContainer>
          <FiledItemContainer>유니티</FiledItemContainer>
          <FiledItemContainer>언리얼</FiledItemContainer>
          <FiledItemContainer>기타</FiledItemContainer>
        </ul>
      );
    case "데이터":
      return (
        <ul>
          <FiledItemContainer>데이터 엔지니어링</FiledItemContainer>
          <FiledItemContainer>머신러닝 엔지니어링</FiledItemContainer>
          <FiledItemContainer>데이터 사이언스</FiledItemContainer>
        </ul>
      );
    case "블록체인":
      return (
        <ul>
          <FiledItemContainer>블록체인</FiledItemContainer>
        </ul>
      );
    case "데브옵스":
      return (
        <ul>
          <FiledItemContainer>데브옵스</FiledItemContainer>
        </ul>
      );
    case "IoT/임베디드":
      return (
        <ul>
          <FiledItemContainer>IOT,임베디드</FiledItemContainer>
        </ul>
      );
    case "보안":
      return (
        <ul>
          <FiledItemContainer>보안</FiledItemContainer>
        </ul>
      );
    default:
      return (
        <ul>
          <FiledItemContainer>기타</FiledItemContainer>
        </ul>
      );
  }
};

const FiledItemContainer = styled.li<{
  key?: string;
  onMouseOver?: () => void;
}>`
  padding: 0.75rem;
  width: 8.75rem;
  :hover {
    background: #e6e6e6;
  }
`;

const FieldDropDownContainer = styled.div`
  width: 21.5rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #cccccc;
  display: flex;
  border-radius: 4px;
  gap: 0;
`;

const Divider = styled.hr`
  padding: 0;
  margin: 0;
`;

export default FieldDropDown;
