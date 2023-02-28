import { deletePost } from "@/utils/APIs/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import styled from "styled-components";

const ShowMoreModal = () => {
  const router = useRouter();
  const {
    query: { id: postId },
  } = router;

  const queryClient = useQueryClient();

  const editPost = async () => {
    router.push(`/edit-post/${postId}`);
  };

  const { mutate: deletePostMutate } = useMutation(deletePost, {
    onMutate: async () => {
      await queryClient.cancelQueries(["getPost", postId]);

      const previousPost = queryClient.getQueryData<PostType>([
        "getPost",
        postId,
      ]);

      if (previousPost) {
        queryClient.setQueryData(["getPost", postId], null);
      }

      return { previousPost };
    },
    onError: (error, variables, context) => {
      if (context?.previousPost) {
        queryClient.setQueryData(["getPost", postId], {
          ...context.previousPost,
        });
      }
    },
    onSuccess: async () => {
      alert("게시물이 삭제되었습니다.");
      router.push("/");
    },
  });

  return (
    <ShowMoreModalContainer>
      <ItemWrapper onClick={editPost}>수정하기</ItemWrapper>
      <ItemWrapper onClick={() => deletePostMutate(postId as string)}>
        삭제하기
      </ItemWrapper>
    </ShowMoreModalContainer>
  );
};

const ShowMoreModalContainer = styled.div`
  background-color: white;
  width: 11.25rem;
  position: absolute;
  top: 3.75rem;
  right: 2.5rem;
  border: 1px solid #dfdfdf;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
`;

const ItemWrapper = styled.div`
  line-height: 3.5rem;
  cursor: pointer;
  padding-left: 0.75rem;
  :hover {
    background-color: #e6e6e6;
  }
`;

export default ShowMoreModal;
