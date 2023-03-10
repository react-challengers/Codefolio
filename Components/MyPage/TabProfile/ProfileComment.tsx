import CommentItem from "@/Components/Detail/Comment/CommentItem";
import supabase from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import styled from "styled-components";

interface ProfileCommentProps {
  profileId: string | undefined;
}

const ProfileComment = ({ profileId }: ProfileCommentProps) => {
  const getComments = async () => {
    const res = await supabase
      .from("profile_comment")
      .select<string, CommentType>("*")
      .order("created_at", { ascending: false })
      .eq("profile_id", profileId);
    return res;
  };

  const { data, refetch } = useQuery(["getProfileComment"], getComments);

  useEffect(() => {
    refetch();
  }, [profileId, refetch]);

  return (
    <ProfileCommentContainer>
      {data &&
        data.data?.map((comment: CommentType) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            dbType="profile_comment"
          />
        ))}
    </ProfileCommentContainer>
  );
};

const ProfileCommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default ProfileComment;
