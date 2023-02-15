import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import ShowMoreModal from "./ShowMoreModal";

const DetailHeader = () => {
  const [showMore, setShowMore] = useState(false);

  const showMoreModal = () => setShowMore((prev) => !prev);

  return (
    <DetailHeaderContainer>
      <DetailHeaderWrapper>
        <Image src="/icons/like.svg" width={36} height={36} alt="좋아요 버튼" />
        <Image
          src="/icons/bookmark.svg"
          width={36}
          height={36}
          alt="북마크 버튼"
        />
        <Image
          src="/icons/more.svg"
          onClick={showMoreModal}
          width={36}
          height={36}
          alt="더보기 버튼"
        />
      </DetailHeaderWrapper>
      {showMore && <ShowMoreModal />}
    </DetailHeaderContainer>
  );
};

const DetailHeaderContainer = styled.div`
  width: 100%;
  position: relative;
  img {
    cursor: pointer;
  }
`;

const DetailHeaderWrapper = styled.div`
  height: 5rem;
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  padding-right: 2.5rem;
  gap: 1.875rem;
`;

export default DetailHeader;
