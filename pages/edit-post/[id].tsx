import Post from "@/Components/CreatePost/Post/Post";
import {
  postContent,
  postMembers,
  postProjectDuration,
  postGithubUrl,
  postDeployedUrl,
  postSkills,
  postSubTitle,
  postTags,
  postTitle,
  postTitleBackgroundImage,
  postSubCategory as recoilPostSubCategory,
  postLargeCategory as recoilPostLargeCategory,
  userLoginCheck,
  postThumbnailCheck,
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
  const setTitleBackgroundColor = useSetRecoilState(postTitleBackgroundImage);
  const setProjectDuration = useSetRecoilState(postProjectDuration);
  const setSkills = useSetRecoilState(postSkills);
  const setTag = useSetRecoilState(postTags);
  const setGithubUrl = useSetRecoilState(postGithubUrl);
  const setDeployedUrl = useSetRecoilState(postDeployedUrl);
  const setMembers = useSetRecoilState(postMembers);
  const setContent = useSetRecoilState(postContent);
  const setPostLargeCategory = useSetRecoilState(recoilPostLargeCategory);
  const setPostSubCategory = useSetRecoilState(recoilPostSubCategory);
  const setIsThumbnail = useSetRecoilState(postThumbnailCheck);

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
    setTitleBackgroundColor(post.title_background_image);
    setProjectDuration(post.progress_date);
    setSkills(post.skills);
    setTag(post.tag);
    setGithubUrl(post.github_url);
    setDeployedUrl(post.deployed_url);
    setMembers(post.members);
    setContent(post.content);
    setPostLargeCategory(post.large_category);
    setPostSubCategory(post.sub_category);
    setIsThumbnail(post.thumbnail_check);
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
