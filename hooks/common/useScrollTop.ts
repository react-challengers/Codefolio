import { useCallback } from "react";

const useScrollTop = () => {
  const scrollTop = useCallback(() => {
    window.scrollTo(0, 0);
  }, []);
  return scrollTop;
};

export default useScrollTop;
