import styled from "styled-components";

/**
 * @TODO Set 자료형으로 리팩토링하기. 중복을 막아야 합니다.
 * Set에는 순회하는 메서드를 찾아야 합니다.
 * 메서드 찾아주시면 PR에 추가 커밋으로 반영하겠습니다.
 */

interface TagsProps {
  TagsItems: string[];
}

/**
 * 문자열만 들어간 Array만 Props로 받습니다.
 * li태그를 styled 컴포넌트로 활용하지 않은 이유는 key가 없기 때문입니다.
 */
const Tags = ({ TagsItems }: TagsProps) => {
  return (
    <TagsContainer>
      {TagsItems.map((item) => (
        <TagsItem key={item}>{item}</TagsItem>
      ))}
    </TagsContainer>
  );
};

const TagsContainer = styled.ul`
  display: flex;
  gap: 0.25rem;
`;

type TagsItemType = {
  key: string;
};

const TagsItem = styled.li<TagsItemType>`
  background-color: #999999;
  color: #f2f2f2;
  font-size: 0.75rem;
  padding: 0 0.5rem 0.25rem;
  border-radius: 0.75rem;
`;

export default Tags;
