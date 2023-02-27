import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

import dynamic from "next/dynamic";
import styled from "styled-components";

const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), {
  ssr: false,
});

interface DetailContentProps {
  content: string;
}

const DetailContent = ({ content }: DetailContentProps) => {
  return <PreviewContent source={content} />;
};

const PreviewContent = styled(MarkdownPreview)`
  width: 100%;
  padding: 1rem;
`;

export default DetailContent;
