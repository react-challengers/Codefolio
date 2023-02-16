import { WithPersonType } from "./Components/Post/WithPeople";
import {
  Field,
  WebSubCategory,
  DataSubCategory,
  AppSubCategory,
  ETCSubCategory,
  SoftWareCategory,
} from "./utils/constant/enums";

type Gender = "남자" | "여자" | "선택안함";

type SubCategory =
  | WebSubCategory
  | DataSubCategory
  | AppSubCategory
  | ETCSubCategory
  | SoftWareCategory
  | string;

enum NotificationKind {
  COMMENT = "댓글",
  LIKE = "좋아요",
  FOLLOW = "팔로우",
}

interface UserProfileType {
  id: string;
  user_id: string;
  user_name: string;
  contact_email: string;
  gender: Gender;
  bookmark_folders: string[];
  phone: string;
  field: Field;
  skills: string[];
  career: string;
  is_public: boolean;
  birth_year: number;
  self_profile: string;
}

interface NotificationType {
  id: string;
  user_id: string;
  context: string;
  created_at: Date;
  is_checked: boolean;
  notificationKind: NotificationKind;
  target_id: string;
}

interface PostType {
  title: string;
  sub_title: string;
  title_background_color: string;
  large_category: string;
  sub_category: string;
  skills: string[];
  progress_date: string[];
  members: MembersType[];
  tag: string[];
  is_public: boolean;
  content: string;
  id: string;
  user_id: string;
}

interface FollowType {
  id: string;
  follower_id: string;
  following_id: string;
}

interface BookmarkType {
  id: string;
  post_id: string;
  user_id: string;
}

interface LikeType {
  id: string;
  post_id: string;
  user_id: string;
}

interface CommentType {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
}

interface CommentLikeType {
  id: string;
  comment_id: string;
  user_id: string;
}
