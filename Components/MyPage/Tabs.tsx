import { useState } from "react";
import styled from "styled-components";

const tabList = ["프로젝트", "팔로잉", "북마크", "좋아요", "보관함", "프로필"];

const Tabs = () => {
  const [currentTab, setCurrentTab] = useState(0);
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
  width: 4.25rem;
  text-align: center;
  padding: 1rem;
  border-bottom: 0.125rem solid ${({ active }) => (active ? "black" : "grey")};
  cursor: pointer;
`;

export default Tabs;
