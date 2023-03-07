import { useRouter } from "next/router";
import { useEffect } from "react";
/**
 * @see https://velog.io/@bangina/TIL-nextjsreact-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EB%B3%80%EA%B2%BD%EC%8B%9C-%ED%95%A8%EC%88%98-%ED%98%B8%EC%B6%9Cfire-actions-when-router-changed-routeChangeComplete
 * @see https://nextjs.org/docs/api-reference/next/router#usage-6
 */

const useSubscribeRoute = (handleCallback: () => void) => {
  const router = useRouter();
  useEffect(() => {
    router.events.on("routeChangeComplete", handleCallback);
    return () => {
      router.events.off("routeChangeComplete", handleCallback);
    };
  }, []);
};

export default useSubscribeRoute;
