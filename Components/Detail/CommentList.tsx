import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import CommentItem from "./CommentItem";

const CommentList = () => {
  const post_id = "9157621b-2a0d-4059-b0de-5d77b591fe09";
  const user_id = "7af6cc75-50f7-4901-9691-36657cb274b5";
  const { data, isError, isLoading } = useQuery(["getComment"], () =>
    supabase.from("comment").select("*").eq("post_id", post_id)
  );
  console.log(data);

  if (isLoading) return <>loading...</>;

  if (isError) return <>error</>;

  return (
    <>
      {data &&
        data.data.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
    </>
  );
};

export default CommentList;
