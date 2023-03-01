import Image from "next/image";
import styled from "styled-components";

interface IconCountProps {
  icon: string;
  count: number;
}

const IconWithCount = ({ icon, count }: IconCountProps) => {
  return (
    <IconCountContainer>
      <Image src={`/icons/${icon}.svg`} alt={icon} height={16} width={16} />
      <IconCount>{count}</IconCount>
    </IconCountContainer>
  );
};

const IconCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
  margin-right: 0.25rem;
  height: 1rem;

  &:last-child {
    margin-right: 0;
  }
`;

const IconCount = styled.div`
  ${({ theme }) => theme.fonts.body13En};

  padding-top: 0.125rem;
  margin-left: 1px;
`;

export default IconWithCount;
