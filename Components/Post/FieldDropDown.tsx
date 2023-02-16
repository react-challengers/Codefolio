import { postLargeCategory, postSubCategory } from "@/lib/recoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

/**
 * reducer함수의 _state매개변수는 다음 action인자를 작성하기 위해 존재합니다.
 * @example
 * <FieldDropDown />
 */

/**
 * 아래 정의가 없으면 "ReferenceError: Field is not defined"에러가 발생합니다.
 * enum의 데이터는 전역으로 공유되지 않는 것 같습니다. 타입은 전역으로 공유됩니다.
 */
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

const field = Object.values(Field);

const FieldDropDown = () => {
  const largeCategory = useRecoilValue(postLargeCategory);
  const setLargeCategory = useSetRecoilState(postLargeCategory);
  const setSubCategory = useSetRecoilState(postSubCategory);

  const getSubCatories = () => {
    switch (largeCategory) {
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
      case "IOT,임베디드":
        return ["IOT,임베디드"];
      case "보안":
        return ["보안"];
      default:
        return ["기타"];
    }
  };

  const handleClickSubCategory = (item: string) => {
    setSubCategory(item);
  };

  return (
    <FieldDropDownContainer>
      <ul>
        {field.map((item) => (
          <FiledItemContainer
            onMouseOver={() => {
              setLargeCategory(item);
            }}
            key={item.toString()}
          >
            {item}
          </FiledItemContainer>
        ))}
      </ul>
      <Divider />
      <ul>
        {getSubCatories().map((item) => (
          <FiledItemContainer
            key={item.toString()}
            onClick={() => handleClickSubCategory(item)}
            dataCursor
          >
            {item}
          </FiledItemContainer>
        ))}
      </ul>
    </FieldDropDownContainer>
  );
};

const FieldDropDownContainer = styled.div`
  width: 21.5rem;
  box-shadow: 0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border: 1px solid #cccccc;
  display: flex;
  border-radius: 0.2rem;
  gap: 0;
  position: absolute;
  background-color: #fff;
  z-index: 21;
`;

const FiledItemContainer = styled.li<{
  key?: string;
  onMouseOver?: () => void;
  onClick?: () => void;
  dataCursor?: boolean;
}>`
  padding: 0.75rem;
  width: 8.75rem;
  ${(props) => props.dataCursor && "cursor: pointer;"};
  :hover {
    background: #e6e6e6;
  }
`;

const Divider = styled.hr`
  padding: 0;
  margin: 0;
  border: 1px solid #cccccc;
`;

export default FieldDropDown;
