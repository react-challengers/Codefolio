import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "prismjs/themes/prism.css";

import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";
import { RefObject, useCallback, useEffect } from "react";
import imageCompression from "browser-image-compression";
import { useRecoilState } from "recoil";
import { postContent as recoilPostContent } from "@/lib/recoil";
import uploadImage from "@/utils/commons/uploadImage";

/**
 * @TODO storage 삭제 구현 필요
 * @TODO uuid flag 꽃아야 함 >> 게시와 임시저장의 용도로 분류
 */

interface PostEditorProps {
  editorRef: RefObject<Editor>;
}

const PostEditor = ({ editorRef }: PostEditorProps) => {
  const [postContent, setPostContent] = useRecoilState(recoilPostContent);
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"], // <-- 이미지 추가 툴바
    ["code"],
    ["scrollSync"],
  ];

  // 이미지 추가
  type HookCallback = (url: string, text?: string) => void;

  const addImage = useCallback(async (blob: File, dropImage: HookCallback) => {
    const img = await compressImg(blob); // 이미지 압축
    if (!img) return;
    const url = await uploadImage(img, "post-image"); // 업로드된 이미지 서버 url
    if (!url) return;
    dropImage(url, `${blob.name}`); // 에디터에 이미지 추가
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const editorIns = editorRef.current.getInstance();
      editorIns.removeHook("addImageBlobHook");
      editorIns.addHook("addImageBlobHook", addImage);
    }
  }, [editorRef, addImage]);

  // 이미지 압축
  const compressImg = async (blob: File): Promise<File | void> => {
    const options = {
      maxSize: 1,
      initialQuality: 0.55, // initial 0.7
    };
    const result = await imageCompression(blob, options)
      .then((res) => res)
      .catch((e) => console.log(e, "압축 에러"));
    return result;
  };

  const handleOnEditorChange = () => {
    // 유효성 검사
    const editorText = editorRef.current?.getInstance().getMarkdown();
    if (editorText === " " || editorText === "" || editorText === undefined) {
      return;
    }
    // HTML 대신에 Markdown으로 저장합니다.
    setPostContent(editorText);
  };

  return (
    <Editor
      ref={editorRef}
      initialValue={postContent ?? null}
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut
      toolbarItems={toolbarItems}
      language="ko-KR"
      plugins={[
        colorSyntax,
        [codeSyntaxHighlightPlugin, { highlighter: Prism }],
      ]}
      hooks={{
        // @ts-ignore
        addImageBlobHook: addImage,
      }}
      onChange={() => handleOnEditorChange()}
    />
  );
};

export default PostEditor;
