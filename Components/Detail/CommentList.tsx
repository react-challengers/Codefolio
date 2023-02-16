import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import CommentItem from "./CommentItem";

interface CommentType {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
}

const CommentList = () => {
  const POST_ID = "9157621b-2a0d-4059-b0de-5d77b591fe09";

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
