type Gender = "남자" | "여자" | "선택안함";

type PostBadge = "idea" | "complete" | "code" | "function";

declare enum Field {
  WEB = "웹",
  APP = "앱",
  SOFTWARE = "소프트웨어",
  DATA = "데이터",
  WEB3 = "블록체인",
  DEVOPS = "데브옵스",
  IOT_AND_EMBEDDED = "IOT,임베디드",
  SECURITY = "보안",
}

type SubCategory =
  | WebSubCategory
  | DataSubCategory
  | AppSubCategory
  | ETCSubCategory
  | SoftWareCategory
  | string;

enum WebSubCategory {
  FRONT_END = "프론트엔드",
  BACK_END = "백엔드",
  FULLSTACK = "풀스택",
}

enum DataSubCategory {
  DATA_ENGINEER = "데이터 엔지니어",
  MACHINE_LEARNING_ENGINEER = "머신러닝 엔지니어",
  DATA_SCIENCE = "데이터 사이언스 전문가",
}

enum AppSubCategory {
  ANDROID = "안드로이드",
  IOS = "iOS",
  REACT_NATIVE = "리액트 네이티브",
  FLUTTER = "플러터",
}

enum ETCSubCategory {
  WEB3 = "웹3",
  DEV_OPS = "데브옵스",
  IOT_AND_EMBEDDED = "IOT와 임베디드",
  SECURITY = "보안",
}

enum SoftWareCategory {
  OFFICE_AUTOMATIC = "사무자동화",
  FACTORY_AUTOMATIC = "공장자동화",
  ENTERPRISE_RESOURCE_PLANNING = "ERP",
  UNITY = "유니티",
  UNREAL = "언리얼",
}

enum NotificationKind {
  COMMENT = "comment",
  LIKE = "like",
  BOOKMARK = "bookmark",
  POST_BADGE = "badge",
  PROFILE_BADGE = "profileBadge",
}

interface UserProfileType {
  id: string;
  user_id: string;
  user_name: string;
  contact_email: string;
  gender: Gender;
  bookmark_folders: string[];
  phone: string;
  field: string[];
  skills: string[];
  career: string;
  is_public: boolean;
  birth_year: number;
  self_profile: string;
  profile_image: string;
  background_image: string;
  github: string;
}

interface NotificationType {
  id: string;
  created_at: Date;
  user_id: string;
  target_id: string;
  post_id?: string;
  content: string;
  type: NotificationKind;
  is_read: boolean;
}

interface PostType {
  title: string;
  sub_title: string;
  title_background_color: string;
  large_category: string;
  sub_category: string;
  skills: string[];
  progress_date: [string, string];
  members: MembersType[];
  tag: string[];
  is_public: boolean;
  content: string;
  id: string;
  user_id: string;
  created_at: string;
  comment_count: number;
  like_count: number;
  bookmark_count: number;
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
  created_at: string;
}

interface CommentLikeType {
  id: string;
  comment_id: string;
  user_id: string;
}

interface ProfileBadgeType {
  id: string;
  created_at: Date;
  user_id: string;
  profile_id: string;
  BadgeKind:
    | "communication"
    | "implementation"
    | "initiative"
    | "pencil"
    | "puzzle";
}
