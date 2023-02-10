import Image from "next/image";
import styled from "styled-components";

interface IconCountProps {
  icon: string;
  count: number;
}

const IconCount = ({ icon, count }: IconCountProps) => {
  return (
    <IconCountContainer>
      <Image src={`/icons/${icon}.svg`} alt={icon} height={24} width={24} />
      <div>{count}</div>
    </IconCountContainer>
  );
};

const IconCountContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0;
`;

export default IconCount;
