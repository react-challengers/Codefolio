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
  const isEmptySearchValue = router.asPath === ("/search?q=" as string);

  const handleClickSearchIcon = () => {
    router.push(`/search?q=${searchValue}`);
  };

  const handleSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && event.nativeEvent.isComposing === false) {
      router.push(`/search?q=${searchValue}`);
    }
  };

  return (
    <SearchBarContainer
      isMobile={isMobile}
      isEmptySearchValue={isEmptySearchValue}
    >
      <SearchIcon
        src="/icons/search.svg"
        alt="검색 아이콘"
        width="24"
        height="24"
        onClick={handleClickSearchIcon}
      />

      <SearchInput
        isEmptySearchValue={isEmptySearchValue}
        isMobile={isMobile}
        placeholder="검색어 입력후 Enter를 눌러주세요"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        onKeyDown={handleSearchKeyDown}
      />

      {isEmptySearchValue && (
        <Image
          src="/icons/close.svg"
          alt="검색창 닫기 아이콘"
          width="24"
          height="24"
          onClick={() => setSearchValue("")}
        />
      )}
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled.div<{
  isMobile: boolean;
  isEmptySearchValue: boolean;
}>`
  display: flex;
  align-items: center;
  width: 25rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.gray7};
  border-radius: 0.5rem;

  ${({ isMobile }) =>
    isMobile && "background-color: transparent; width: 18.75rem;"};
  ${({ isMobile, isEmptySearchValue, theme }) =>
    isMobile &&
    isEmptySearchValue &&
    `background-color: ${theme.colors.gray10} !important; padding: 0.25rem;`}

  &:focus-within {
    background-color: ${({ theme }) => theme.colors.gray6};
  }
`;

const SearchIcon = styled(Image)`
  margin-left: 1.5625rem;
  margin-right: 0.875rem;
  cursor: pointer;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const SearchInput = styled.input<{
  isMobile: boolean;
  isEmptySearchValue: boolean;
}>`
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
  ${({ isMobile }) => isMobile && "display: none;"}
  ${({ isEmptySearchValue }) =>
    isEmptySearchValue && "display: block; width: 100%; padding: 0"}
`;

export default SearchBar;
