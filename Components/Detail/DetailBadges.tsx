import { useState } from "react";
import styled from "styled-components";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/utils/APIs/supabase";
import { useRouter } from "next/router";
import addPostBadge from "@/utils/APIs/supabase/addPostBadge";
import deletePostBadge from "@/utils/APIs/supabase/deletePostBadge";
import getPostBadges from "@/utils/APIs/supabase/getPostBadges";
import getBadgeByUid from "@/utils/APIs/supabase/getBadgeByUid";
import LoginModal from "./LoginModal";

interface DetailBadgesProps {
  closeModal?: () => void;
}

const DetailBadges = ({ closeModal }: DetailBadgesProps) => {
  const queryClient = new QueryClient();
  const router = useRouter();

  const postId = router.query?.id;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [ideaNum, setIdeaNum] = useState(0);
  const [completeNum, setCompleteNum] = useState(0);
  const [codeNum, setCodeNum] = useState(0);
  const [functionNum, setFunctionNum] = useState(0);
  const [badgeCheck, setBadgeCheck] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | undefined>("");

  useQuery(["currentUser"], getCurrentUser, {
    onSuccess: ({ data: { user } }) => {
      if (user) setUserId(user.id);
    },
  });

  const { refetch: refetchPostBadge } = useQuery(
    ["getPostBadge", { postId }],
    getPostBadges,
    {
      onSuccess: (data) => {
        if (!data) return;

        let idea = 0;
        let complete = 0;
        let code = 0;
        let func = 0;
        data.forEach(({ type }: any) => {
          if (type === "idea") idea += 1;
          if (type === "complete") complete += 1;
          if (type === "code") code += 1;
          if (type === "function") func += 1;
        });

        setIdeaNum(idea);
        setCompleteNum(complete);
        setCodeNum(code);
        setFunctionNum(func);
      },
    }
  );
  // console.log(data);
  const { refetch: refetchPostBadgeByUserId } = useQuery(
    ["getPostBadgeByUserId", { userId, postId }],
    getBadgeByUid,
    {
      onSuccess: (data) => {
        const badgeList = data.map((v) => v.type);
        setBadgeCheck(badgeList);
      },
    }
  );

  const { mutate: addBadge } = useMutation(addPostBadge, {
    onSuccess: () => {
      refetchPostBadge();
      refetchPostBadgeByUserId();
      // queryClient.invalidateQueries({ queryKey: ["getPostBadge", { postId }] });
      // queryClient.invalidateQueries({
      //   queryKey: ["getPostBadgeByUserId", { userId, postId }],
      // });
    },
  });
  const { mutate: deleteBadge } = useMutation(deletePostBadge, {
    onSuccess: () => {
      refetchPostBadge();
      refetchPostBadgeByUserId();
      // queryClient.invalidateQueries({ queryKey: ["getPostBadge", { postId }] });
      // queryClient.invalidateQueries({
      //   queryKey: ["getPostBadgeByUserId", { userId, postId }],
      // });
    },
  });

  const clickBadge = (badgeType: PostBadge) => {
    if (!userId || !postId) return setShowLoginModal(true);

    if (badgeCheck.includes(badgeType)) {
      const newBadgeCheck = badgeCheck.filter((badge) => badge !== badgeType);
      setBadgeCheck(newBadgeCheck);
      deleteBadge({ userId, postId: postId as string, type: badgeType });
    } else {
      setBadgeCheck([...badgeCheck, badgeType]);
      addBadge({ userId, postId: postId as string, type: badgeType });
    }

    if (closeModal) {
      closeModal();
    }
  };

  return (
    <>
      <BadgesWrapper>
        <BadgeWrapper
          onClick={() => clickBadge("idea")}
          badgeCheck={badgeCheck}
          badge="idea"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.25 18H15.75V19.5H8.25V18ZM9.75 21H14.25V22.5H9.75V21ZM12 1.5C10.0109 1.5 8.10323 2.29018 6.6967 3.6967C5.29018 5.10322 4.5 7.01088 4.5 9C4.44928 10.09 4.65808 11.1765 5.10923 12.17C5.56037 13.1636 6.24096 14.0358 7.095 14.715C7.845 15.4125 8.25 15.81 8.25 16.5H9.75C9.75 15.12 8.9175 14.3475 8.1075 13.605C7.40652 13.0682 6.84786 12.3677 6.48044 11.5649C6.11302 10.7621 5.94806 9.88138 6 9C6 7.4087 6.63214 5.88258 7.75736 4.75736C8.88258 3.63214 10.4087 3 12 3C13.5913 3 15.1174 3.63214 16.2426 4.75736C17.3679 5.88258 18 7.4087 18 9C18.0511 9.88203 17.885 10.7631 17.5162 11.566C17.1475 12.3689 16.5874 13.069 15.885 13.605C15.0825 14.355 14.25 15.105 14.25 16.5H15.75C15.75 15.81 16.1475 15.4125 16.905 14.7075C17.7585 14.0295 18.4387 13.1585 18.8899 12.1663C19.341 11.174 19.5501 10.0888 19.5 9C19.5 8.01509 19.306 7.03982 18.9291 6.12987C18.5522 5.21993 17.9997 4.39314 17.3033 3.6967C16.6069 3.00026 15.7801 2.44781 14.8701 2.0709C13.9602 1.69399 12.9849 1.5 12 1.5Z"
              fill="#CCCCCC"
            />
          </svg>
          <p>굿아이디어</p>
          <p>{ideaNum}</p>
        </BadgeWrapper>
        <BadgeWrapper
          onClick={() => clickBadge("complete")}
          badgeCheck={badgeCheck}
          badge="complete"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.2565 8.08983L17.0768 8.91015L10.25 15.737L6.9232 12.4101L7.74351 11.5898L10.25 14.0963L16.2565 8.08983ZM12 2.66666C12.8568 2.66666 13.6832 2.77603 14.4792 2.99478C15.2752 3.21353 16.0196 3.52647 16.7123 3.93358C17.405 4.3407 18.0339 4.82681 18.599 5.39192C19.1641 5.95702 19.6502 6.58897 20.0573 7.28775C20.4644 7.98654 20.7774 8.73089 20.9961 9.52082C21.2149 10.3108 21.3273 11.1371 21.3334 12C21.3334 12.8568 21.224 13.6831 21.0052 14.4792C20.7865 15.2752 20.4735 16.0195 20.0664 16.7122C19.6593 17.4049 19.1732 18.0338 18.6081 18.5989C18.043 19.1641 17.411 19.6502 16.7123 20.0573C16.0135 20.4644 15.2691 20.7773 14.4792 20.9961C13.6893 21.2148 12.8629 21.3272 12 21.3333C11.1432 21.3333 10.3169 21.2239 9.52085 21.0052C8.72485 20.7864 7.98049 20.4735 7.28778 20.0664C6.59507 19.6593 5.96617 19.1732 5.40106 18.6081C4.83596 18.043 4.34985 17.411 3.94273 16.7122C3.53561 16.0134 3.22268 15.2721 3.00393 14.4883C2.78518 13.7044 2.67276 12.875 2.66669 12C2.66669 11.1432 2.77606 10.3168 2.99481 9.52082C3.21356 8.72482 3.5265 7.98046 3.93361 7.28775C4.34073 6.59504 4.82684 5.96614 5.39195 5.40103C5.95705 4.83593 6.589 4.34982 7.28778 3.9427C7.98657 3.53558 8.72788 3.22265 9.51174 3.0039C10.2956 2.78515 11.125 2.67273 12 2.66666ZM12 20.1667C12.7474 20.1667 13.4675 20.0694 14.1602 19.875C14.8529 19.6805 15.5031 19.4071 16.1107 19.0547C16.7183 18.7022 17.2713 18.2739 17.7696 17.7695C18.2678 17.2652 18.6932 16.7153 19.0456 16.1198C19.398 15.5243 19.6745 14.8741 19.875 14.1693C20.0755 13.4644 20.1728 12.7413 20.1667 12C20.1667 11.2526 20.0695 10.5325 19.875 9.83983C19.6806 9.14713 19.4071 8.49695 19.0547 7.88931C18.7023 7.28167 18.2739 6.72872 17.7696 6.23046C17.2652 5.73219 16.7153 5.30685 16.1198 4.95442C15.5243 4.60199 14.8742 4.32551 14.1693 4.12499C13.4644 3.92447 12.7413 3.82725 12 3.83332C11.2526 3.83332 10.5326 3.93055 9.83986 4.12499C9.14716 4.31943 8.49698 4.59287 7.88934 4.9453C7.2817 5.29773 6.72875 5.72612 6.23049 6.23046C5.73223 6.7348 5.30688 7.28471 4.95445 7.8802C4.60202 8.47568 4.32554 9.12586 4.12502 9.83072C3.9245 10.5356 3.82728 11.2587 3.83335 12C3.83335 12.7474 3.93058 13.4674 4.12502 14.1601C4.31946 14.8529 4.5929 15.503 4.94533 16.1107C5.29776 16.7183 5.72615 17.2713 6.23049 17.7695C6.73483 18.2678 7.28474 18.6931 7.88023 19.0456C8.47571 19.398 9.12589 19.6745 9.83075 19.875C10.5356 20.0755 11.2587 20.1727 12 20.1667Z"
              fill="#CCCCCC"
            />
          </svg>
          <p>완성도대박</p>
          <p>{completeNum}</p>
        </BadgeWrapper>
        <BadgeWrapper
          onClick={() => clickBadge("code")}
          badgeCheck={badgeCheck}
          badge="code"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V18C21 18.7956 20.6839 19.5587 20.1213 20.1213C19.5587 20.6839 18.7956 21 18 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6C3 5.20435 3.31607 4.44129 3.87868 3.87868ZM6 4.5C5.60218 4.5 5.22064 4.65804 4.93934 4.93934C4.65804 5.22064 4.5 5.60218 4.5 6V18C4.5 18.3978 4.65804 18.7794 4.93934 19.0607C5.22064 19.342 5.60218 19.5 6 19.5H18C18.3978 19.5 18.7794 19.342 19.0607 19.0607C19.342 18.7794 19.5 18.3978 19.5 18V6C19.5 5.60218 19.342 5.22064 19.0607 4.93934C18.7794 4.65804 18.3978 4.5 18 4.5H6ZM10.2803 9.21967C10.5732 9.51256 10.5732 9.98744 10.2803 10.2803L8.56066 12L10.2803 13.7197C10.5732 14.0126 10.5732 14.4874 10.2803 14.7803C9.98744 15.0732 9.51256 15.0732 9.21967 14.7803L6.96967 12.5303C6.67678 12.2374 6.67678 11.7626 6.96967 11.4697L9.21967 9.21967C9.51256 8.92678 9.98744 8.92678 10.2803 9.21967ZM13.7197 9.21967C14.0126 8.92678 14.4874 8.92678 14.7803 9.21967L17.0303 11.4697C17.3232 11.7626 17.3232 12.2374 17.0303 12.5303L14.7803 14.7803C14.4874 15.0732 14.0126 15.0732 13.7197 14.7803C13.4268 14.4874 13.4268 14.0126 13.7197 13.7197L15.4393 12L13.7197 10.2803C13.4268 9.98744 13.4268 9.51256 13.7197 9.21967Z"
              fill="#CCCCCC"
            />
          </svg>

          <p>훌륭한코드</p>
          <p>{codeNum}</p>
        </BadgeWrapper>
        <BadgeWrapper
          onClick={() => clickBadge("function")}
          badgeCheck={badgeCheck}
          badge="function"
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9.34914 2.85567C9.41682 2.55051 9.68742 2.33334 10 2.33334H14C14.3125 2.33334 14.583 2.55038 14.6508 2.85542L15.1269 4.99855C15.6104 5.2144 16.0702 5.47981 16.4989 5.79051L18.5938 5.1311C18.8919 5.03729 19.2151 5.16307 19.3713 5.43367L21.3713 8.89767C21.5275 9.16822 21.4749 9.51095 21.2448 9.72218L19.6266 11.2073C19.6809 11.7337 19.6809 12.2643 19.6266 12.7908L21.2448 14.2758C21.4749 14.4871 21.5275 14.8298 21.3713 15.1004L19.3713 18.5644C19.2151 18.835 18.8919 18.9607 18.5938 18.8669L16.4993 18.2076C16.0706 18.5189 15.6107 18.7849 15.127 19.0012L14.6508 21.1446C14.583 21.4496 14.3125 21.6667 14 21.6667H10C9.68752 21.6667 9.41697 21.4496 9.3492 21.1446L8.87305 19.0015C8.38957 18.7856 7.92978 18.5202 7.50106 18.2095L5.40616 18.8689C5.10811 18.9627 4.78489 18.837 4.62865 18.5664L2.62865 15.1024C2.47245 14.8318 2.52506 14.4891 2.75523 14.2778L4.37345 12.7927C4.31919 12.2663 4.31919 11.7356 4.37347 11.2092L2.75509 9.72305C2.52503 9.5118 2.47248 9.16916 2.62865 8.89867L4.62865 5.43467C4.78489 5.16407 5.10811 5.03829 5.40616 5.1321L7.50096 5.79148C7.92994 5.48042 8.39005 5.21472 8.87389 4.99864L9.34914 2.85567ZM10.535 3.66668L10.1008 5.62435C10.0527 5.84126 9.89974 6.01995 9.69283 6.10088C9.09924 6.33304 8.54415 6.65359 8.04636 7.05167C7.87289 7.1904 7.64171 7.23361 7.42983 7.16692L5.51594 6.56449L4.05059 9.10248L5.52891 10.46C5.69215 10.6099 5.77022 10.8311 5.73724 11.0502C5.64237 11.6805 5.64237 12.3215 5.73724 12.9518C5.77023 13.171 5.6921 13.3923 5.52876 13.5422L4.05067 14.8987L5.51594 17.4365L7.42983 16.8341C7.64165 16.7674 7.87277 16.8106 8.04623 16.9492C8.54378 17.3469 9.09855 17.6672 9.69177 17.8991C9.89863 17.98 10.0516 18.1586 10.0998 18.3754L10.5348 20.3333H13.4652L13.9002 18.3754C13.9483 18.1588 14.1011 17.9803 14.3078 17.8993C14.9011 17.6668 15.4559 17.346 15.9533 16.9476C16.1268 16.8087 16.3581 16.7654 16.5702 16.8321L18.484 17.4345L19.9493 14.8967L18.4712 13.5402C18.3079 13.3903 18.2297 13.169 18.2628 12.9497C18.3577 12.3195 18.3577 11.6786 18.2628 11.0483C18.2297 10.8291 18.3079 10.6077 18.4712 10.4578L19.9493 9.10134L18.484 6.56349L16.5702 7.16592C16.3583 7.23259 16.1272 7.18942 15.9538 7.05078C15.4562 6.65311 14.9014 6.33286 14.3082 6.1009C14.1014 6.02001 13.9484 5.84142 13.9002 5.6246L13.4652 3.66668H10.535Z"
              fill="#CCCCCC"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 9.66668C10.7113 9.66668 9.66668 10.7113 9.66668 12C9.66668 13.2887 10.7113 14.3333 12 14.3333C13.2887 14.3333 14.3333 13.2887 14.3333 12C14.3333 10.7113 13.2887 9.66668 12 9.66668ZM8.33334 12C8.33334 9.97497 9.97497 8.33334 12 8.33334C14.0251 8.33334 15.6667 9.97497 15.6667 12C15.6667 14.0251 14.0251 15.6667 12 15.6667C9.97497 15.6667 8.33334 14.0251 8.33334 12Z"
              fill="#CCCCCC"
            />
          </svg>
          <p>다양한기능</p>
          <p>{functionNum}</p>
        </BadgeWrapper>
      </BadgesWrapper>
      {showLoginModal && (
        <LoginModal
          onCancel={() => setShowLoginModal(false)}
          onLogin={() => router.push("/auth/login")}
        />
      )}
    </>
  );
};

const BadgesWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

interface BadgeWrapperProps {
  badgeCheck: string[];
  badge: string;
}

const BadgeWrapper = styled.div<BadgeWrapperProps>`
  ${({ theme }) => theme.fonts.body14}

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  cursor: pointer;
  color: ${({ theme, badgeCheck, badge }) =>
    theme.colors[badgeCheck.includes(badge) ? "primary6" : "gray3"]};

  path {
    ${({ theme, badgeCheck, badge }) =>
      badgeCheck.includes(badge) && `fill: ${theme.colors.primary6}`};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary6};
    path {
      fill: ${({ theme }) => theme.colors.primary6};
    }
  }
`;

export default DetailBadges;
