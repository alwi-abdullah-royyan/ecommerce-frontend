import { getAllProduct, getImageProduct, getProductDetail } from "@/services/productService";
import Image from "next/image";
import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const apiTest = async () => {
      const data = await getProductDetail(1);
      console.log(data);
    };
    apiTest();
    const apiTest2 = async () => {
      const data = await getAllProduct();
      console.log(data);
    };
    apiTest2();
    const apiTest3 = async () => {
      const data = await getImageProduct(8);
      console.log(data);
    };
    apiTest3();
  }, []);
  return (
    <div className="text-black">
      <Image src={getImageProduct(8)} alt="ProductImage" width={100} height={100} />
    </div>
  );
};

export default Home;
