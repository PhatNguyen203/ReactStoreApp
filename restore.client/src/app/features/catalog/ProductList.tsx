import { Grid } from "@mui/material";
import React from "react";
import Product from "../../models/Product";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useAppSelector } from "./../../store/configureStore";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productLoaded } = useAppSelector((state) => state.catalog);
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={4} key={product.id}>
          {!productLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
