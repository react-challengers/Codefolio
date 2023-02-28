import Post from "@/Components/CreatePost/Post/Post";
import {
  postContent,
  postMembers,
  postProjectDuration,
  postPublic,
  postSkills,
  postSubTitle,
  postTags,
  postTitle,
  postTitleBackgroundColor,
  postSubCategory as recoilPostSubCategory,
  postLargeCategory as recoilPostLargeCategory,
  userLoginCheck,
} from "@/lib/recoil";
import supabase from "@/lib/supabase";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

const EditPostPage: NextPage = () => {
  const router = useRouter();
  const [post, setPost] = useState<PostType | null>(null);
  const isLogin = useRecoilValue(userLoginCheck);

  useEffect(() => {
    if (!isLogin) {
      router.push("/auth/login");
    }
  }, []);

  const setTitle = useSetRecoilState(postTitle);
  const setSubTitle = useSetRecoilState(postSubTitle);
  const setTitleBackgroundColor = useSetRecoilState(postTitleBackgroundColor);
  const setProjectDuration = useSetRecoilState(postProjectDuration);
  const setSkills = useSetRecoilState(postSkills);
  const setTag = useSetRecoilState(postTags);
  const setIsPublic = useSetRecoilState(postPublic);
  const setMembers = useSetRecoilState(postMembers);
  const setContent = useSetRecoilState(postContent);
  const setPostLargeCategory = useSetRecoilState(recoilPostLargeCategory);
  const setPostSubCategory = useSetRecoilState(recoilPostSubCategory);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;

    const fetchPost = async () => {
      const { data: postData, error } = await supabase
        .from("post")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        router.push("/");
        return;
      }

      if (!postData) {
        router.push("/");
        return;
      }

      setPost(postData);
    };

    fetchPost();
  }, [router.isReady]);

  useEffect(() => {
    if (!post) return;
    setTitle(post.title);
    setSubTitle(post.sub_title);
    setTitleBackgroundColor(post.title_background_color);
    setProjectDuration(post.progress_date);
    setSkills(post.skills);
    setTag(post.tag);
    setIsPublic(post.is_public);
    setMembers(post.members);
    setContent(post.content);
    setPostLargeCategory(post.large_category);
    setPostSubCategory(post.sub_category);
  }, [post]);

  const PostEditor = dynamic(
    () => import("@/Components/CreatePost/PostEditor"),
    {
      ssr: false,
    }
  );

  return (
    <MainWrapper>
      <Post />
      <PostEditor />
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  max-width: 98.75rem;
  margin: 0 auto;
  margin-bottom: 2.5rem;
`;

export default EditPostPage;
