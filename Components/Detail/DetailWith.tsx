import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import DetailBox from "./DetailBox";

interface DetailWithProps {
  name: string;
  field: string;
  github: string;
}

const DetailWith = ({ name, field, github }: DetailWithProps) => {
  const router = useRouter();

  return (
    <DetailWithContainer>
      <p>{name}</p>
      <DetailBox>{field}</DetailBox>
      <GithubImage
        src="/icons/github.svg"
        onClick={() => router.push(github)}
        width={20}
        height={20}
        alt="깃허브 주소"
      />
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
