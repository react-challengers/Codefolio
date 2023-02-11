import styled from "styled-components";

interface TabsProps {
  tabList: string[];
  currentTab: number;
  onClick: (currentTab: number) => void;
}

const Tabs = ({ tabList, currentTab, onClick }: TabsProps) => {
  return (
    <TabsContainer>
      {tabList.map((tab, idx) => (
        <TabWrapper
          key={tab}
          active={currentTab === idx}
          onClick={() => onClick(idx)}
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
  border-bottom: 0.125rem solid
    ${({ active }) => (active ? "black" : "lightgrey")};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;

export default Tabs;
