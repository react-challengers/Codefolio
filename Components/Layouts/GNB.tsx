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
    const getSessionUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        throw new Error(error.message);
      }
      if (data.session) {
        setUserCheck(true);
      } else {
        setUserCheck(false);
      }
    };
    getSessionUser();
  }, [setUserCheck]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
    setUserCheck(false);
    router.push("/");
  };

  if (router.pathname.includes("auth")) return <> </>;

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
        {userCheck ? (
          <>
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
            <ButtonWrapper onClick={() => router.push("/profile")}>
              <Image
                src="/icons/person.svg"
                alt="내 프로필 아이콘"
                width="24"
                height="24"
              />
            </ButtonWrapper>
            <ButtonWrapper onClick={() => handleLogout()}>
              <Image
                src="/icons/logout.svg"
                alt="로그아웃 아이콘"
                width="24"
                height="24"
              />
            </ButtonWrapper>
          </>
        ) : (
          <ButtonWrapper onClick={() => router.push("/auth/login")}>
            <span>LOGIN</span>
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
