import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import { useCallback } from "react";
import dynamic from "next/dynamic";
import supabase from "@/lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState } from "recoil";
import { postContent as recoilPostContent, postId } from "@/lib/recoil";
import imageCompression from "browser-image-compression";

/**
 * @TODO postId 에러 해결 필요
 * @TODO 이미지 업로드시 링크 열리는 문제 해결 필요
 * @TODO 이미지 아이콘 클릭시 이미지 업로드 구현 필요
 * @TODO storage 삭제 구현 필요
 */

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
});

const PostEditor = () => {
  const [isPostId] = useRecoilState(postId);
  const [postContent, setPostContent] = useRecoilState(recoilPostContent);

  const onImagePasted = useCallback(
    async (
      dataTransfer: DataTransfer // Drag and Drop API
    ) => {
      const files: File[] = []; // 드래그 앤 드랍으로 가져온 파일들
      for (let index = 0; index < dataTransfer.items.length; index += 1) {
        const file = dataTransfer.files.item(index);
        if (!file) return;
        files.push(file);
      }
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
      />
    </div>
  );
};

export default PostEditor;
