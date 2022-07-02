import React, { useEffect, useState } from "react";
import Product from "../../models/Product";
import ProductList from "./ProductList";
import agent from "./../../api/agent";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    agent.Catalog.list().then((products) => setProducts(products));
  }, []);
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
