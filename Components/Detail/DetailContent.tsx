import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

interface DetailContentProps {
  content: string;
}

const DetailContent = ({ content }: DetailContentProps) => {
  return <Viewer initialValue={content} />;
};

export default DetailContent;
