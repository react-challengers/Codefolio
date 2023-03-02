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
  text-align: center;
  padding: 1rem;
  border-top: ${({ active }) => (active ? `3px` : `1px`)} solid
    ${({ active, theme }) => (active ? theme.colors.white : theme.colors.gray5)};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  color: ${({ active, theme }) =>
    active ? theme.colors.white : theme.colors.gray5};
  margin: 0 0 2.25rem;
  height: 3.5rem;
`;

export default Tabs;
