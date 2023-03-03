import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { useCallback, useState } from "react";
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
        const fileId = uuidv4() + file.name;

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
    [isPostId, setPostContent]
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
        onPaste={(event) => {
          event.preventDefault();
          onImagePasted(event.clipboardData);
        }}
        onDrop={(event) => {
          event.preventDefault();
          onImagePasted(event.dataTransfer);
        }}
        textareaProps={{
          placeholder: "Fill in your markdown for the coolest of the cool.",
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
                  <label htmlFor="file">
                    <ImageUploadButton>이미지 업로드하기</ImageUploadButton>
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
                  <CloseButton type="button" onClick={() => handle.close()}>
                    close
                  </CloseButton>
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
  & > div {
  }
  .w-md-editor {
    background-color: ${(props) => props.theme.colors.gray7}!important;
  }
  .w-md-editor-toolbar {
    color: ${(props) => props.theme.colors.black};
    border-color: ${(props) => props.theme.colors.gray7};
    background-color: #0d1118;
    & li > button {
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
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.gray7};
    border-top: none;
  }
  .w-md-editor-input {
    background-color: ${(props) => props.theme.colors.gray11};
    border-right: 1px solid ${(props) => props.theme.colors.gray7};
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
`;

const CustomImageContainer = styled.div`
  width: 15rem;
  padding: 0.625rem;
  background-color: #eee;
`;

const ImageUploadButton = styled.div`
  width: 9.375rem;
  height: 1.875rem;
  background: #fff;
  border: 1px solid rgb(77, 77, 77);
  border-radius: 0.625rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const CloseButton = styled.button`
  all: unset;
  display: block;
  margin-left: auto;
  margin-top: 0.625rem;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export default PostEditor;
