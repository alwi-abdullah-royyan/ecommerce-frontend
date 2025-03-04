import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Home = () => {
  const router = useRouter();
  return (
    <div className="flex h-full justify-center items-center text-black" onLoad={router.push("/product")}>
      REDIRECTING...
    </div>
  );
};

export default Home;
