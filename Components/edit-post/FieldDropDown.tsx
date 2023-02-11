import styled from "styled-components";

/**
 * @TODO Tabs 로직 참조하기
 */

const field = [
  "웹",
  "앱",
  "소프트웨어",
  "데이터",
  "블록체인",
  "데브옵스",
  "IoT/임베디드",
  "보안",
];

const FieldDropDown = () => {
  return (
    <FieldDropDownContainer>
      <ul>
        {field.map((item) => (
          <FiledItemContainer key={item}>{item}</FiledItemContainer>
        ))}
      </ul>
      <Divider />
      <ul>
        <FiledItemContainer>사무자동화</FiledItemContainer>
        <FiledItemContainer>공장자동화</FiledItemContainer>
        <FiledItemContainer>ERP</FiledItemContainer>
        <FiledItemContainer>유니티</FiledItemContainer>
        <FiledItemContainer>언리얼</FiledItemContainer>
        <FiledItemContainer>기타</FiledItemContainer>
      </ul>
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

const FiledItemContainer = styled.li<{ key?: string }>`
  padding: 0.75rem;
  width: 8rem;
  :hover {
    background: #e6e6e6;
  }
`;

export default FieldDropDown;
