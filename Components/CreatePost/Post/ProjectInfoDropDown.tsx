import styled from "styled-components";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  postLargeCategory,
  postProjectDuration,
  postSkills,
  postSubCategory,
  postGithubUrl,
  postDeployedUrl,
  postTags,
  postSubCategoryVaildate,
  postSkillsVaildate,
  postGithubUrlVaildate,
  postDeployedUrlVaildate,
  postTagsVaildate,
} from "@/lib/recoil";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import getYYYYMM from "@/utils/commons/getYYYYMM";
import { HelperTextBox, SkillList } from "@/Components/Common";
import arrow_down from "@/public/icons/arrow_down.svg";
import disable_check from "@/public/icons/disable_check.svg";
import enable_check from "@/public/icons/enable_check.svg";
import Image from "next/image";
import FieldDropDown from "./FieldDropDown";
import WithPeople from "./WithPeople";

const ProjectInfoDropDown = () => {
  const [postSkill, setPostSkill] = useRecoilState(postSkills);
  const [[startDate, endDate], setDate] = useRecoilState(postProjectDuration);

  const [tag, setTag] = useRecoilState(postTags);
  const [githubUrl, setGithubUrl] = useRecoilState(postGithubUrl);
  const [deployedUrl, setDeployedUrl] = useRecoilState(postDeployedUrl);
  const largeCategory = useRecoilValue(postLargeCategory);
  const subCategory = useRecoilValue(postSubCategory);

  const [categoryVisible, setCategoryVisible] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  // helperText state
  const subCategoryVaildate = useRecoilValue(postSubCategoryVaildate);
  const skillsVaildate = useRecoilValue(postSkillsVaildate);
  const tagsVaildate = useRecoilValue(postTagsVaildate);
  const githubUrlVaildate = useRecoilValue(postGithubUrlVaildate);
  const deployedUrlVaildate = useRecoilValue(postDeployedUrlVaildate);

  const handleShowCategory = () => {
    setCategoryVisible((prev) => !prev);
  };

  const handleProgress = () => {
    setInProgress((prev) => !prev);
    if (!inProgress) {
      setDate((prev) => [prev[0], "진행중"]);
    } else {
      setDate((prev) => [prev[0], getYYYYMM(new Date())]);
    }
  };

  return (
    <ProjectInfoDropDownContainer>
      <ProjectInfoContainer>
        <ProjectInfoWrapper>
          <TEXTBOX>카테고리*</TEXTBOX>
          <HelperTextContainer>
            <CategoryPicker onClick={handleShowCategory}>
              {largeCategory && subCategory ? (
                <span>{subCategory}</span>
              ) : (
                <span>카테고리를 선택해주세요.</span>
              )}
              <DropdownImage
                src={arrow_down}
                alt="category selete icon"
                width={16}
                height={16}
              />
              {categoryVisible && <FieldDropDown />}
            </CategoryPicker>
            <HelperTextBox text={subCategoryVaildate} />
          </HelperTextContainer>
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>프로젝트 스택*</TEXTBOX>
          <HelperTextContainer>
            <SkillListWrapper>
              <SkillList
                text="개발 스택 추가"
                editSkills={postSkill}
                setEditSkills={setPostSkill}
              />
            </SkillListWrapper>
            <HelperTextBox text={skillsVaildate} />
          </HelperTextContainer>
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>프로젝트 기간*</TEXTBOX>
          <DatePickerContainer>
            <DateSelectBox>
              <StyledDatePicker
                showMonthYearPicker
                selected={new Date(startDate)}
                dateFormat="yyyy-MM"
                onChange={(date: Date) =>
                  setDate((prev) => [getYYYYMM(date), prev[1]])
                }
                selectsStart
                startDate={new Date(startDate)}
                endDate={new Date(endDate)}
                maxDate={new Date(endDate)}
              />
              <SpaceBetweenDatePicker> ~ </SpaceBetweenDatePicker>
              {inProgress ? (
                <InDateProgress>진행중</InDateProgress>
              ) : (
                <StyledDatePicker
                  showMonthYearPicker
                  selected={new Date(endDate)}
                  dateFormat="yyyy-MM"
                  onChange={(date: Date) =>
                    setDate((prev) => [prev[0], getYYYYMM(date)])
                  }
                  selectsEnd
                  startDate={new Date(startDate)}
                  endDate={new Date(endDate)}
                  minDate={new Date(startDate)}
                />
              )}
              <InProgress onClick={handleProgress}>
                {inProgress ? (
                  <CheckInput
                    src={enable_check}
                    width={24}
                    height={24}
                    alt="checked"
                  />
                ) : (
                  <CheckInput
                    src={disable_check}
                    width={24}
                    height={24}
                    alt="Unchecked"
                  />
                )}
                <CheckLabel>진행중</CheckLabel>
              </InProgress>
            </DateSelectBox>
          </DatePickerContainer>
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>깃허브 주소</TEXTBOX>
          <HelperTextContainer>
            <InputURL
              type="url"
              pattern="https://.*"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/project"
            />
            <HelperTextBox text={githubUrlVaildate} />
          </HelperTextContainer>
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>배포 주소</TEXTBOX>
          <HelperTextContainer>
            <InputURL
              type="url"
              pattern="https://.*"
              value={deployedUrl}
              onChange={(e) => setDeployedUrl(e.target.value)}
              placeholder="https://example.com"
            />
            <HelperTextBox text={deployedUrlVaildate} />
          </HelperTextContainer>
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>키워드 태그</TEXTBOX>
          <HelperTextContainer>
            <TagList>
              <SkillList
                text="태그 추가"
                editSkills={tag}
                setEditSkills={setTag}
              />
            </TagList>
            <HelperTextBox text={tagsVaildate} />
          </HelperTextContainer>
        </ProjectInfoWrapper>

        <ProjectInfoWrapper>
          <TEXTBOX>함께한 사람들*</TEXTBOX>
          <HelperTextContainer>
            <WithPeople />
          </HelperTextContainer>
        </ProjectInfoWrapper>
      </ProjectInfoContainer>
    </ProjectInfoDropDownContainer>
  );
};

