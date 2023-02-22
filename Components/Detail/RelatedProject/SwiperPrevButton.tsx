import Image from "next/image";
import styled from "styled-components";

const SwiperPrevButton = () => {
  return (
    <PrevButton type="button" className="swiper-button-prev">
      <Image src="/icons/prev_button.svg" alt="이전" width={50} height={50} />
    </PrevButton>
  );
};

const PrevButton = styled.button`
  position: absolute;
  background: none;
  top: 40%;
  border: none;
  cursor: pointer;
  z-index: 10;

  &:disabled {
    display: none;
  }
`;

export default SwiperPrevButton;
