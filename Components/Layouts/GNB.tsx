import { userLoginCheck as recoilUserLoginCheck } from "@/lib/recoil";
import supabase from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

const GNB = () => {
  const router = useRouter();
  const [userCheck, setUserCheck] = useRecoilState(recoilUserLoginCheck);

  useEffect(() => {
    getSessionUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getSessionUser = async () => {
    const { data, error } = await supabase.auth.getSession();
    const results = data.session ? setUserCheck(true) : setUserCheck(false);
    if (error) {
      throw new Error(error.message);
    }
    return results;
  };

  return (
    <GNBContainer>
      <ButtonWrapper onClick={() => router.push("/")}>Codefolio</ButtonWrapper>
      <ButtonsContainer>
        {/* <ButtonWrapper onClick={() => null}>
          <Image
            src="/icons/search.svg"
            alt="검색 아이콘"
            width="24"
            height="24"
          />
        </ButtonWrapper>
        <ButtonWrapper onClick={() => null}>
          <Image
            src="/icons/notification.svg"
            alt="알림 아이콘"
            width="24"
            height="24"
          />
        </ButtonWrapper> */}
        <ButtonWrapper
          onClick={() =>
            router.push(userCheck ? "/create-post" : "/auth/login")
          }
        >
          <Image
            src="/icons/post.svg"
            alt="게시글 등록 아이콘"
            width="24"
            height="24"
          />
        </ButtonWrapper>
        {userCheck ? (
          <ButtonWrapper onClick={() => router.push("/profile")}>
            <Image
              src="/icons/person.svg"
              alt="내 프로필 아이콘"
              width="24"
              height="24"
            />
          </ButtonWrapper>
        ) : (
          <ButtonWrapper onClick={() => router.push("/auth/login")}>
            <span>로그인</span>
          </ButtonWrapper>
        )}
      </ButtonsContainer>
    </GNBContainer>
  );
};

const GNBContainer = styled.div`
  width: 100vw;
  height: 3.5rem;
  background-color: grey;
  position: sticky;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;
  padding: 0.5rem;
`;

export default GNB;