const ProjectInfoDropDownContainer = styled.div`
  height: auto;
  min-height: 12.5rem;

  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray7};
  border-top: none;

  padding: 2.5rem 4.5rem;
`;

const ProjectInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  max-width: 61.875rem;
`;

const ProjectInfoWrapper = styled.div`
  display: flex;
  gap: 3.75rem;

  width: 100%;
`;

const CategoryPicker = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 100%;
  cursor: pointer;

  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray7};

  ${({ theme }) => theme.fonts.body14Medium};

  span {
    color: ${({ theme }) => theme.colors.white};
    display: flex;
    padding: 0.625rem 1rem;
  }
`;

const DropdownImage = styled(Image)`
  margin: 0.75rem;
`;

const DatePickerContainer = styled.div`
  display: flex;
  height: 5rem;
`;

const DateSelectBox = styled.div`
  display: flex;
  justify-content: space-between;

  height: 2.75rem;
  color: ${({ theme }) => theme.colors.gray6};
`;

const StyledDatePicker = styled(DatePicker)`
  all: unset;

  min-width: 18rem;
  padding: 0.625rem 1rem;
  padding-right: 3.75rem;

  border-bottom: 1px solid;
  border-color: ${({ theme }) => theme.colors.gray7};

  ${({ theme }) => theme.fonts.body14};
  box-sizing: border-box;
`;

const InDateProgress = styled.div`
  min-width: 18rem;
  border-radius: 0.25rem;
  padding: 0.625rem 1rem;
  padding-right: 3.75rem;

  background-color: ${({ theme }) => theme.colors.gray5};
  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.body14};
`;
const SpaceBetweenDatePicker = styled.div`
  padding: 0.75rem 1rem;
  ${({ theme }) => theme.fonts.subtitle18En};
  color: ${({ theme }) => theme.colors.gray4};
`;

const InProgress = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  & > * {
    cursor: pointer;
  }
`;

const CheckLabel = styled.span`
  width: 2.5rem;
  height: 1.25rem;
  ${({ theme }) => theme.fonts.body14};
  color: ${({ theme }) => theme.colors.gray5};
`;

const CheckInput = styled(Image)`
  margin: 0 0.5rem;
`;

const InputURL = styled.input`
  width: 100%;
  height: 100%;
  padding: 0.625rem 1rem;

  background-color: transparent;
  border: none;
  border-bottom: 0.0625rem solid;
  border-color: ${({ theme }) => theme.colors.gray7};

  ${({ theme }) => theme.fonts.body14};
  color: ${({ theme }) => theme.colors.white};
  ::placeholder {
    color: ${({ theme }) => theme.colors.gray6};
  }
`;

const SkillListWrapper = styled.div`
  width: 100%;
`;

const TagList = styled.div`
  width: 100%;
  input {
    color: ${({ theme }) => theme.colors.white};
  }
`;

const HelperTextContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

// const ToggleWrapper = styled.div`
//   display: flex;
//   gap: 12px;
//   align-items: center;
//   p {
//     color: #999999;
//     font-size: 13px;
//   }
// `;

const TEXTBOX = styled.div`
  min-width: 7.5rem;
  min-height: 5rem;
  padding: 0.625rem 0;

  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.body16};
`;

export default ProjectInfoDropDown;
