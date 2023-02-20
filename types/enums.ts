enum Field {
  WEB = "웹",
  APP = "앱",
  SOFTWARE = "소프트웨어",
  DATA = "데이터",
  WEB3 = "블록체인",
  DEVOPS = "데브옵스",
  IOT_AND_EMBEDDED = "IOT,임베디드",
  SECURITY = "보안",
}

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

const rangeType20 = [...Array(21).keys()].map((item) => {
  if (item === 0) return "신입";
  if (item === 20) return "20년차 이상";
  return `${item}년차`;
});

// Object.values(rangeType20) as const;

function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

const Career = strEnum(rangeType20);

export {
  Field,
  WebSubCategory,
  DataSubCategory,
  AppSubCategory,
  ETCSubCategory,
  SoftWareCategory,
  Career,
};
