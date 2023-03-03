import { subCategoryState } from "@/lib/recoil";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { findThumbnailInContent, getPostDate } from "@/utils/card";
import { getAllPosts } from "@/utils/APIs/supabase";
import _ from "lodash";
import { CardItem, DropDown } from "@/Components/Common";
import CategoryTag from "./CategoryTag";
import HomeDropDownIcon from "./HomeDropDownIcon";
import "react-loading-skeleton/dist/skeleton.css";

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

  const [selectedSubCategory, setSelectedSubCategory] =
    useRecoilState(subCategoryState);
  const router = useRouter();

  const { data: allPostsData, isLoading } = useQuery<PostType[]>(
    ["GET_POSTS"],
    {
      queryFn: getAllPosts,
    }
  );

  // 카테고리 선택 시, 해당 카테고리에 맞는 포스트만 보여주기
  const filterPosts = useMemo(() => {
    if (allPostsData === undefined) return [];

    if (selectedSubCategory.length !== 0) {
      return allPostsData.filter((post) =>
        selectedSubCategory.includes(post.sub_category)
      );
    }
    return allPostsData;
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
  }, [router.query.id, setIsModalOpen]);

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

  return (
    <HomeMainContainer>
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
          <HomeDropDownList>
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
      <HomeCardGrid>
        {isLoading &&
          new Array(12).fill(null).map((v, index) => (
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
        {sortPosts?.map((post: PostType) => (
          <CardContainer
            key={post.id}
            onClick={() => {
              openModal(post.id);
            }}
          >
            <CardItem
              postId={post.id}
              imageSrc={findThumbnailInContent(post.content)}
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
      </HomeCardGrid>
    </HomeMainContainer>
  );
};

const HomeMainContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 78.75rem;
  max-width: 78.75rem;
  margin-left: 1.5rem;
  margin-top: 3rem;
`;

const TagContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.5rem;
  height: 2.375rem;
`;

const HomeCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  width: 78.75rem;
  margin-top: 1rem;
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
  top: 11rem;
  width: 11.25rem;

  background-color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.fonts.body14};
  color: ${({ theme }) => theme.colors.white};

  border-radius: 0.25rem;
  filter: drop-shadow(0px 0.625rem 0.625rem rgba(0, 0, 0, 0.5));
  z-index: 2;
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
