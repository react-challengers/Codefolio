import supabase from "@/lib/supabase";
import type { UserResponse } from "@supabase/supabase-js";

/**
 * Get current user data
 * @returns current user data
 * @example
 * const { isLoading: currentUserLoading } = useQuery(["currentUser"], {
 *   queryFn: getCurrentUser,
 *   onSuccess({ data: { user } }) {
 *     if (user) {
 *       setCurrentUserId(user.id);
 *     }
 *   },
 * });
 */
const getCurrentUser = async () => {
  const user: Promise<UserResponse> = supabase.auth.getUser();

  return user;
};

export default getCurrentUser;
