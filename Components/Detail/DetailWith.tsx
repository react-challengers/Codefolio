import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import DetailBox from "./DetailBox";

export interface DetailWithProps {
  name: string;
  field: string;
  github: string;
}

const DetailWith = ({ name, field, github }: DetailWithProps) => {
  return (
    <DetailWithContainer>
      <p>{name}</p>
      <DetailBox>{field}</DetailBox>
      <Link href={github || ""}>
        <GithubImage
          src="/icons/github.svg"
          width={20}
          height={20}
          alt="깃허브 주소"
        />
      </Link>
    </DetailWithContainer>
  );
};

const DetailWithContainer = styled.div`
  color: #666;
  font-size: 0.8125rem;
  text-align: center;

  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1.2fr 1fr;
`;

const GithubImage = styled(Image)`
  width: 100%;
  cursor: pointer;
`;

export default DetailWith;
