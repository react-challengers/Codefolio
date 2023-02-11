import styled from "styled-components";
import CardItem from "../Common/Card/CardItem";

// const CardItemContainer = ({ itemList }: PostType[]) => {
const CardItemContainer = ({ itemList }: any[]) => {
  return (
    <CardListContainer>
      {itemList.map((item: any) => (
        <CardItem
          key={item}
          imageSrc="OK-LGTM.png"
          imageAlt="Test"
          tagItems={["Components", "API"]}
          title="React Profiler API로 컴포넌트 측정하기"
          subTitle="조금씩 추상화하면서 설계하기"
          date="2023.02.10"
          likes={203}
          comments={57}
          field="WEB"
          linkURL={`/detail/${1}`}
        />
      ))}
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
