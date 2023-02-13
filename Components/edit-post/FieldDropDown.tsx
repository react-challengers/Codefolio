import { useState } from "react";
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

enum Field {
  WEB = "웹",
  APP = "앱",
  SOFTWARE = "소프트웨어",
  DATA = "데이터",
  WEB3 = "블록체인",
  DEVOPS = "데브옵스",
  IOT_AND_EMBEDDED = "IOT,임베디드",
  SECURITY = "보안",
}

const FiledItemContainer = styled.li<{
  key?: string;
  onMouseOver?: () => void;
}>`
  padding: 0.75rem;
  width: 8rem;
  :hover {
    background: #e6e6e6;
  }
`;

const lookup: { [key: string]: JSX.Element } = {
  WEB: (
    <ul>
      <FiledItemContainer>웹</FiledItemContainer>
    </ul>
  ),
  APP: (
    <ul>
      <FiledItemContainer>앱</FiledItemContainer>
    </ul>
  ),
  SOFTWARE: (
    <ul>
      <FiledItemContainer>사무자동화</FiledItemContainer>
      <FiledItemContainer>공장자동화</FiledItemContainer>
      <FiledItemContainer>ERP</FiledItemContainer>
      <FiledItemContainer>유니티</FiledItemContainer>
      <FiledItemContainer>언리얼</FiledItemContainer>
      <FiledItemContainer>기타</FiledItemContainer>
    </ul>
  ),
  DATA: (
    <ul>
      <FiledItemContainer>데이터</FiledItemContainer>
    </ul>
  ),
  WEB3: (
    <ul>
      <FiledItemContainer>블록체인</FiledItemContainer>
    </ul>
  ),
  DEVOPS: (
    <ul>
      <FiledItemContainer>데브옵스</FiledItemContainer>
    </ul>
  ),
  IOT_AND_EMBEDDED: (
    <ul>
      <FiledItemContainer>IOT,임베디드</FiledItemContainer>
    </ul>
  ),
  SECURITY: (
    <ul>
      <FiledItemContainer>보안</FiledItemContainer>
    </ul>
  ),
};

const FieldDropDown = () => {
  const [largeCategory, setLargeCategory] = useState<string>("웹");
  const handleLargeCategory = (item: LargeCategoryType) => {
    setLargeCategory(item);
  };

  return (
    <FieldDropDownContainer>
      <h1>{Field.APP}</h1>
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
      {lookup.WEB}
    </FieldDropDownContainer>
  );
};

const FieldDropDownContainer = styled.div`
  width: 20.5rem;
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
