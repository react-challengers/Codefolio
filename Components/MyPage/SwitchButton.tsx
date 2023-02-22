import { useUserProfile } from "@/hooks/query";
import { myPageGender } from "@/lib/recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const SwitchButton = () => {
  const { profileData } = useUserProfile();
  const [currentItem, setCurrentItem] = useRecoilState(myPageGender);

  useEffect(() => {
    setCurrentItem(profileData.gender);
  }, []);

  const handleSetCurrentItem = (item: Gender) => {
    setCurrentItem(item);
    // 쿼리 캐시 갱신
  };

  const items: Gender[] = ["남자", "여자", "선택안함"];

  return (
    <SwitchButtonContainer>
      {items.map((item: Gender) => (
        <DefaultButton
          key={item}
          active={currentItem === item}
          onClick={() => handleSetCurrentItem(item)}
        >
          {item}
        </DefaultButton>
      ))}
    </SwitchButtonContainer>
  );
};

const SwitchButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  filter: drop-shadow(0.125rem 0.25rem 0.75rem rgba(0, 0, 0, 0.1))
    drop-shadow(0rem 0rem 0.25rem rgba(0, 0, 0, 0.1));
`;

interface DefaultButtonProps {
  active: boolean;
}

const DefaultButton = styled.button<DefaultButtonProps>`
  border: none;
  cursor: pointer;
  width: 6.25rem;
  height: 2.75rem;
  font-size: 1rem;
  color: ${({ active }) => (active ? "white" : "black")};
  background-color: ${({ active }) => (active ? "black" : "white")};
  :first-child {
    border-top-left-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;
  }
  :last-child {
    border-top-right-radius: 0.75rem;
    border-bottom-right-radius: 0.75rem;
  }
`;

export default SwitchButton;
