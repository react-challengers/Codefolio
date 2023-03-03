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

interface TagsProps {
  tagItems: string[];
  color?: "primary6" | "white";
}

const Tags = ({ tagItems, color = "primary6" }: TagsProps) => {
  return (
    <TagsContainer>
      {tagItems?.map((item) => (
        <TagsItem key={item} color={color}>
          {item}
        </TagsItem>
      ))}
    </TagsContainer>
  );
};

const TagsContainer = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

interface TagsItemProps {
  color: "primary6" | "white";
}

const TagsItem = styled.li<TagsItemProps>`
  ${({ theme }) => theme.fonts.body13En};
  color: ${({ theme, color }) => theme.colors[color]};
  background-color: ${({ theme }) => theme.colors.gray8};

  padding: 0.25rem 0.5rem;
  height: 1.375rem;
  border-radius: 0.25rem;
`;

export default Tags;
