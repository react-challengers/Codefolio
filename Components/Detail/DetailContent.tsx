import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";

import { Viewer } from "@toast-ui/react-editor";
import codeSyntaxHighlightPlugin from "@toast-ui/editor-plugin-code-syntax-highlight";
import Prism from "prismjs";

interface DetailContentProps {
  content: string;
}

const DetailContent = ({ content }: DetailContentProps) => {
  return (
    <Viewer
      initialValue={content}
      plugins={[[codeSyntaxHighlightPlugin, { highlighter: Prism }]]}
    />
  );
};

export default DetailContent;
