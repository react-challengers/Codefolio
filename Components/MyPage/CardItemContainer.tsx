import styled from "styled-components";
import CardItem from "../Common/Card/CardItem";

const CardItemContainer = ({ itemList }: any) => {
  return (
    <CardListContainer>
      {itemList.map((item: any) => {
        const {
          imageSrc,
          imageAlt,
          tagItems,
          title,
          subTitle,
          date,
          likes,
          comments,
          field,
          linkURL,
        } = item;
        return (
          <CardItem
            key={item}
            imageSrc={imageSrc}
            imageAlt={imageAlt}
            tagItems={tagItems}
            title={title}
            subTitle={subTitle}
            date={date}
            likes={likes}
            comments={comments}
            field={field}
            linkURL={linkURL}
          />
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

export default CardItemContainer;
