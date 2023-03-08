import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost } from "@/utils/APIs/supabase";
import ConfirmModal from "@/Components/Common/ConfirmModal";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import styled from "styled-components";
import useOutsideClick from "@/hooks/query/useOutsideClick";

interface ShowMoreModalProps {
  closeModal: () => void;
}

const ShowMoreModal = ({ closeModal }: ShowMoreModalProps) => {
  const router = useRouter();
  const {
    query: { id: postId },
  } = router;
  const modalRef = useRef<any>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const queryClient = useQueryClient();

  useOutsideClick(modalRef, () => setShowDeleteModal(false));

  const editPost = async () => {
    router.push(`/edit-post/${postId}`);
  };

  const { mutate: deletePostMutate } = useMutation(deletePost, {
    onSuccess: async () => {
      queryClient.invalidateQueries(["GET_INFINITE_POSTS"]);
      router.push("/");
    },
  });

  const onClickDeleteButton = () => {
    setShowDeleteModal(true);
  };

  return (
    <ShowMoreModalContainer>
      <ItemWrapper onClick={editPost}>수정하기</ItemWrapper>
      <ItemWrapper onClick={onClickDeleteButton}>삭제하기</ItemWrapper>
      {showDeleteModal && (
        <ConfirmModal
          type="warn"
          bodyText="글을 삭제하시겠습니까?"
          leftText="취소"
          rightText="삭제"
          onClickLeft={() => setShowDeleteModal(false)}
          onClickRight={() => deletePostMutate(postId as string)}
        />
      )}
    </ShowMoreModalContainer>
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
  z-index: 2;
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
