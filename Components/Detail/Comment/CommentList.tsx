import supabase from "@/lib/supabase";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import CommentItem from "./CommentItem";

interface CommentListProps {
  postId: string | string[] | undefined;
}

const CommentList = ({ postId }: CommentListProps) => {
  const getComments = async () => {
    const res = await supabase
      .from("comment")
      .select<string, CommentType>("*")
      .order("created_at", { ascending: false })
      .eq("post_id", postId);
    return res;
  };

  const { data, refetch } = useQuery(["getComment"], {
    queryFn: getComments,
  });

  useEffect(() => {
    refetch();
  }, [postId, refetch]);

  return (
    <div>
      {data &&
        data.data?.map((comment: CommentType) => (
          <CommentItem key={comment.id} comment={comment} dbType="comment" />
        ))}
    </div>
  );
};

export default CommentList;
