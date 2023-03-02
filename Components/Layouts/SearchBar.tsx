import { searchValueState } from "@/lib/recoil";
import Image from "next/image";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && event.nativeEvent.isComposing === false) {
      event.preventDefault();
      // 검색 시 해당 검색어로 검색 결과 페이지로 이동
    }
  };

  return (
    <SearchBarContainer>
      <SearchIcon
        src="/icons/search.svg"
        alt="검색 아이콘"
        width="24"
        height="24"
      />
      <SearchInput
        placeholder="검색"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onKeyDown={handleSearchKeyDown}
      />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  width: 25rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.gray7};
  border-radius: 0.5rem;
`;

const SearchIcon = styled(Image)`
  margin-left: 1.5625rem;
  margin-right: 0.875rem;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  padding-right: 1rem;
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body16}
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray5};
  }
`;

export default SearchBar;
