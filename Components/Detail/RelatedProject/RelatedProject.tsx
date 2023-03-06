import styled from "styled-components";
import SwiperCore, { Navigation, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { useQuery } from "@tanstack/react-query";
import { findThumbnailInContent, getPostDate } from "@/utils/card";
import { useRouter } from "next/router";
import { getPostsByCategory } from "@/utils/APIs/supabase";
import { CardItem } from "@/Components/Common";
import SwiperPrevButton from "./SwiperPrevButton";
import SwiperNextButton from "./SwiperNextButton";

interface RelatedProjectProps {
  category: string;
}

/**
 * @TODO onReachEnd 이벤트를 사용하여
 * 슬라이드가 끝에 도달했을 때, 다음 정보를 불러오는 infinite scroll을 구현해야한다.
 * @TODO 디테일 페이지 서버통신 이후 연관 프로젝트를 불러오는 로직을 구현해야한다.
 */

const RelatedProject = ({ category }: RelatedProjectProps) => {
  SwiperCore.use([Navigation, Scrollbar]);

  const router = useRouter();

  const { data: relatedProjectsData } = useQuery(
    ["GET_RELATED_PROJECTS", category],
    () => getPostsByCategory(category),
    {
      staleTime: 1000 * 60 * 5,
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
            {relatedProjectsData?.data &&
              relatedProjectsData.data.map((post) => (
                <SwiperSlide key={post.id}>
                  <CardItemContainer
                    onClick={() => {
                      onClickCardItem(post.id);
                    }}
                  >
                    <CardItem
                      postId={post.id}
                      imageSrc={findThumbnailInContent(
                        post.thumbnail_check
                          ? post.title_background_image
                          : post.content
                      )}
                      imageAlt={`${post.title}썸네일`}
                      title={post.title}
                      subTitle={post.sub_title}
                      skills={post.skills}
                      date={getPostDate(post.created_at)}
                      comments={post.comment_count}
                      likes={post.like_count}
                      bookmarks={post.bookmark_count}
                      field={post.sub_category}
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
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray7};
`;

const RelatedProjectTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.gray2};
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
