const { useRouter } = require("next/router");
const { useEffect } = require("react");

const RouteGuard = ({ children }) => {
  const router = useRouter();
  useEffect(() => {
    const publicPaths = ["/", "/login", "/register"];
    const userPaths = ["/profile", "/cart"];
    const adminPaths = ["/dashboard"];

    const pathIsPublic = publicPaths.includes(router.pathname);
    const pathIsUser = userPaths.includes(router.pathname);
    const pathIsAdmin = adminPaths.includes(router.pathname);

    if (router.pathname === "/404") return;

    //TODO : add redirect and auth
  }, [router.pathname]);
  return <>{children}</>;
};

export default RouteGuard;
