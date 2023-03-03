import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import CommentItem from "./CommentItem";

interface CommentType {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

interface CommentListProps {
  postId: string | string[] | undefined;
}

const CommentList = ({ postId }: CommentListProps) => {
  const getComments = async () => {
    const { data, error } = await supabase
      .from("comment")
      .select("*")
      .order("created_at", { ascending: false })
      .eq("post_id", postId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  };

  const { data, isError, isLoading, refetch } = useQuery(["getComment"], {
    queryFn: getComments,
  });

  useEffect(() => {
    refetch();
  }, [postId, refetch]);

  if (isLoading) return <>loading...</>;

  if (isError) return <>error</>;

  return (
    <div>
      {data &&
        data?.map((comment: CommentType) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
    </div>
  );
};

export default CommentList;
