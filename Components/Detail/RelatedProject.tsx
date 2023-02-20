import styled from "styled-components";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { findThumbnailInContent, getPostDate } from "@/utils/card";
import { useRouter } from "next/router";
import CardItem from "../Common/Card/CardItem";
import SwiperPrevButton from "./SwiperPrevButton";
import SwiperNextButton from "./SwiperNextButton";

/**
 * @TODO onReachEnd 이벤트를 사용하여
 * 슬라이드가 끝에 도달했을 때, 다음 정보를 불러오는 infinite scroll을 구현해야한다.
 * @TODO 디테일 페이지 서버통신 이후 연관 프로젝트를 불러오는 로직을 구현해야한다.
 */

const RelatedProject = () => {
  SwiperCore.use([Navigation, Scrollbar]);

  const router = useRouter();

  const getRelatedProjects = async () => {
    const res = await supabase.from("post").select("*");

    if (res.error) {
      throw new Error(res.error.message);
    }

    return res.data;
  };

  const { data: relatedProjectsData } = useQuery<PostType[]>(
    ["GET_RELATED_PROJECTS"],
    {
      queryFn: getRelatedProjects,
    }
  );

  const onClickCardItem = (id: string) => {
    router.push(`/detail/${id}`);
  };
  return (
    <RelatedProjectContainer>
      <RelatedProjectTitle>연관 프로젝트</RelatedProjectTitle>
      <SwiperContainer>
        <SwiperWrapper>
          <Swiper
            modules={[Navigation, Scrollbar]}
            spaceBetween={20}
            slidesPerView={4}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            scrollbar={{ draggable: true }}
            // onReachEnd={() => console.log("end")}
          >
            <SwiperPrevButton />
            {relatedProjectsData?.map((post) => (
              <SwiperSlide key={post.id}>
                <CardItemContainer
                  onClick={() => {
                    onClickCardItem(post.id);
                  }}
                >
                  <CardItem
                    imageSrc={findThumbnailInContent(post.content)}
                    imageAlt={`${post.title}썸네일`}
                    title={post.title}
                    subTitle={post.sub_title}
                    tagItems={post.tag}
                    date={getPostDate(post.created_at)}
                    comments={post.comment_count}
                    likes={post.like_count}
                    field={`${post.large_category} | ${post.sub_category}`}
                    userId={post.user_id}
                  />
                </CardItemContainer>
              </SwiperSlide>
            ))}
            <SwiperNextButton />
          </Swiper>
        </SwiperWrapper>
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

const CardItemContainer = styled.div`
  cursor: pointer;
`;

export default RelatedProject;
