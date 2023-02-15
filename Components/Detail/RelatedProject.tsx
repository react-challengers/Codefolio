import { useRef } from "react";
import Image from "next/image";
import styled from "styled-components";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CardItem from "../Common/Card/CardItem";

import "swiper/swiper.min.css";

/**
 * @TODO onReachEnd 이벤트를 사용하여
 * 슬라이드가 끝에 도달했을 때, 다음 정보를 불러오는 infinite scroll을 구현해야한다.
 * @TODO 더미 데이터를 삭제하고, 실제 데이터를 불러와야한다.
 */

const RelatedProject = () => {
  SwiperCore.use([Navigation, Scrollbar]);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <RelatedProjectContainer>
      <RelatedProjectTitle>연관 프로젝트</RelatedProjectTitle>
      <SwiperContainer>
        <PrevButton type="button" ref={prevRef}>
          <Image
            src="/icons/prev_button.svg"
            alt="이전"
            width={50}
            height={50}
          />
        </PrevButton>
        <SwiperWrapper>
          <Swiper
            modules={[Navigation, Scrollbar]}
            spaceBetween={20}
            slidesPerView={4}
            navigation
            scrollbar={{ draggable: true }}
            onReachEnd={() => console.log("end")}
            onBeforeInit={(swiper) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation !== "boolean"
              ) {
                if (prevRef.current && nextRef.current) {
                  /* no-param-reassign은 파라미터를 재할당하는 것을 막는다.
               하지만, swiper.params.navigation.prevEl, swiper.params.navigation.nextEl은
               SwiperCore.use([Navigation, Scrollbar]);에서 정의된 파라미터이기 때문에
               재할당을 해야한다.
               따라서 eslint-disable-next-line no-param-reassign을 사용하여
               재할당을 허용한다. */
                  // eslint-disable-next-line no-param-reassign
                  swiper.params.navigation.prevEl = prevRef.current;
                  // eslint-disable-next-line no-param-reassign
                  swiper.params.navigation.nextEl = nextRef.current;
                }
              }
              swiper.navigation.update();
            }}
          >
            <SwiperSlide>
              <CardItem
                imageSrc="anonImage.png"
                imageAlt="ㅁ"
                title="안드로이드 스튜디오에서 빌드가 안될때"
                subTitle="안드로이드 스튜디오에서 빌드가 안될때"
                tagItems={["App | Android, iOS, flutter"]}
                date="2021.08.01"
                comments={100}
                likes={100}
                field="APP"
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardItem
                imageSrc="anonImage.png"
                imageAlt="ㅁ"
                title="안드로이드 스튜디오에서 빌드가 안될때"
                subTitle="안드로이드 스튜디오에서 빌드가 안될때"
                tagItems={["App | Android, iOS, flutter"]}
                date="2021.08.01"
                comments={100}
                likes={100}
                field="APP"
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardItem
                imageSrc="anonImage.png"
                imageAlt="ㅁ"
                title="안드로이드 스튜디오에서 빌드가 안될때"
                subTitle="안드로이드 스튜디오에서 빌드가 안될때"
                tagItems={["App | Android, iOS, flutter"]}
                date="2021.08.01"
                comments={100}
                likes={100}
                field="APP"
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardItem
                imageSrc="anonImage.png"
                imageAlt="ㅁ"
                linkURL="google.com"
                title="안드로이드 스튜디오에서 빌드가 안될때"
                subTitle="안드로이드 스튜디오에서 빌드가 안될때"
                tagItems={["App | Android, iOS, flutter"]}
                date="2021.08.01"
                comments={100}
                likes={100}
                field="APP"
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardItem
                imageSrc="anonImage.png"
                imageAlt="ㅁ"
                linkURL="google.com"
                title="안드로이드 스튜디오에서 빌드가 안될때"
                subTitle="안드로이드 스튜디오에서 빌드가 안될때"
                tagItems={["App | Android, iOS, flutter"]}
                date="2021.08.01"
                comments={100}
                likes={100}
                field="APP"
              />
            </SwiperSlide>
            <SwiperSlide>
              <CardItem
                imageSrc="anonImage.png"
                imageAlt="ㅁ"
                linkURL="google.com"
                title="안드로이드 스튜디오에서 빌드가 안될때"
                subTitle="안드로이드 스튜디오에서 빌드가 안될때"
                tagItems={["App | Android, iOS, flutter"]}
                date="2021.08.01"
                comments={100}
                likes={100}
                field="APP"
              />
            </SwiperSlide>
          </Swiper>
        </SwiperWrapper>
        <NextButton type="button" ref={nextRef}>
          <Image
            src="/icons/next_button.svg"
            alt="다음"
            width={50}
            height={50}
          />
        </NextButton>
      </SwiperContainer>
    </RelatedProjectContainer>
  );
};

const RelatedProjectContainer = styled.section`
  width: 87.5rem;
  height: 30rem;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
`;

const RelatedProjectTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin: 2rem 0 3.125rem 7.5rem;
`;

const SwiperContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 7.5rem;
`;

const SwiperWrapper = styled.div`
  width: 78.75rem;
  height: 100%;
`;

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

export default RelatedProject;
