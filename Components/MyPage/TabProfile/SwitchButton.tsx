import { useUserProfile } from "@/hooks/query";
import { myPageGender } from "@/lib/recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const SwitchButton = () => {
  const { profileData } = useUserProfile();
  const [currentItem, setCurrentItem] = useRecoilState(myPageGender);

  useEffect(() => {
    setCurrentItem(profileData?.gender);
  }, []);

  const handleSetCurrentItem = (item: Gender) => {
    setCurrentItem(item);
  };

  const items: Gender[] = ["남자", "여자", "선택안함"];

  return (
    <SwitchButtonContainer>
      {items.map((item: Gender) => (
        <GenderButton
          key={item}
          active={currentItem === item}
          onClick={() => handleSetCurrentItem(item)}
        >
          {item}
        </GenderButton>
      ))}
    </SwitchButtonContainer>
  );
};

const SwitchButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  filter: drop-shadow(0px 0.25rem 0.625rem rgba(0, 0, 0, 0.25));
`;

interface DefaultButtonProps {
  active: boolean;
}

const GenderButton = styled.button<DefaultButtonProps>`
  border: none;
  cursor: pointer;
  flex-grow: 1;
  height: 2.75rem;
  font-size: 1rem;
  color: ${({ active, theme }) =>
    active ? theme.colors.black : theme.colors.white};
  background-color: ${({ active, theme }) =>
    active ? theme.colors.primary6 : theme.colors.gray8};
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
