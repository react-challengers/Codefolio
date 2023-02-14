import "@toast-ui/editor/dist/toastui-editor.css";
// import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
// import "tui-color-picker/dist/tui-color-picker.css";
// import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

const PostEditor = () => {
  const toolbarItems = [
    ["heading", "bold", "italic", "strike"],
    ["hr"],
    ["ul", "ol", "task"],
    ["table", "link"],
    ["image"], // <-- 이미지 추가 툴바
    ["code"],
    ["scrollSync"],
  ];
  return (
    <Editor
      initialValue="hello react editor world!"
      previewStyle="vertical"
      height="600px"
      initialEditType="wysiwyg"
      useCommandShortcut
      toolbarItems={toolbarItems}
      plugins={[
        colorSyntax,
        // 기본 색상 preset 적용
        // {
        //   preset: ["#1F2E3D", "#4c5864", "#ED7675"],
        // },
      ]}
    />
  );
};

export default PostEditor;
