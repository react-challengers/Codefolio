import Image from "next/image";
import styled from "styled-components";

const SwiperNextButton = () => {
  return (
    <NextButton type="button" className="swiper-button-next">
      <Image src="/icons/next_button.svg" alt="다음" width={50} height={50} />
    </NextButton>
  );
};

const NextButton = styled.button`
  position: absolute;
  background: none;
  top: 40%;
  right: 1rem;
  border: none;
  cursor: pointer;
  z-index: 10;

  &:disabled {
    display: none;
  }
`;

export default SwiperNextButton;
