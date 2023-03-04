import { findThumbnailInContent, getPostDate } from "@/utils/card";
import { useRouter } from "next/router";
import styled from "styled-components";
import { CardItem } from "@/Components/Common";

interface CardItemContainerProps {
  itemList: PostType[];
}

const CardItemContainer = ({ itemList }: CardItemContainerProps) => {
  const router = useRouter();

  const onClickCardItem = (id: string) => {
    router.push(`/detail/${id}`);
  };

  return (
    <CardListContainer>
      {itemList.map((post: PostType) => {
        return (
          <CardItemWrapper
            key={post.id}
            onClick={() => onClickCardItem(post.id)}
          >
            <CardItem
              postId={post.id}
              imageSrc={findThumbnailInContent(post.title_background_image)}
              imageAlt={`${post.title}썸네일`}
              title={post.title}
              subTitle={post.sub_title}
              skills={post.skills}
              date={getPostDate(post.created_at)}
              comments={post.comment_count}
              likes={post.like_count}
              bookmarks={post.bookmark_count}
              field={`${post.large_category} | ${post.sub_category}`}
              userId={post.user_id}
            />
          </CardItemWrapper>
        );
      })}
    </CardListContainer>
  );
};

const CardListContainer = styled.div`
  margin-top: 1.75rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1.5rem;
  grid-row-gap: 3.25rem;
`;

const CardItemWrapper = styled.div`
  cursor: pointer;
`;

export default CardItemContainer;
