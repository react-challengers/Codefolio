import { useState } from "react";
import styled from "styled-components";

const Tabs = () => {
  const tabList = [
    "프로젝트",
    "팔로잉",
    "북마크",
    "좋아요",
    "보관함",
    "프로필",
  ];
  const [currentTab, setCurrentTab] = useState(1);
  return (
    <TabsContainer>
      {tabList.map((tab, idx) => (
        <TabWrapper
          key={tab}
          active={currentTab === idx}
          onClick={() => setCurrentTab(idx)}
        >
          {tab}
        </TabWrapper>
      ))}
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

interface TabWrapperProps {
  active: boolean;
}

const TabWrapper = styled.div<TabWrapperProps>`
  width: 68px;
  text-align: center;
  padding: 16px;
  border-bottom: 2px solid ${({ active }) => (active ? "black" : "grey")};
  cursor: pointer;
`;

export default Tabs;
