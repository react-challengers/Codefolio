import { init, track, setUserId, reset } from "@amplitude/analytics-browser";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY!;

export const initAmplitude = () => {
  init(API_KEY);
};

// 자신의 맞는 Type을 지정해서 사용하세요. 아래 주석은 코드 예시 입니다.
// logEvent("Button Clicked", {from: "amplitude page"})
export const logEvent = <T>(
  eventName: string,
  eventProperties?: Record<string, T>
) => {
  track(eventName, eventProperties);
};

export const setAmplitudeUserId = (userId: string) => {
  setUserId(userId);
};

export const resetAmplitude = () => {
  reset();
};
