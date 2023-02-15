import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export interface WithPersonType {
  name: string;
  field: string;
  github: string;
}

interface WithPeopleProps {
  people: WithPersonType[];
  setPeople: Dispatch<SetStateAction<WithPersonType[]>>;
}

const WithPeople = ({ people, setPeople }: WithPeopleProps) => {
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

  return (
    <WithPeopleContainer>
      {people.map((person, idx) => (
        <InputWrapper key={idx}>
          <Input
            placeholder="참여자"
            value={person.name}
            onChange={changePerson(idx, "name")}
          />
          <Input
            placeholder="개발 스택"
            value={person.field}
            onChange={changePerson(idx, "field")}
          />
          <Input
            placeholder="참조링크"
            value={person.github}
            onChange={changePerson(idx, "github")}
          />
          <CancelButton
            onClick={onDelete(idx)}
            src="/icons/close.png"
            alt="취소 버튼"
            width="10"
            height="10"
          />
        </InputWrapper>
      ))}
      <AddButton onClick={addPerson}>+ 참여자 추가</AddButton>
    </WithPeopleContainer>
  );
};

const WithPeopleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid grey;
  padding: 10px 20px;
  outline: none;
`;

const AddButton = styled.button`
  width: 100px;
  line-height: 30px;
  border-radius: 25px;
  border: none;
  background-color: grey;
  color: white;
  cursor: pointer;
`;

const CancelButton = styled(Image)`
  cursor: pointer;
  padding: 0.125rem;
`;

export default WithPeople;
