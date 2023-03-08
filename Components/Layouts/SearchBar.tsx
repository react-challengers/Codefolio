import useIsMobile from "@/hooks/common/useIsMobile";
import { searchValueState } from "@/lib/recoil";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const SearchBar = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [searchValue, setSearchValue] = useRecoilState(searchValueState);

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && event.nativeEvent.isComposing === false) {
      router.push(`/search?q=${searchValue}`);
    }
  };

  return (
    <SearchBarContainer>
      <SearchIcon
        src="/icons/search.svg"
        alt="검색 아이콘"
        width="24"
        height="24"
        onClick={() => router.push(`/search?q=${searchValue}`)}
      />
      {!isMobile && (
        <SearchInput
          placeholder="검색"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
      )}
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

  &:focus-within {
    background-color: ${({ theme }) => theme.colors.gray6};
  }

  @media (max-width: 768px) {
    background: none;
    width: 100%;
  }
`;

const SearchIcon = styled(Image)`
  margin-left: 1.5625rem;
  margin-right: 0.875rem;

  @media (max-width: 768px) {
    margin: 0;
    cursor: pointer;
  }
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
