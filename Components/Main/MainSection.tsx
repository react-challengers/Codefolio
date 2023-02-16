import { largeCategoryState, subCategoryState } from "@/lib/recoil";
import Image from "next/image";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import supabase from "@/lib/supabase";
import type { PostType } from "@/types";
import bottom_arrow from "@/public/icons/bottom_arrow.svg";
import Tags from "../Common/Tags";
import CardItem from "../Common/Card/CardItem";

// TODO: Tag 데이터 구조화 고민하기

interface MainSectionProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const MainSection = ({ setIsModalOpen }: MainSectionProps) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const homeDropDownItems = ["최신순", "조회순", "추천순"];
  const [selectedDropDownItem, setSelectedDropDownItem] = useState(
    homeDropDownItems[0]
  );
  const [selectedLargeCategory, setSelectedLargeCategory] =
    useRecoilState(largeCategoryState);
  const [selectedSubCategory, setSelectedSubCategory] =
    useRecoilState(subCategoryState);
  const router = useRouter();

  const getAllPosts = async () => {
    const res = await supabase.from("post").select("*");
    if (res.error) {
      throw new Error(res.error.message);
    }
    return res.data;
  };

  const { data: allPostsData, error: allPostsError } = useQuery<PostType[]>(
    ["GET_POSTS"],
    {
      queryFn: getAllPosts,
    }
  );

  useEffect(() => {
    if (router.query.id) {
      setIsModalOpen(true);
    }
  }, [router.query.id, setIsModalOpen]);

  const onClickDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  // 다른 페이지에 갔다가 다시 돌아왔을 시, 카테고리가 초기화 되도록 설정
  useEffect(() => {
    setSelectedLargeCategory([]);
    setSelectedSubCategory([]);
  }, [setSelectedLargeCategory, setSelectedSubCategory]);

  const findThumbnailInContent = (content: string) => {
    // https://xxfgrnzupwpguxifhwsq.supabase.co/storage/v1/object/public/post-image/a6b4c159-e98f-4762-a6bb-dbf64f6ccc94 형식이 포함된 첫번째 url을 찾는다.
    const regex =
      /https:\/\/[a-z0-9]+\.supabase\.co\/storage\/v1\/object\/public\/post-image\/[a-z0-9-]+/g;
    const result = content.match(regex);
    if (result) {
      return result[0];
    }
    return "/images/anonImage.png";
  };

  const getPostDate = (date: string) => {
    const postDate = new Date(date);
    const year = postDate.getFullYear();
    const month = postDate.getMonth() + 1;
    const day = postDate.getDate();
    return `${year}.${month}.${day}`;
  };

  return (
    <HomeMainContainer>
      <TagContainer>
        {selectedLargeCategory.length !== 0 &&
          selectedSubCategory.length !== 0 && (
            <Tags tagItems={selectedSubCategory} size="md" />
          )}
        {selectedLargeCategory.length !== 0 &&
          selectedSubCategory.length === 0 && (
            <Tags tagItems={selectedLargeCategory} size="lg" />
          )}
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
        {allPostsData?.map((post: PostType) => (
          <CardContainer
            key={post.id}
            onClick={() => {
              router.push(
                {
                  query: {
                    id: post.id,
                  },
                },
                undefined,
                { shallow: true }
              );
              setIsModalOpen(true);
            }}
          >
            <CardItem
              imageSrc={findThumbnailInContent(post.content)}
              imageAlt={`${post.title}썸네일`}
              title={post.title}
              subTitle={post.sub_title}
              tagItems={post.tag}
              date={getPostDate(post.created_at)}
              // TODO: comments, likes 수 구하기
              comments={100}
              likes={100}
              field={`${post.large_category} | ${post.sub_category}`}
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
  max-width: 75rem;
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
  z-index: 1;
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
