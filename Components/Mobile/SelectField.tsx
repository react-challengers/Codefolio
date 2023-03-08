import Image from "next/image";
import styled from "styled-components";
import arrownDown from "@/public/icons/arrow_down.svg";

const SelectField = () => {
  return (
    <SelectFieldContainer>
      <Selector>
        <Selection>전체</Selection>
        <SelectIcon src={arrownDown} alt="arrow-down" width={16} height={16} />
      </Selector>
    </SelectFieldContainer>
  );
};

const SelectFieldContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Selector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 18.75rem;
  height: 2.5rem;

  border-bottom: 1px solid ${({ theme }) => theme.colors.gray4};
`;

const Selection = styled.div`
  width: 100%;
  padding: 0.625rem 1rem;

  ${({ theme }) => theme.fonts.body14Medium}
  color: ${({ theme }) => theme.colors.white};
`;

const SelectIcon = styled(Image)`
  fill: ${({ theme }) => theme.colors.gray5};
`;

export default SelectField;
