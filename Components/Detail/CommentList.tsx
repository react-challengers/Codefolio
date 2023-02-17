import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import CommentItem from "./CommentItem";

interface CommentType {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
}

interface CommentListProps {
  POST_ID: string | string[] | undefined;
}

const CommentList = ({ POST_ID }: CommentListProps) => {
  const getComments = async () => {
    const res = await supabase
      .from("comment")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("post_id", POST_ID);
    return res;
  };

  const { data, isError, isLoading } = useQuery(["getComment"], {
    queryFn: getComments,
  });

  if (isLoading) return <>loading...</>;

  if (isError) return <>error</>;

  return (
    <div>
      {data &&
        data.data?.map((comment: CommentType) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
    </div>
  );
};

export default CommentList;
