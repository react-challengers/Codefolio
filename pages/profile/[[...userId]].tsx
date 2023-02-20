import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import {
  CardItemContainer,
  MyPageContainer,
  MyPageTab,
  TabProfile,
  UserInfoContainer,
} from "@/Components/MyPage";
import { useQueryClient } from "@tanstack/react-query";
import { getAllPosts } from "@/utils/APIs/supabase";
import supabase from "@/lib/supabase";

const tabList = ["프로젝트", "북마크", "좋아요", "프로필"];

const ProfilePage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [userId, setUserId] = useState("");
  const [itemList, setItemList] = useState<PostType[]>([]);
  const [likeIds, setLikeIds] = useState<string[]>([]);
  const [bookmarkIds, setBookmarkIds] = useState<string[]>([]);

  const queryClient = useQueryClient();

  const handleClick = (idx: number) => {
    setCurrentTab(idx);
  };

  const handleUserId = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
      setUserId(data.session?.user.id);
    }
  };

  useEffect(() => {
    handleUserId();
  }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const newQueryData = await queryClient.fetchQuery<PostType[]>(
        ["GET_POSTS"],
        getAllPosts
      );
      return newQueryData;
    };

    const queryData: PostType[] | undefined = queryClient.getQueryData([
      "GET_POSTS",
    ]);
    if (queryData) {
      setItemList(queryData);
    } else {
      fetchAllPosts().then((res) => {
        if (res) {
          setItemList(res);
        }
      });
    }
  }, [queryClient]);

  // 내가 작성한 아이템 리스트
  const myItemList = useMemo(() => {
    return itemList.filter((item) => item.user_id === userId);
  }, [itemList, userId]);

  // 내가 북마크한 아이템 id 리스트
  const fetchBookmarkList = async () => {
    await supabase
      .from("bookmark")
      .select("post_id")
      .eq("user_id", userId)
      .then((res) => {
        if (res) {
          if (res.data === null) return;
          const listIdsList = res.data.map((item) => item.post_id);
          setBookmarkIds(listIdsList);
        }
      });
  };

  const bookmarkList = useMemo(() => {
    if (bookmarkIds) {
      return itemList.filter((item) => bookmarkIds.includes(item.id));
    }
    return itemList;
  }, [bookmarkIds, itemList]);

  // 내가 좋아요한 아이템 리스트
  const fetchLikeList = async () => {
    await supabase
      .from("like")
      .select("post_id")
      .eq("user_id", userId)
      .then((res) => {
        if (res) {
          if (res.data === null) return;
          const listIdsList = res.data.map((item) => item.post_id);
          setLikeIds(listIdsList);
        }
      });
  };

  const likeList = useMemo(() => {
    if (likeIds) {
      return itemList.filter((item) => likeIds.includes(item.id));
    }
    return itemList;
  }, [itemList, likeIds]);

  useEffect(() => {
    if (!userId) return;
    fetchBookmarkList();
    fetchLikeList();
  }, [userId]);

  const filteredItemList = useMemo(() => {
    switch (currentTab) {
      case 0:
        return myItemList;
      case 1:
        return bookmarkList;
      case 2:
        return likeList;
      default:
        return myItemList;
    }
  }, [currentTab, myItemList, bookmarkList, likeList]);

  // TODO: itemList 이용해서 필터링된 카드 아이템 리스트 만들기
  return (
    <MyPageContainer>
      <UserInfoContainer />
      <MyPageTab
        tabList={tabList}
        currentTab={currentTab}
        onClick={handleClick}
      />
      <ContentContainer>
        {currentTab === tabList.length - 1 ? (
          <TabProfile />
        ) : (
          <CardItemContainer itemList={filteredItemList} />
        )}
      </ContentContainer>
    </MyPageContainer>
  );
};

const ContentContainer = styled.div`
  width: 64rem;
`;

export default ProfilePage;
