// enum Gender {
//   MALE = '남자',
//   FEMALE = '여자',
//   UNKNOWN = '기타',
//   UNSELECTED = '선택안함',
// }

// enum Field {
//   WEB = '웹',
//   APP = '앱',
//   SOFTWARE = '소프트웨어',
//   DATA = '데이터',
//   WEB3 = '블록체인',
//   DEVOPS = '데브옵스',
//   IOT_AND_EMBEDDED = 'IOT,임베디드',
//   SECURITY = '보안',
// }

// type SubCategory =
//   | WebSubCategory
//   | DataSubCategory
//   | AppSubCategory
//   | ETCSubCategory
//   | SoftWareCategory
//   | string;

// enum WebSubCategory {
//   FRONT_END = '프론트엔드',
//   BACK_END = '백엔드',
//   FULLSTACK = '풀스택',
// }

// enum DataSubCategory {
//   DATA_ENGINEER = '데이터 엔지니어',
//   MACHINE_LEARNING_ENGINEER = '머신러닝 엔지니어',
//   DATA_SCIENCE = '데이터 사이언스 전문가',
// }

// enum AppSubCategory {
//   ANDROID = '안드로이드',
//   IOS = 'iOS',
//   REACT_NATIVE = '리액트 네이티브',
//   FLUTTER = '플러터',
// }

// enum ETCSubCategory {
//   WEB3 = '웹3',
//   DEV_OPS = '데브옵스',
//   IOT_AND_EMBEDDED = 'IOT와 임베디드',
//   SECURITY = '보안',
// }

// enum SoftWareCategory {
//   OFFICE_AUTOMATIC = '사무자동화',
//   FACTORY_AUTOMATIC = '공장자동화',
//   ENTERPRISE_RESOURCE_PLANNING = 'ERP',
//   UNITY = '유니티',
//   UNREAL = '언리얼',
// }

// enum NotificationKind {
//   COMMENT = '댓글',
//   LIKE = '좋아요',
//   FOLLOW = '팔로우',
// }

// interface UserProfileType {
//   id: string;
//   user_id: string;
//   user_name: string;
//   contact_email: string;
//   gender: Gender;
//   bookmark_folders: string[];
//   phone: string;
//   field: Field;
//   skills: string[];
//   careerer: number;
//   is_public: boolean;
//   birth_year: number;
// }

// interface NotificationType {
//   id: string;
//   user_id: string;
//   context: string;
//   created_at: Date;
//   is_checked: boolean;
//   notificationKind: NotificationKind;
//   target_id: string;
// }

// interface PostType {
//   id: string;
//   user_id: string;
//   title: string;
//   content: string;
//   thumbnail: string;
//   large_category: Field;
//   sub_category: SubCategory;
//   created_at: Date;
//   progress_date: [string, string];
//   github_url: string;
//   url: string;
//   is_public: boolean;
//   skills: string[];
//   members: string[];
//   tag: string[];
// }

// interface FollowType {
//   id: string;
//   follower_id: string;
//   following_id: string;
// }

// interface BookmarkType {
//   id: string;
//   post_id: string;
//   user_id: string;
// }

// interface LikeType {
//   id: string;
//   post_id: string;
//   user_id: string;
// }

// interface CommentType {
//   id: string;
//   post_id: string;
//   user_id: string;
//   content: string;
// }

// interface CommentLikeType {
//   id: string;
//   comment_id: string;
//   user_id: string;
// }
