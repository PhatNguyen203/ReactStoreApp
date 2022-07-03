import React, { useEffect, useState } from "react";
import Product from "../../models/Product";
import ProductList from "./ProductList";
import agent from "./../../api/agent";
import Loading from "../../layout/Loading";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Catalog.list()
      .then((products) => setProducts(products))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading Products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
