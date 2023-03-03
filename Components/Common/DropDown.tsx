import styled from "styled-components";

interface DropDownProps {
  item: string;
  onClickHandler: (item: string) => void;
}

const DropDown = ({ item, onClickHandler }: DropDownProps) => {
  return (
    <HomeDropDownItemContainer
      key={item}
      onClick={() => {
        onClickHandler(item);
      }}
    >
      <HomeDropDownItem>{item}</HomeDropDownItem>
    </HomeDropDownItemContainer>
  );
};

const HomeDropDownItemContainer = styled.div`
  height: 3.5rem;
  display: flex;
  align-items: center;
  padding: 1.1563rem 0.75rem;

  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.gray8};
  }
`;

const HomeDropDownItem = styled.li``;

export default DropDown;
