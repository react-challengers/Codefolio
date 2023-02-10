import styled from "styled-components";

type CurrentItemType = "남성" | "여성" | "선택 안함";

interface SwitchButtonProps {
  currentItem: string;
  setCurrentItem: (currentItem: CurrentItemType) => void;
}

const SwitchButton = ({ currentItem, setCurrentItem }: SwitchButtonProps) => {
  return (
    <SwitchButtonContainer>
      <HeadButton
        active={currentItem === "남성"}
        onClick={() => setCurrentItem("남성")}
      >
        남성
      </HeadButton>
      <DefaultButton
        active={currentItem === "여성"}
        onClick={() => setCurrentItem("여성")}
      >
        여성
      </DefaultButton>
      <TailButton
        active={currentItem === "선택 안함"}
        onClick={() => setCurrentItem("선택 안함")}
      >
        선택 안함
      </TailButton>
    </SwitchButtonContainer>
  );
};

const SwitchButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  filter: drop-shadow(2px 4px 12px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.1));
`;

interface DefaultButtonProps {
  active: boolean;
}

const DefaultButton = styled.button<DefaultButtonProps>`
  border: none;
  cursor: pointer;
  width: 100px;
  height: 44px;
  font-size: 16px;
  color: ${({ active }) => (active ? "white" : "black")};
  background-color: ${({ active }) => (active ? "black" : "white")};
`;

const HeadButton = styled(DefaultButton)`
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
`;

const TailButton = styled(DefaultButton)`
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export default SwitchButton;
