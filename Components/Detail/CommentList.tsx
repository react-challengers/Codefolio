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
  const post_id = "9157621b-2a0d-4059-b0de-5d77b591fe09";
  const user_id = "7af6cc75-50f7-4901-9691-36657cb274b5";
  const { data, isError, isLoading } = useQuery(
    ["getComment"],
    async () =>
      await supabase
        .from("comment")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("post_id", post_id)
  );

  if (isLoading) return <>loading...</>;

  if (isError) return <>error</>;

  return (
    <>
      {data &&
        data.data?.map((comment: CommentType) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
    </>
  );
};

export default CommentList;
