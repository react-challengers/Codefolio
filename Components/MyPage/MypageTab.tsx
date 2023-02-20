import styled from "styled-components";

interface TabsProps {
  tabList: string[];
  currentTab: number;
  onClick: (currentTab: number) => void;
}

const Tabs = ({ tabList, currentTab, onClick }: TabsProps) => {
  return (
    <TabsContainer listLength={tabList.length}>
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

interface TabsContainerProps {
  listLength: number;
}

const TabsContainer = styled.div<TabsContainerProps>`
  display: grid;
  grid-template-columns: repeat(${({ listLength }) => listLength}, 1fr);
  width: 64rem;
`;

interface TabWrapperProps {
  active: boolean;
}

const TabWrapper = styled.div<TabWrapperProps>`
  /* width: 9.8rem; */
  text-align: center;
  padding: 1rem;
  border-top: 1px solid ${({ active }) => (active ? "black" : "lightgrey")};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;

export default Tabs;
