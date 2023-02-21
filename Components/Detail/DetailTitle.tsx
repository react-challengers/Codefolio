import { myPageBackgroundColor } from "@/lib/recoil";
import styled from "styled-components";
import { useEffect, useState } from "react";

interface DetailTitleProps {
  title: string;
  subtitle: string;
  backgroundColor: string;
  field: string;
  subCategory: string;
}

const DetailTitle = ({
  title,
  subtitle,
  backgroundColor,
  field,
  subCategory,
}: DetailTitleProps) => {
  const [titleColor, setTitleColor] = useState("black");

  useEffect(() => {
    const getTextColorByBackgroundColor = (hexColor: string) => {
      const colorToNumber = hexColor.substring(1); // 색상 앞의 # 제거
      const rgb = parseInt(colorToNumber, 16); // rrggbb를 10진수로 변환

      // eslint-disable-next-line no-bitwise
      const r = (rgb >> 16) & 0xff; // red 추출
      // eslint-disable-next-line no-bitwise
      const g = (rgb >> 8) & 0xff; // green 추출
      // eslint-disable-next-line no-bitwise
      const b = (rgb >> 0) & 0xff; // blue 추출
      const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
      // 색상 선택

      if (luma < 127.5) setTitleColor("white");
      else setTitleColor("black");
      // http://yoonbumtae.com/?p=2977 참고사이트
    };
    getTextColorByBackgroundColor(backgroundColor);
  }, [backgroundColor]);

  return (
    <DetailTitleContainer backgroundColor={backgroundColor}>
      <DetailTitleHeader>
        {field} {">"} {subCategory}
      </DetailTitleHeader>
      <DetailTitleText titleColor={titleColor}>
        <h1>{title}</h1>
        <h3>{subtitle}</h3>
      </DetailTitleText>
    </DetailTitleContainer>
  );
};

const DetailTitleContainer = styled.div<{ backgroundColor: string }>`
  width: 100%;
  height: 16.25rem;
  padding: 1.5rem 8.75rem 2.5rem 8.75rem;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DetailTitleHeader = styled.p`
  color: #b3b3b3;
`;

const DetailTitleText = styled.div<{ titleColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
  h1 {
    color: ${({ titleColor }) => titleColor};
    font-size: 2rem;
    font-weight: 700;
  }
  h3 {
    font-size: 1.25rem;
    color: #999999;
  }
`;

export default DetailTitle;
