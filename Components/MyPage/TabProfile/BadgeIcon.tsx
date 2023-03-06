import styled from "styled-components";

interface IconProps {
  d: string;
}

const BadgeIcon = ({ d }: IconProps) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <IconPath d={d} />
    </svg>
  );
};

const IconPath = styled.path`
  fill: ${({ theme }) => theme.colors.gray3};
`;

export default BadgeIcon;
