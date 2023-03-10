import { subCategoryState } from "@/lib/recoil";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { findThumbnailInContent, getPostDate } from "@/utils/card";
import getInfinitePosts from "@/utils/APIs/supabase/getInfinitePosts";
import _ from "lodash";
import { CardItem, DropDown } from "@/Components/Common";
import getAllPostsCount from "@/utils/APIs/supabase/getAllPostsCount";
import useOutsideClick from "@/hooks/query/useOutsideClick";
import useIntersect from "@/hooks/common/useIntersect";
import useIsMobile from "@/hooks/common/useIsMobile";
import CategoryTag from "./CategoryTag";
import HomeDropDownIcon from "./HomeDropDownIcon";
import "react-loading-skeleton/dist/skeleton.css";
import SelectField from "../Mobile/SelectField";
import TopButton from "../Common/TopButton";
import EmptyCategory from "../Layouts/EmptyContent";

// TODO: Tag 데이터 구조화 고민하기

interface MainSectionProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MainSection = ({ setIsModalOpen }: MainSectionProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const homeDropDownItems = ["최신순", "추천순", "댓글순"];
  const [selectedDropDownItem, setSelectedDropDownItem] = useState(
    homeDropDownItems[0]
  );

  const homeDropDownRef = useRef<HTMLUListElement>(null);
  useOutsideClick(homeDropDownRef, () => setIsDropDownOpen(false));

  const [selectedSubCategory, setSelectedSubCategory] =
    useRecoilState(subCategoryState);
  const router = useRouter();
  const isMobile = useIsMobile();

  // 총 post 개수를 갖고 옵니다.
  const { data: allPostsDataCount, isFetching: isFetchingCount } = useQuery(
    ["GET_POSTSCOUNT"],
    getAllPostsCount
  );

  const [page, setPage] = useState(1);
  const [targetState, setTargetState] = useState(false);

  const {
    data: allPostsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(["GET_INFINIFEPOSTS"], getInfinitePosts, {
    getNextPageParam: () => {
      return page;
    },
    onSuccess(data) {
      setPage((prev) => prev + 1);
      setTargetState(true);
    },
  });

  const ref = useIntersect(async (entry, observer) => {
    const perPage = 12;
    observer.unobserve(entry.target);
    if (
      hasNextPage &&
      !isFetching &&
      !isFetchingCount &&
      allPostsData &&
      allPostsDataCount
    ) {
      if (page < (allPostsDataCount + perPage) / perPage) {
        setTargetState(false);
        await fetchNextPage();
      }
    }
  });

  const filterPosts = useMemo(() => {
    if (allPostsData?.pages.flat() === undefined) return [];

    if (selectedSubCategory.length !== 0) {
      return allPostsData?.pages
        .flat()
        .filter((post: PostType) =>
          selectedSubCategory.includes(post.sub_category)
        );
    }
    return allPostsData?.pages.flat();
  }, [allPostsData, selectedSubCategory]);

  // 포스트 정렬
  const sortPosts = useMemo(() => {
    if (filterPosts.length === 0) return [];
    switch (selectedDropDownItem) {
      case "최신순":
        return _.orderBy(filterPosts, ["created_at"], ["desc"]);
      case "댓글순":
        return _.orderBy(filterPosts, ["comment_count"], ["desc"]);
      case "추천순":
        return _.orderBy(filterPosts, ["like_count"], ["desc"]);
      default:
        return filterPosts;
    }
  }, [filterPosts, selectedDropDownItem]);

  useEffect(() => {
    if (router.query.id) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [router.query.id, setIsModalOpen, allPostsData]);

  const onClickDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const openModal = (id: string) => {
    router.push(
      {
        query: {
          id,
        },
      },
      undefined,
      { shallow: false }
    );
    setIsModalOpen(true);
  };

  const onClickDeleteCategory = (category: string) => {
    setSelectedSubCategory(
      selectedSubCategory.filter((item) => item !== category)
    );
  };

  const onClickDropDownHandler = (item: string) => {
    setSelectedDropDownItem(item);
    setIsDropDownOpen(false);
  };

  // 다른 페이지에 갔다가 다시 돌아왔을 시, 카테고리가 초기화 되도록 설정
  useEffect(() => {
    setSelectedSubCategory([]);
  }, [setSelectedSubCategory]);

  const onClickPostHandler = (postId: string) => {
    if (!isMobile) {
      return openModal(postId);
    }
    return router.push(`/detail/${postId}`);
  };

  return (
    <HomeMainContainer isMobile={isMobile}>
      <div>
        {!isMobile && (
          <TagContainer>
            {selectedSubCategory.length !== 0 &&
              selectedSubCategory.map((category) => (
                <CategoryTag
                  category={category}
                  key={category}
                  deleteHandler={onClickDeleteCategory}
                />
              ))}
          </TagContainer>
        )}
        <HomeDropDownContainer>
          <HomeDropDownButton
            onClick={() => {
              onClickDropDown();
            }}
          >
            {selectedDropDownItem}
            <HomeDropDownIcon />
          </HomeDropDownButton>
          {isDropDownOpen && (
            <HomeDropDownList ref={homeDropDownRef}>
              {homeDropDownItems.map((item) => (
                <DropDown
                  item={item}
                  key={item}
                  onClickHandler={onClickDropDownHandler}
                />
              ))}
            </HomeDropDownList>
          )}
        </HomeDropDownContainer>
      </div>
      {isLoading && (
        <HomeCardGrid>
          {new Array(12).fill(null).map((v, index) => (
            <SkeletonTheme key={index} baseColor="#333" highlightColor="#555">
              <div>
                <Skeleton width={300} height={180} />
                <Skeleton width={50} height={18} style={{ marginTop: 10 }} />
                <Skeleton width="100%" height={24} style={{ marginTop: 10 }} />
                <Skeleton width="100%" height={24} style={{ marginTop: 10 }} />
                <Tags>
                  <Skeleton width={60} height={22} style={{ marginTop: 10 }} />
                  <Skeleton width={60} height={22} style={{ marginTop: 10 }} />
                  <Skeleton width={60} height={22} style={{ marginTop: 10 }} />
                  <Skeleton width={60} height={22} style={{ marginTop: 10 }} />
                </Tags>
              </div>
            </SkeletonTheme>
          ))}
        </HomeCardGrid>
      )}
      {!isLoading && (
        <HomeCardGrid>
          {sortPosts &&
            sortPosts.map((post: PostType) => (
              <CardContainer
                key={post.id}
                onClick={() => {
                  onClickPostHandler(post.id);
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
                  field={`${post.sub_category}`}
                  userId={post.user_id}
                />
              </CardContainer>
            ))}
          {targetState && <Target ref={ref} />}
        </HomeCardGrid>
      )}
      {filterPosts.length === 0 && <EmptyCategory />}
      {!isMobile && <TopButton right="1rem" bottom="1rem" />}
    </HomeMainContainer>
  );
};

const Target = styled.div`
  height: 1px;
`;
const HomeMainContainer = styled.main<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  width: 65vw;
  min-height: 65rem;
  margin-left: 1.5rem;
  margin-top: 3rem;

  ${({ isMobile }) => isMobile && "margin: 0.75rem 0; gap: 3rem;"}
  @media (max-width: 1260px) {
    width: 50vw;
  }
`;

const TagContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  height: 2.375rem;
`;

const HomeCardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const HomeDropDownContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const HomeDropDownButton = styled.div`
  display: flex;
  align-items: center;
  width: 4rem;

  ${({ theme }) => theme.fonts.body14}
  color: ${({ theme }) => theme.colors.gray4};

  svg {
    margin-left: 0.5rem;
  }

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary6};

    path {
      fill: ${({ theme }) => theme.colors.primary6};
    }
  }
`;

const HomeDropDownList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 29rem;
  width: 11.25rem;

  background-color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.fonts.body14};
  color: ${({ theme }) => theme.colors.white};

  border-radius: 0.25rem;
  filter: drop-shadow(0 0.625rem 0.625rem rgba(0, 0, 0, 0.5));
  z-index: 2;

  @media (max-width: 768px) {
    top: 6rem;
  }
`;

const CardContainer = styled.div`
  cursor: pointer;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export default MainSection;
