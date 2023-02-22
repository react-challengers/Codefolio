import { useUserProfile } from "@/hooks/query";
import { myPageBirthYear, myPageCareer } from "@/lib/recoil";
import BASE_YEAR from "@/utils/constant";
import { useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

/**
 * @TODO 결합도 낮추기
 * career와 birthYear 2가지 유스케이스만 대응하는 컴포넌트입니다.
 * 비즈니스 로직은 호출한 공용컴포넌트 내부에 있을 필요가 없습니다.
 * UI에 대한 책임만 갖고 있어야 합니다.
 */

type ComponentType = "birth_year" | "career";

interface DropDownProps {
  type: ComponentType;
}

const DropDown = ({ type }: DropDownProps) => {
  const options: (string | number)[] = [];

  const { profileData } = useUserProfile();

  const [birthYear, setBirthYear] = useRecoilState(myPageBirthYear);
  const [career, setCareer] = useRecoilState(myPageCareer);

  useEffect(() => {
    setBirthYear(profileData.birth_year ?? new Date().getFullYear());
    setCareer(profileData.career ?? "신입");
  }, [setBirthYear, setCareer, profileData.birth_year, profileData.career]);

  const years = Array.from(
    { length: new Date().getFullYear() - BASE_YEAR + 1 },
    (_, i) => {
      return new Date().getFullYear() - i;
    }
  );

  if (type === "birth_year") {
    years.forEach((year) => options.push(year));
  }

  if (type === "career") {
    options.push("신입");
    for (let i = 1; i < 20; i += 1) {
      options.push(`${i}년차`);
    }
    options.push("20년차 이상");
  }

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (type === "birth_year") {
      setBirthYear(+e.target.value);
    }
    if (type === "career") {
      setCareer(e.target.value);
    }
  };

  useEffect(() => {
    if (type === "birth_year") setBirthYear(years[0]);
    if (type === "career") setCareer("신입");
  }, []);

  return (
    <Select
      onChange={onChangeHandler}
      defaultValue={type === "birth_year" ? birthYear : career}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

const Select = styled.select`
  height: 3.5rem;
  width: 19.0625rem;
  padding: 0.75rem;

  color: inherit;
  &:focus {
    background-color: #eee;
  }
`;

export default DropDown;
