import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import supabase from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState } from "recoil";
import { postContent as recoilPostContent, postId } from "@/lib/recoil";
import imageCompression from "browser-image-compression";
import { MDEditorProps } from "@uiw/react-md-editor";
import { NextPage } from "next";
import * as commands from "@uiw/react-md-editor/lib/commands";

/**
 * @TODO 이미지 업로드시 링크 열리는 문제 해결 필요
 * @TODO storage 삭제 구현 필요
 */

const MDEditor = dynamic<MDEditorProps>(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const PostEditor: NextPage = () => {
  const [isPostId] = useRecoilState(postId);
  const [postContent, setPostContent] = useRecoilState(recoilPostContent);

  const onImagePasted = useCallback(
    async (
      dataTransfer: DataTransfer | any // Drag and Drop API
    ) => {
      const files: File[] = []; // 드래그 앤 드랍으로 가져온 파일들
      if (dataTransfer.items) {
        for (let index = 0; index < dataTransfer.items.length; index += 1) {
          const file = dataTransfer.items[index].getAsFile();
          if (!file) return;
          files.push(file);
        }
      } else {
        const file = dataTransfer[0];
        console.log("👉👉  file:", file);

        if (!file) return;
        files.push(file);
      }

      // for (
      //   let index = 0;
      //   index <
      //   (dataTransfer.items ? dataTransfer.items.length : dataTransfer.length);
      //   index += 1
      // ) {
      //   const file = dataTransfer.items
      //     ? dataTransfer.files.item(index)
      //     : dataTransfer[0];
      //   if (!file) return;
      //   files.push(file);
      // }
      const fileId = uuidv4();
      files.map(async (file) => {
        const compressedFile = await compressImg(file);

        if (!compressedFile) return;

        const { data: uploadImg } = await supabase.storage
          .from("post-image")
          .upload(`${isPostId}/${fileId}`, compressedFile);
        if (!uploadImg) return;

        const { data: insertedMarkdown } = supabase.storage
          .from("post-image")
          .getPublicUrl(`${isPostId}/${fileId}`);
        if (!insertedMarkdown) return;

        const insertString = `![${file.name}](${insertedMarkdown.publicUrl})`;
        const resultString = insertToTextArea(insertString);

        setPostContent(resultString || "");
      });
    },
    [isPostId, setPostContent]
  );

  // 이미지 압축
  const compressImg = async (blob: File): Promise<File | void> => {
    const options = {
      maxSizeMB: 1,
      initialQuality: 0.55, // initial 0.7
    };
    const result = await imageCompression(blob, options)
      .then((res) => res)
      .catch((e) => console.log(e, "압축 에러"));
    return result;
  };

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
    // div에 클래스를 적용하여 다크모드를 수동으로 적용할 수 있습니다.
    <div>
      <MDEditor
        value={postContent}
        onChange={(value) => {
          setPostContent(value || "");
        }}
        height={600}
        onPaste={(event) => {
          onImagePasted(event.clipboardData);
        }}
        onDrop={(event) => {
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
          commands.group([], {
            name: "image",
            groupName: "image",
            icon: (
              <svg
                fill="#444541"
                height="12"
                width="12"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 489.4 489.4"
              >
                <g>
                  <g>
                    <path
                      d="M0,437.8c0,28.5,23.2,51.6,51.6,51.6h386.2c28.5,0,51.6-23.2,51.6-51.6V51.6c0-28.5-23.2-51.6-51.6-51.6H51.6
			C23.1,0,0,23.2,0,51.6C0,51.6,0,437.8,0,437.8z M437.8,464.9H51.6c-14.9,0-27.1-12.2-27.1-27.1v-64.5l92.8-92.8l79.3,79.3
			c4.8,4.8,12.5,4.8,17.3,0l143.2-143.2l107.8,107.8v113.4C464.9,452.7,452.7,464.9,437.8,464.9z M51.6,24.5h386.2
			c14.9,0,27.1,12.2,27.1,27.1v238.1l-99.2-99.1c-4.8-4.8-12.5-4.8-17.3,0L205.2,333.8l-79.3-79.3c-4.8-4.8-12.5-4.8-17.3,0
			l-84.1,84.1v-287C24.5,36.7,36.7,24.5,51.6,24.5z"
                    />
                    <path
                      d="M151.7,196.1c34.4,0,62.3-28,62.3-62.3s-28-62.3-62.3-62.3s-62.3,28-62.3,62.3S117.3,196.1,151.7,196.1z M151.7,96
			c20.9,0,37.8,17,37.8,37.8s-17,37.8-37.8,37.8s-37.8-17-37.8-37.8S130.8,96,151.7,96z"
                    />
                  </g>
                </g>
              </svg>
            ),
            // eslint-disable-next-line react/no-unstable-nested-components
            children: (handle: any) => {
              return (
                <div style={{ width: 200, padding: 10 }}>
                  <input
                    type="file"
                    onChange={(e) => onImagePasted(e.target.files)}
                  />
                  <button type="button" onClick={() => handle.close()}>
                    close
                  </button>
                </div>
              );
            },
            execute: (
              state: commands.TextState,
              api: commands.TextAreaTextApi
            ) => {
              console.log(">>>>>>update>>>>>", state);
            },
            buttonProps: { "aria-label": "Insert title" },
          }),
          commands.quote,
          commands.code,
          commands.divider,

          commands.unorderedListCommand,
          commands.orderedListCommand,
          commands.checkedListCommand,
          commands.divider,
        ]}
      />
    </div>
  );
};

export default PostEditor;
