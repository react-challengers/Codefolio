import { CardItem, DropDown, LongButton } from "@/Components/Common";
import HomeDropDownIcon from "@/Components/Main/HomeDropDownIcon";
import supabase from "@/lib/supabase";
import { findThumbnailInContent, getPostDate } from "@/utils/card";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { SyncLoader } from "react-spinners";
import styled from "styled-components";

const queryFn = async (query: string) => {
  const res = await supabase
    .from("post")
    .select("*")
    .ilike("title", `%${query}%`);

  return res.data;
};

const Search: NextPage = () => {
  const router = useRouter();
  const query = router.query.q;
  const dropDownItems = ["최신순", "추천순", "댓글순"];
  const [selectedDropDownItem, setSelectedDropDownItem] = useState(
    dropDownItems[0]
  );
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { data, isLoading } = useQuery(["search", query], () =>
    queryFn(query as string)
  );

  const sortPosts = useMemo(() => {
    if (data?.length === 0) return [];
    switch (selectedDropDownItem) {
      case "최신순":
        return _.orderBy(data, ["created_at"], ["desc"]);
      case "댓글순":
        return _.orderBy(data, ["comment_count"], ["desc"]);
      case "추천순":
        return _.orderBy(data, ["like_count"], ["desc"]);
      default:
        return data;
    }
  }, [data, selectedDropDownItem]);

  const onClickDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const onClickDropDownHandler = (item: string) => {
    setSelectedDropDownItem(item);
    setIsDropDownOpen(false);
  };

  const goToHome = () => {
    router.push("/");
  };

  if (isLoading)
    return <Loader color="#3DDFE9" margin={4} size={16} speedMultiplier={1} />;

  if (data?.length === 0)
    return (
      <EmptySearchResult>
        <EmptyText>&lsquo;{query}&rsquo;에 대한 검색결과가 없습니다.</EmptyText>
        <LongButton onClick={goToHome}>홈으로 가기</LongButton>
      </EmptySearchResult>
    );

  return (
    <SearchContainer>
      <SearchInfo>
        &lsquo;{query}&rsquo;에 대해 {data?.length}건의 검색결과가 있습니다.
      </SearchInfo>
      <DropDownContainer>
        <DropDownButton
          onClick={() => {
            onClickDropDown();
          }}
        >
          {selectedDropDownItem}
          <HomeDropDownIcon />
        </DropDownButton>
        {isDropDownOpen && (
          <DropDownList>
            {dropDownItems.map((item) => (
              <DropDown
                item={item}
                key={item}
                onClickHandler={onClickDropDownHandler}
              />
            ))}
          </DropDownList>
        )}
      </DropDownContainer>
      <CardGrid>
        {sortPosts?.map((post) => (
          <CardItem
            key={post.id}
            postId={post.id}
            imageSrc={findThumbnailInContent(
              post.thumbnail_check ? post.title_background_image : post.content
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
        ))}
      </CardGrid>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 98.75rem;
  margin: 0 auto;
  min-height: 56rem;
`;

const Loader = styled(SyncLoader)`
  position: fixed !important;
  top: 50%;
  left: 50%;
`;

const SearchInfo = styled.span`
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.white};
  margin: 5rem 0 2.25rem 0;
`;

const DropDownContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const DropDownButton = styled.div`
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

const DropDownList = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 13.75rem;
  width: 11.25rem;

  background-color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.fonts.body14};
  color: ${({ theme }) => theme.colors.white};

  border-radius: 0.25rem;
  filter: drop-shadow(0 0.625rem 0.625rem rgba(0, 0, 0, 0.5));
  z-index: 2;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  width: 100%;
  margin-top: 1rem;
`;

const EmptySearchResult = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.75rem;
  margin: 25rem auto;
  width: fit-content;
`;

const EmptyText = styled.span`
  ${({ theme }) => theme.fonts.title24};
  color: ${({ theme }) => theme.colors.gray2};
`;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.q;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["search", query], () =>
    queryFn(query as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Search;
