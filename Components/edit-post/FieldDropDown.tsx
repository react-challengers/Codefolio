import { useReducer } from "react";
import styled from "styled-components";

/**
 * reducer함수의 state인자는 다음 action인자를 작성하기 위해 존재합니다.
 * @TODO 하위 분야는 cursor pointer css를 조건부로 추가합니다.
 * @TODO visibility는 호출한 컴포넌트에서 제어합니다.
 * @TODO 하위 분야 state 제어는 recoil로 처리합니다.
 * @example
 * <FieldDropDown />
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

const initialState: string[] = ["프론트엔드", "백엔드", "풀스택"];

const reducer = (
  _state: string[],
  action: { type: LargeCategoryType }
): string[] => {
  switch (action.type) {
    case "웹":
      return ["프론트엔드", "백엔드", "풀스택"];
    case "앱":
      return ["안드로이드", "iOS", "리액트 네이티브", "플러터"];
    case "소프트웨어":
      return ["사무자동화", "공장자동화", "ERP", "유니티", "언리얼", "기타"];
    case "데이터":
      return ["데이터 엔지니어링", "머신러닝 엔지니어링", "데이터 사이언스"];
    case "블록체인":
      return ["블록체인"];
    case "데브옵스":
      return ["데브옵스"];
    case "IoT/임베디드":
      return ["IOT,임베디드"];
    case "보안":
      return ["보안"];
    default:
      return ["기타"];
  }
};

const FieldDropDown = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleLargeCategory = (item: LargeCategoryType) => {
    dispatch({ type: item });
  };

  return (
    <FieldDropDownContainer>
      <ul>
        {field.map((item) => (
          <FiledItemContainer
            onMouseOver={() => handleLargeCategory(item)}
            key={item.toString()}
          >
            {item}
          </FiledItemContainer>
        ))}
      </ul>
      <Divider />
      <ul>
        {state.map((item) => (
          <FiledItemContainer key={item.toString()}>{item}</FiledItemContainer>
        ))}
      </ul>
    </FieldDropDownContainer>
  );
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
