//import Editorjs component as a dynamic import where ssr is false
import dynamic from "next/dynamic";

let Editor = dynamic(() => import("./editor"), {
  ssr: false,
});

interface EditorProps {
  content: any;
  setContent: any;
}

const WriteArticle = ({ content, setContent }: EditorProps) => {
  return (
    <Editor
      data={content}
      onChange={(e: any) => setContent(e)}
      holder="editor_create"
    />
  );
};
export default WriteArticle;
