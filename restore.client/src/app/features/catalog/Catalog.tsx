import { useEffect } from "react";
import ProductList from "./ProductList";
import Loading from "../../layout/Loading";
import { useAppDispatch, useAppSelector } from "./../../store/configureStore";
import { productsSelectors, fecthProductsAsync } from "./catalogSlice";

export default function Catalog() {
  const products = useAppSelector(productsSelectors.selectAll);
  const { productLoaded, status } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (productLoaded === false) dispatch(fecthProductsAsync());
  }, [productLoaded, dispatch]);

  if (status.includes("pending"))
    return <Loading message="Loading Products..." />;

  return (
    <>
      <ProductList products={products} />
    </>
  );
}
