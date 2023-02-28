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
  DATA = "데이터",
  AI = "인공지능",
}

const field = Object.values(Field);

const FieldDropDown = () => {
  const largeCategory = useRecoilValue(postLargeCategory);
  const setLargeCategory = useSetRecoilState(postLargeCategory);
  const setSubCategory = useSetRecoilState(postSubCategory);

  const getSubCatories = () => {
    switch (largeCategory) {
      case "웹":
        return ["Full-stack", "Front-end", "Back-end"];
      case "앱":
        return ["Android", "iOS", "Flutter", "React Native"];
      case "데이터":
        return ["Big data"];
      case "인공지능":
        return ["AI"];
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
  width: 18rem;
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
