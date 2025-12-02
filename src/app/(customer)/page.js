"use client"

import ProductCard from "./components/ProductCard";
import { useLoad } from "../shared/hooks/requests";
import { PRODUCTS } from "../shared/utils/urls";
import { BottomCartBar } from "./components/BottomCartbar";
import Filter from "./components/Filter";

export default function CustomerHome() {
  const loadProducts = useLoad({ url: PRODUCTS }, []);
  const products = loadProducts.response ? loadProducts.response : [];

  return (
    <div className="w-full relative pb-[120px]">
      <Filter />
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

      {/* 👇 Bottom bar */}
      <BottomCartBar />
    </div>
  );
}