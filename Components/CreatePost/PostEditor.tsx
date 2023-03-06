import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { ClipboardEvent, useCallback, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState, useRecoilValue } from "recoil";
import { postContent as recoilPostContent, postId } from "@/lib/recoil";
import type { MDEditorProps } from "@uiw/react-md-editor";
import { NextPage } from "next";
import * as commands from "@uiw/react-md-editor/lib/commands";
import uploadImage from "@/utils/commons/uploadImage";
import styled from "styled-components";
import compressImg from "@/utils/commons/compressImg";
import validateFile from "@/utils/commons/validationImage";
import { Modal } from "../Common";
import ImageUploadText from "./ImageUploadText";

/**
 * @TODO storage 삭제 구현 필요
 */

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const PostEditor: NextPage = () => {
  const isPostId = useRecoilValue(postId);
  const [postContent, setPostContent] = useRecoilState(recoilPostContent);
  const [showModal, setShowModal] = useState(false);

  const handleOnPaste = (e: ClipboardEvent<HTMLDivElement>) => {
    if (e.clipboardData.files.length) {
      e.preventDefault();
      onImagePasted(e.clipboardData);
    }
  };

  const onImagePasted = useCallback(
    async (
      dataTransfer: DataTransfer | FileList | null // Drag and Drop API
    ) => {
      if (!dataTransfer) return;
      const files: File[] = []; // 드래그 앤 드랍으로 가져온 파일들
      if (dataTransfer instanceof DataTransfer) {
        for (let index = 0; index < dataTransfer.items.length; index += 1) {
          const file = dataTransfer.items[index].getAsFile();

          if (file && !validateFile(file)) {
            setShowModal(true);
            return;
          }
          files.push(file as File);
        }
      } else if (dataTransfer instanceof FileList) {
        for (let index = 0; index < dataTransfer.length; index += 1) {
          const file = dataTransfer[index];

          if (!validateFile(file)) {
            setShowModal(true);
            return;
          }
          files.push(file);
        }
      }

      files.map(async (file) => {
        const fileId = uuidv4();

        const compressedFile = await compressImg(file);
        if (!compressedFile) return;

        const uploadResult = await uploadImage(
          compressedFile,
          "post-image",
          `${isPostId}/${fileId}`
        );
        if (!uploadResult) return;

        const insertString = `![${file.name}](${uploadResult})`;
        const resultString = insertToTextArea(insertString);

        setPostContent(resultString || "");
      });
    },
    [setPostContent]
  );

  // 에디터에 이미지 추가
  const insertToTextArea = (intsertString: string) => {
    const textarea = document.querySelector("textarea");
    if (!textarea) {
      return null;
    }
    let sentence = textarea.value;
    const len = sentence.length;
    const pos = textarea.selectionStart;
    const end = textarea.selectionEnd;

    const front = sentence.slice(0, pos);
    const back = sentence.slice(pos, len);

    sentence = front + intsertString + back;

    textarea.value = sentence;
    textarea.selectionEnd = end + intsertString.length;
    return sentence;
  };

  return (
    <div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          title="이미지 파일이 아닙니다."
        >
          jpeg, jpg, png, svg 등 이미지 파일을 넣어주세요.
        </Modal>
      )}

      <MDEditorStyled
        value={postContent}
        onChange={(value) => {
          setPostContent(value || "");
        }}
        height={600}
        onPaste={handleOnPaste}
        onDrop={(event) => {
          event.preventDefault();
          onImagePasted(event.dataTransfer);
        }}
        textareaProps={{
          placeholder: "프로젝트 내용을 입력해 주세요.",
        }}
        commands={[
          commands.bold,
          commands.italic,
          commands.strikethrough,
          commands.hr,
          commands.title,
          commands.divider,

          commands.link,
          commands.quote,
          commands.code,
          commands.divider,

          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.checkedListCommand,
          commands.divider,

          commands.group([], {
            name: "image",
            groupName: "image",
            icon: (
              <svg width="12" height="12" viewBox="0 0 20 20">
                <path
                  fill="currentColor"
                  d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
                />
              </svg>
            ),
            // eslint-disable-next-line react/no-unstable-nested-components, @typescript-eslint/no-explicit-any
            children: (handle: any) => {
              // API가 any를 지정합니다.
              return (
                <CustomImageContainer>
                  <ImageContainerCloseButtonWrapper>
                    <Image
                      src="/icons/close.svg"
                      width={16}
                      height={16}
                      alt="닫힘버튼"
                      onClick={() => handle.close()}
                    />
                  </ImageContainerCloseButtonWrapper>
                  <label htmlFor="file">
                    <ImageUploadButton>
                      <ImageUploadText />
                    </ImageUploadButton>
                  </label>
                  <ImageInput
                    type="file"
                    id="file"
                    value=""
                    multiple
                    accept="image/*"
                    onChange={(e) => {
                      onImagePasted(e.target.files);
                      handle.close();
                    }}
                  />
                </CustomImageContainer>
              );
            },
            buttonProps: { "aria-label": "Insert image" },
          }),
        ]}
      />
    </div>
  );
};

const MDEditorStyled = styled(MDEditor)`
  -webkit-text-fill-color: ${(props) => props.theme.colors.white};
  ::placeholder {
  }
  .w-md-editor {
    background-color: none;
  }
  .w-md-editor-toolbar {
    -webkit-text-fill-color: ${(props) => props.theme.colors.black} !important;
    border: 1px solid ${(props) => props.theme.colors.gray7};
    background-color: ${(props) => props.theme.colors.gray11};
    & li > button > svg > path {
      color: ${(props) => props.theme.colors.gray2};
    }
    & li > button:hover {
      background-color: #343942;
    }
    & li.active > button {
      background-color: #343942;
    }
  }
  .w-md-editor-toolbar-divider {
    background-color: ${(props) => props.theme.colors.gray7};
  }
  .w-md-editor-content {
    background-color: ${(props) => props.theme.colors.gray7};
    border: 1px solid ${(props) => props.theme.colors.gray7};
    border-top: none;
  }
  .w-md-editor-input {
    background-color: ${(props) => props.theme.colors.gray11};
    border-right: 1px solid ${(props) => props.theme.colors.gray7};
    color: ${(props) => props.theme.colors.white};

    ::-webkit-scrollbar {
      background-color: ${(props) => props.theme.colors.gray11};
    }
  }
  .wmde-markdown {
    background-color: ${(props) => props.theme.colors.gray11};
  }
  .w-md-editor-preview {
    box-shadow: none;
  }

  .w-md-editor-toolbar-child {
    background: none;
  }

  li {
    list-style-type: disc;
  }
`;

const CustomImageContainer = styled.div`
  width: 11.25rem;
  height: 5.25rem;
  padding-top: 0.25rem;
  /* padding: 0.625rem; */
  background-color: ${({ theme }) => theme.colors.gray9};
  border-radius: 0.25rem;
`;

const ImageContainerCloseButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 0.25rem;
  margin-bottom: 0.5rem;
  width: 100%;
  cursor: pointer;
`;

const ImageUploadButton = styled.div`
  width: 7rem;
  height: 1.875rem;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.gray2};
  border-radius: 0.25rem;
  padding: 0.375rem 0;
  cursor: pointer;
  margin: 0 auto;

  box-sizing: border-box;
  text-align: center;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary1};
    path {
      fill: ${({ theme }) => theme.colors.primary1};
    }
  }
`;

const ImageInput = styled.input`
  display: none;
`;

export default PostEditor;
