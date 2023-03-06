import { useEffect } from "react";

/**
 * @see https://joylee-developer.tistory.com/185
 * 뒷배경 스크롤을 정지시킵니다.
 * Model과 함께 사용할 것을 권장합니다.
 */

const useStopScroll = () => {
  // 모달 오버레이에서 스크롤 방지
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);
};

export default useStopScroll;
