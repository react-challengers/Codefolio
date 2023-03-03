import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/utils/APIs/supabase";
import SimpleModal from "@/Components/Common/SimpleModal";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

interface ShowMoreModalProps {
  closeModal: () => void;
}

const ShowMoreModal = ({ closeModal }: ShowMoreModalProps) => {
  const router = useRouter();
  const {
    query: { id: postId },
  } = router;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      router.push("/");
    },
  });

  const onClickDeleteButton = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <ShowMoreModalContainer>
        <ItemWrapper onClick={editPost}>수정하기</ItemWrapper>
        <ItemWrapper onClick={onClickDeleteButton}>삭제하기</ItemWrapper>
      </ShowMoreModalContainer>
      {showDeleteModal && (
        <SimpleModal
          bodyText="글을 삭제하시겠습니까?"
          leftText="취소"
          rightText="삭제"
          onClickLeft={() => setShowDeleteModal(false)}
          onClickRight={() => deletePostMutate(postId as string)}
        />
      )}
    </>
  );
};

const ShowMoreModalContainer = styled.div`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.gray9};
  width: 11.25rem;
  position: absolute;
  top: 3.75rem;
  right: 1rem;
  box-shadow: 0rem 0.25rem 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.25rem;
`;

const ItemWrapper = styled.div`
  line-height: 3.5rem;
  cursor: pointer;
  padding-left: 0.75rem;
  :hover {
    background-color: ${({ theme }) => theme.colors.gray8};
  }
`;

export default ShowMoreModal;
