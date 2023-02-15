import { Dispatch, SetStateAction } from "react";
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
    setPeople((prev: WithPersonType) =>
      prev.push({ name: "", field: "", github: "" })
    );
  };
  const changeName = (idx: number) => {};

  const changeField = (idx: number) => {};

  const changeGithub = (idx: number) => {};
  return (
    <WithPeopleContainer>
      {/* {people &&
        people.map((person, idx) => (
          <InputWrapper key={idx}>
            <Input placeholder="참여자" />
            <Input placeholder="개발 스택" />
            <Input placeholder="참조링크" />
          </InputWrapper>
        ))} */}
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

export default WithPeople;
