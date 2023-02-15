import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "@toast-ui/editor/dist/i18n/ko-kr";

import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import supabase from "@/lib/supabase";
import imageCompression from "browser-image-compression";

/**
 * @TODO storage 삭제 구현 필요
 * @TODO uuid flag 꽃아야 함 >> 게시와 임시저장의 용도로 분류
 */

interface PostEditorProps {
  postContent: string;
  setPostContent: Dispatch<SetStateAction<string>>;
}

const PostEditor = ({ postContent, setPostContent }: PostEditorProps) => {
  const editorRef = useRef(null);

  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"], // <-- 이미지 추가 툴바
    ["code"],
    ["scrollSync"],
  ];

  useEffect(() => {
    const editorIns = editorRef.current.getInstance();
    editorIns.removeHook("addImageBlobHook");
    editorIns.addHook("addImageBlobHook", addImage);
  }, []);

  // ------------- image Function ------------- // 에디터에 이미지 추가

  const addImage = async (blob: File, dropImage) => {
    // https://www.youtube.com/watch?v=dLqSmxX3r7I
    const img = await compressImg(blob); // 이미지 압축
    const url = await uploadImage(img); // 업로드된 이미지 서버 url
    dropImage(url, "alt_text"); // 에디터에 이미지 추가
  };

  // 이미지 업로드

  const uploadImage = async (blob: File) => {
    try {
      // firebase Storage Create Reference 파일 경로 / 파일 명 . 확장자
      const imgPath = crypto.randomUUID();
      await supabase.storage.from("post-image").upload(imgPath, blob);

      // 이미지 올리기
      const urlResult = await supabase.storage
        .from("post-image")
        .getPublicUrl(imgPath);
      return urlResult.data.publicUrl;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // //이미지 압축
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

  // detail에 활용 가능
  // const getContent = () => {
  //   //글 내용 HTML 문자열로 불러오기
  //   const editorIns = editorRef.current.getInstance();
  //   return editorIns.getHTML();
  // };

  const handleRegisterButton = () => {
    // 유효성 검사
    const editorText = editorRef.current?.getInstance().getMarkdown();
    if ((editorText === " ") | (editorText === "")) {
      return;
    }
    // HTML 대신에 Markdown으로 저장합니다.
    setPostContent(editorText);
  };

  // 진행 해야 함
  // const getMarkDown = () => {
  //   //글 내용 마크다운 문자열로 불러오기
  //   const editorIns = editorRef.current.getInstance();
  //   return editorIns.getMarkdown();
  // };

  // const validation_check = () => {
  //   const title = titleRef.current.value.trim();
  //   const content = getMarkDown();
  //   if (title !== "" || content !== "") {
  //     // DB에 저장
  //   } else {
  //     // 에러 표시
  //   }
  // };
  return (
    <Editor
      ref={editorRef}
      initialValue=" "
      previewStyle="vertical"
      // previewHighlight={false}
      height="600px"
      initialEditType="markdown"
      useCommandShortcut
      toolbarItems={toolbarItems}
      language="ko-KR"
      plugins={[
        colorSyntax,
        // 기본 색상 preset 적용
        // {
        //   preset: ["#1F2E3D", "#4c5864", "#ED7675"],
        // },
      ]}
      hooks={{
        addImageBlobHook: addImage,
      }}
    />
  );
};

export default PostEditor;
