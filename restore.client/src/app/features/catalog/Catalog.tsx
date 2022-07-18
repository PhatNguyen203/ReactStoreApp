import { useEffect } from "react";
import ProductList from "./ProductList";
import Loading from "../../layout/Loading";
import { useAppDispatch, useAppSelector } from "./../../store/configureStore";
import {
  productsSelectors,
  fecthProductsAsync,
  fetchFiltersAsync,
  setProductParams,
  setPageNumber,
} from "./catalogSlice";
import { Grid, Paper } from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioGroupButton from "../../reuse/RadioGroupButton";
import CheckBoxButtons from "../../reuse/CheckBoxButtons";
import AppPagination from "../../reuse/AppPagination";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to Low" },
  { value: "price", label: "Price - Low to High" },
];

export default function Catalog() {
  const products = useAppSelector(productsSelectors.selectAll);
  const {
    productLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!productLoaded) dispatch(fecthProductsAsync());
  }, [productLoaded, dispatch]);
  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFiltersAsync());
  }, [filtersLoaded, dispatch]);

  if (!filtersLoaded) return <Loading message="Loading Products..." />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{ mb: 2 }}>
          <ProductSearch />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioGroupButton
            options={sortOptions}
            selectedValue={productParams.sortBy}
            onChange={(e: any) =>
              dispatch(setProductParams({ sortBy: e.target.value }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <CheckBoxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products} />
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
        {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
}
