import { postMembers, postMembersVaildate } from "@/lib/recoil";
import Image from "next/image";
import { ChangeEvent, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import trash_can from "@/public/icons/trash_can.svg";
import { useUserProfile } from "@/hooks/query";
import { HelperTextBox } from "@/Components/Common";

/**
 * @TODO withPeople logic 확정 후에 유효성 검사 추가 확인 필요
 */

const WithPeople = () => {
  const [people, setPeople] = useRecoilState(postMembers);

  // recoil validate state
  const membersVaildate = useRecoilValue(postMembersVaildate);

  // github 추가해야 함
  const {
    profileData: { user_name: userName, field: userField, github: userGithub },
    isLoading,
  } = useUserProfile();

  useEffect(() => {
    if (!userField || userField.length === 0) {
      setPeople([{ name: userName, field: "", github: userGithub }]);
      return;
    }
    setPeople([
      { name: userName, field: userField.join(), github: userGithub },
    ]);
  }, [userName]);

  const addPerson = () => {
    if (people.length === 0) {
      setPeople([...people, { name: "", field: "", github: "" }]);
    } else {
      const lastPerson = people[people.length - 1];
      if (lastPerson.name && lastPerson.field && lastPerson.github) {
        setPeople([...people, { name: "", field: "", github: "" }]);
      }
    }
  };

  const changePerson =
    (idx: number, property: "name" | "field" | "github") =>
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      const newPeople = people.map((person, i) => {
        if (i === idx) return { ...person, [property]: value };
        return person;
      });
      setPeople(newPeople);
    };

  const onDelete = (idx: number) => () => {
    const newPeople = people.filter((_, i) => i !== idx);
    setPeople(newPeople);
  };

  // TODO: 로딩 스피너 변경
  if (isLoading) return null;

  return (
    <WithPeopleContainer>
      {people.map((person, idx) => (
        <InputWrapper key={idx}>
          <HelperTextContainer>
            <InputStyle
              placeholder="이름"
              value={person.name}
              onChange={changePerson(idx, "name")}
              maxLength={5}
            />
            <HelperTextBox text={membersVaildate} />
          </HelperTextContainer>

          <HelperTextContainer>
            <InputStyle
              placeholder="참여 포지션"
              value={person.field}
              onChange={changePerson(idx, "field")}
              maxLength={11}
            />
            <HelperTextBox text={membersVaildate} />
          </HelperTextContainer>
          <HelperTextContainer>
            <InputStyle
              placeholder="https://github.com/user"
              value={person.github}
              onChange={changePerson(idx, "github")}
            />
            <HelperTextBox text={membersVaildate} />
          </HelperTextContainer>
          <CancelButton
            onClick={onDelete(idx)}
            src={trash_can}
            alt="취소 버튼"
            width="24"
            height="24"
          />
        </InputWrapper>
      ))}
      <AddButton onClick={addPerson}>+ 추가</AddButton>
    </WithPeopleContainer>
  );
};

const WithPeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0.625rem 0;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 1rem;
  &:first-child {
    & > input:first-child {
      border-radius: 0.25rem;
      color: ${({ theme }) => theme.colors.gray3};
      background-color: ${({ theme }) => theme.colors.gray5};
    }
    & > img {
      display: none;
    }
  }
`;

const InputStyle = styled.input`
  border: none;
  outline: none;
  border-bottom: 0.0625rem solid grey;
  padding: 0.625rem 1.25rem;
  box-sizing: border-box;
  background-color: transparent;
  ${({ theme }) => theme.fonts.body14Medium}
  color: ${({ theme }) => theme.colors.white};
  ::placeholder {
    ${({ theme }) => theme.fonts.body14}
    color: ${({ theme }) => theme.colors.gray6};
  }
`;

const AddButton = styled.button`
  all: unset;
  cursor: pointer;
  width: 3.75rem;
  display: inline-block;
  ${({ theme }) => theme.fonts.body14}
  color: ${({ theme }) => theme.colors.gray4};
`;

const CancelButton = styled(Image)`
  position: absolute;
  right: -2.25rem;
  padding: 0.125rem;
  margin-bottom: 2.5rem;
  cursor: pointer;
`;

const HelperTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default WithPeople;
