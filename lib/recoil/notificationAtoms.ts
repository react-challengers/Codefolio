import { atom } from "recoil";

const isNotificationState = atom({
  key: "isNotificationState",
  default: false,
});

export default isNotificationState;
