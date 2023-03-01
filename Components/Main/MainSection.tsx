import { largeCategoryState, subCategoryState } from "@/lib/recoil";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import bottom_arrow from "@/public/icons/bottom_arrow.svg";
import { findThumbnailInContent, getPostDate } from "@/utils/card";
import { getAllPosts } from "@/utils/APIs/supabase";
import _ from "lodash";
import { CardItem } from "@/Components/Common";
import CategoryTag from "./CategoryTag";

// TODO: Tag 데이터 구조화 고민하기

interface MainSectionProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MainSection = ({ setIsModalOpen }: MainSectionProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const homeDropDownItems = ["최신순", "댓글순", "추천순"];
  const [selectedDropDownItem, setSelectedDropDownItem] = useState(
    homeDropDownItems[0]
  );
  const [selectedLargeCategory, setSelectedLargeCategory] =
    useRecoilState(largeCategoryState);
  const [selectedSubCategory, setSelectedSubCategory] =
    useRecoilState(subCategoryState);
  const router = useRouter();

  const { data: allPostsData } = useQuery<PostType[]>(["GET_POSTS"], {
    queryFn: getAllPosts,
  });

  const publicPosts = useMemo(() => {
    if (allPostsData === undefined) return [];
    return allPostsData.filter((post) => post.is_public === true);
  }, [allPostsData]);

  // 카테고리 선택 시, 해당 카테고리에 맞는 포스트만 보여주기
  const filterPosts = useMemo(() => {
    if (publicPosts === undefined) return [];

    if (selectedSubCategory.length !== 0) {
      return publicPosts.filter((post) =>
        selectedSubCategory.includes(post.sub_category)
      );
    }
    return publicPosts;
  }, [publicPosts, selectedSubCategory]);

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

  // 다른 페이지에 갔다가 다시 돌아왔을 시, 카테고리가 초기화 되도록 설정
  useEffect(() => {
    setSelectedLargeCategory([]);
    setSelectedSubCategory([]);
  }, [setSelectedLargeCategory, setSelectedSubCategory]);

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
          <Image src={bottom_arrow} alt="bottom_arrow" width={32} height={32} />
        </HomeDropDownButton>
        {isDropDownOpen && (
          <HomeDropDownList>
            {homeDropDownItems.map((item) => (
              <HomeDropDownItemContainer
                key={item}
                onClick={() => {
                  setSelectedDropDownItem(item);
                  setIsDropDownOpen(false);
                }}
              >
                <HomeDropDownItem>{item}</HomeDropDownItem>
              </HomeDropDownItemContainer>
            ))}
          </HomeDropDownList>
        )}
      </HomeDropDownContainer>
      <HomeCardGrid>
        {sortPosts?.map((post: PostType) => (
          <CardContainer
            key={post.id}
            onClick={() => {
              openModal(post.id);
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
  width: 100%;
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
  width: 100%;
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
  width: 5rem;

  &:hover {
    cursor: pointer;
  }
`;

const HomeDropDownList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 11rem;
  width: 7rem;
  background-color: white;
  border: 1px solid #e1e4e8;
  border-radius: 0.25rem;
  font-size: 1rem;
  gap: 0.5rem;
  z-index: 2;
`;

const HomeDropDownItemContainer = styled.div`
  &:hover {
    cursor: pointer;
    background-color: #f6f8fa;
  }
`;

const HomeDropDownItem = styled.li`
  margin: 0.5rem;
`;

const CardContainer = styled.div`
  cursor: pointer;
`;

export default MainSection;
