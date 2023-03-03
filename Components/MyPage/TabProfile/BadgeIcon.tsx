import styled from "styled-components";

interface IconProps {
  d: string;
  highlight: boolean;
}

const BadgeIcon = ({ d, highlight }: IconProps) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <IconPath d={d} highlight={highlight} />
    </svg>
  );
};

const IconPath = styled.path<{ highlight: boolean }>`
  fill: ${({ theme, highlight }) =>
    highlight ? theme.colors.primary6 : theme.colors.gray3};
`;

export default BadgeIcon;
