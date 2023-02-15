import styled from "styled-components";

/**
 * @TODO Set 자료형으로 리팩토링하기. 중복을 막아야 합니다.
 * 1. Set에는 순회하는 메서드를 찾아야 합니다.
 * 2. 메서드 찾아주시면 PR에 추가 커밋으로 반영하겠습니다.
 *
 * @TODO size: "sm" | "lg" | "md"; 추가하기
 * 동작하는 로직을 추가할 때는 여기로 추가합니다.
 * 아이콘 클릭에 삭제, 태그 클릭에 추가...
 *
 * @TODO 태그 길이 초과하면 줄바꿈 처리 안 하고 보이는 마지막 태그만(...) 표시하기
 * 현재는 아래와 같은 문제가 있습니다.
 * Components API  TDD  애자일 익스트림 프로그래밍
 * Compo...   A... T... 애... 익스트림 프...
 * 가로 스크롤로 처리하는 방안도 있습니다.
 */

type TagSizeType = "sm" | "md" | "lg";

interface TagsProps {
  tagItems: string[];
  size?: TagSizeType;
}

const tagSizeSwitch = (size: TagSizeType) => {
  switch (size) {
    case "sm":
      return `
        font-size: 0.75rem;
        padding: 0.25rem 0.5rem;
        border-radius: 0.75rem;
      `;
    case "lg":
      return `
        font-size: 1.125rem;
        padding: 0.625rem 1.625rem;
        border-radius: 1.125rem;
      `;
    case "md":
      return `
        font-size: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
      `;
    default:
      return `
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 0.75rem;
    `;
  }
};

/**
 * 문자열만 들어간 Array만 Props로 받습니다.
 * li태그를 styled 컴포넌트로 활용하지 않은 이유는 key가 없기 때문입니다.
 * @param size 태그의 크기를 설정합니다. sm, md, lg
 */

const Tags = ({ tagItems, size }: TagsProps) => {
  return (
    <TagsContainer>
      {tagItems.map((item) => (
        <TagsItem key={item} size={size}>
          {item}
        </TagsItem>
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
  size: TagSizeType;
};

const TagsItem = styled.li<TagsItemType>`
  background-color: #999999;
  color: #f2f2f2;
  /* font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.75rem; */
  ${(props) => tagSizeSwitch(props.size)}
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default Tags;
