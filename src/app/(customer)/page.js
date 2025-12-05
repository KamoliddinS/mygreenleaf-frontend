"use client"

import ProductCard from "./components/ProductCard";
import { useLoad } from "../shared/hooks/requests";
import { ME, PRODUCTS } from "../shared/utils/urls";
import { BottomCartBar } from "./components/BottomCartbar";
import Filter from "./components/Filter";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function CustomerHome() {
  const [bId, setbId] = useState(null)
  const [cId, setcId] = useState(null)
  const loadMe = useLoad({url: ME}, [])
    const params = {};
  if (cId && cId !== "ALL") params.catalogue_id = cId;
  if (bId && bId !== "ALL") params.brand_id = bId;
  const loadProducts = useLoad({ url: PRODUCTS, params: params }, [cId, bId]);
  const products = loadProducts.response ? loadProducts.response : [];
  const me = loadMe?.response ? loadMe?.response : []

  useEffect(() => {
    localStorage.setItem('email', me?.email)
  }, [me])
  

  return (
    <div className="w-full h-full relative pb-[120px]">
        <Filter setcId={setcId} setbId={setbId} />
      <div className="w-full h-full">

        {/* 1. Loading → show spinner */}
        {loadProducts.loading && (
          <div className="w-full h-full pt-[150px] flex flex-col items-center justify-center">
            <LoadingSpinner color="green" width={60} strokeWidth={5} />
          </div>
        )}
      
        {/* 2. Loaded but empty → show Not found */}
  {!loadProducts.loading && products.length === 0 && (
    <div className="w-full h-full pt-[100px] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-[5px]">
        <span className="text-[60px]">🔍</span>
        <span className="font-[500] text-[16px]">No products found</span>
        <span className="text-gray-400 text-[14px]">Check back soon for new products</span>
      </div>
    </div>
  )}

  {/* 3. Loaded with products → show list */}
        {!loadProducts.loading && products.length > 0 && (
          <div className="w-full grid md:grid-cols-3 pt-[30px] grid-cols-1 lg:grid-cols-4 gap-[20px]">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          title={product.title}
          description={product.description}
          tag={product.tag}
          rating={product.rating}
          reviews={product.reviews}
          price={product.price}
          data={product}
        />
      ))}
          </div>
        )}

         </div>

      {/* 👇 Bottom bar */}
      <BottomCartBar />
    </div>
  );
}