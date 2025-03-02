import { getToken, refreshToken } from "./authService";

const { useRouter } = require("next/router");
const { useEffect } = require("react");

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const oldToken = getToken();

  useEffect(() => {
    const regenerateToken = async () => {
      try {
        const response = await refreshToken(oldToken);

        if (response?.data?.token) {
          localStorage.setItem("token", response.data.token);
        }
      } catch (err) {
        console.log("Failed to refresh token");
        return err;
      }
    };
    regenerateToken();
    // ✅ Store token first
    const publicPaths = ["/", "/login", "/register"];
    const userPaths = ["/profile", "/cart"];
    const adminPaths = ["/dashboard"];

    const pathIsPublic = publicPaths.includes(router.pathname);
    const pathIsUser = userPaths.includes(router.pathname);
    const pathIsAdmin = adminPaths.includes(router.pathname);

    if (router.pathname === "/404") return;

    //TODO : add redirect and auth
  }, [router.pathname, oldToken]);
  return <>{children}</>;
};

export default RouteGuard;
