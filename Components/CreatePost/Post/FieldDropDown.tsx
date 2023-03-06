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
  Front = "Front-end",
  Back = "Back-end",
  Full = "Full-stack",
  Andriod = "Android",
  IOS = "iOS",
  Flutter = "Flutter",
  RN = "React Native",
  Bigdata = "Big data",
  AI = "AI",
  ETC = "기타",
}

const field = Object.values(Field);

interface FiledDropDownProps {
  handleClick: (item: string) => void;
  visibleToggle: (visible: boolean) => void;
}
const FieldDropDown = ({ handleClick, visibleToggle }: FiledDropDownProps) => {
  return (
    <FieldDropDownContainer>
      <FiledBlock>
        {field.map((item) => (
          <FiledItemContainer
            key={item.toString()}
            onClick={() => {
              handleClick(item);
              visibleToggle(false);
            }}
            dataCursor
          >
            {item}
          </FiledItemContainer>
        ))}
      </FiledBlock>
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

const FiledBlock = styled.ul`
  width: 100%;
`;

export default FieldDropDown;
