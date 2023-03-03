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
      <SubUlWrapper>
        {getSubCatories().map((item) => (
          <FiledItemContainer
            key={item.toString()}
            onClick={() => handleClickSubCategory(item)}
            dataCursor
          >
            {item}
          </FiledItemContainer>
        ))}
      </SubUlWrapper>
    </FieldDropDownContainer>
  );
};

const FieldDropDownContainer = styled.div`
  display: flex;
  position: absolute;
  top: 2.75rem;

  width: 100%;

  color: ${(props) => props.theme.colors.white};
  filter: drop-shadow(0px 0.625rem 0.625rem rgba(0, 0, 0, 0.5));
  border-radius: 0.25rem;
  background-color: ${(props) => props.theme.colors.gray9};
  z-index: 21;
`;

const FiledItemContainer = styled.li<{
  key?: string;
  onMouseOver?: () => void;
  onClick?: () => void;
  dataCursor?: boolean;
}>`
  width: 8.75rem;
  min-width: 100%;
  padding: 0.75rem;

  ${(props) => props.dataCursor && "cursor: pointer;"};
  ${({ theme }) => theme.fonts.body14};
  :hover {
    ${({ theme }) => theme.fonts.body14Medium};
    background-color: ${({ theme }) => theme.colors.gray8};
  }
`;

const SubUlWrapper = styled.ul`
  width: 100%;
`;

const Divider = styled.hr`
  padding: 0;
  margin: 0;
  border-color: ${({ theme }) => theme.colors.gray7};
`;

export default FieldDropDown;
