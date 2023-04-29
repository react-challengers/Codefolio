import styled from "styled-components";

interface TopButtonProps {
  right: string;
  bottom: string;
  elementRef?: React.RefObject<HTMLElement>;
}

const TopButton = ({ right, bottom, elementRef }: TopButtonProps) => {
  const scrollTop = () => {
    if (elementRef) {
      elementRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <TopButtonContainer onClick={scrollTop} right={right} bottom={bottom}>
      <svg
        width="54"
        height="55"
        viewBox="0 0 54 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_1271_19039)">
          <circle
            cx="27"
            cy="23.5"
            r="18"
            transform="rotate(-180 27 23.5)"
            fill="#97E4E9"
          />
          <path
            d="M27.0001 15.7413C27.1201 15.7413 27.2326 15.7599 27.3376 15.7971C27.4426 15.8343 27.5401 15.8982 27.6301 15.9888L33.5701 21.9288C33.7501 22.1088 33.8401 22.3224 33.8401 22.5696C33.8401 22.8168 33.7501 23.0307 33.5701 23.2113C33.3901 23.3913 33.1801 23.4813 32.9401 23.4813C32.7001 23.4813 32.4901 23.3913 32.3101 23.2113L27.9001 18.8013L27.9001 30.3813C27.9001 30.6363 27.8137 30.8463 27.6409 31.0113C27.4681 31.1763 27.2545 31.2588 27.0001 31.2588C26.7451 31.2588 26.5312 31.1724 26.3584 30.9996C26.1856 30.8268 26.0995 30.6132 26.1001 30.3588L26.1001 18.8013L21.6901 23.2113C21.5101 23.3913 21.3001 23.4813 21.0601 23.4813C20.8201 23.4813 20.6101 23.3913 20.4301 23.2113C20.2501 23.0313 20.1601 22.8174 20.1601 22.5696C20.1601 22.3218 20.2501 22.1082 20.4301 21.9288L26.3701 15.9888C26.4601 15.8988 26.5576 15.8349 26.6626 15.7971C26.7676 15.7593 26.8801 15.7407 27.0001 15.7413Z"
            fill="#404040"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1271_19039"
            x="0"
            y="0.1"
            width="54"
            height="54"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3.6" />
            <feGaussianBlur stdDeviation="4.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1271_19039"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1271_19039"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </TopButtonContainer>
  );
};

const TopButtonContainer = styled.div<TopButtonProps>`
  position: fixed;
  right: ${({ right }) => right};
  bottom: 2.75rem;
  z-index: 10;

  cursor: pointer;

  &:hover {
    circle {
      fill: ${({ theme }) => theme.colors.primary6};
    }
  }
`;

export default TopButton;
