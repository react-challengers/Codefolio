const createNotificationContent = (type: string, title: string) => {
  switch (type) {
    case "like":
      return `님이 ${title} 프로젝트에 좋아요를 눌렀습니다.`;
    case "comment":
      return `님이 ${title} 프로젝트에 리뷰를 남겼습니다.`;
    case "bookmark":
      return `님이 ${title} 프로젝트를 북마크 했습니다.`;
    case "badge":
      return `님이 ${title} 프로젝트에 칭찬뱃지를 남겼습니다.`;
    default:
      return "";
  }
};

export default createNotificationContent;
