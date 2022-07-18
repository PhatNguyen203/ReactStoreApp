import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import Product, { ProductParams } from "./../../models/Product";
import agent from "./../../api/agent";
import { RootState } from "../../store/configureStore";
import { MetaData } from "./../../models/Pagination";

interface catalogState {
  productLoaded: boolean;
  filtersLoaded: boolean;
  status: string;
  types: string[];
  brands: string[];
  productParams: ProductParams;
  metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();
const initParams = () => {
  return {
    pageNumber: 1,
    size: 6,
    sortBy: "name",
    brands: [],
    types: [],
  };
};

const getAxiosParams = (productParams: ProductParams) => {
  const params = new URLSearchParams();
  params.append("pageNumber", productParams.pageNumber.toString());
  params.append("size", productParams.size.toString());
  params.append("sortBy", productParams.sortBy);

  if (productParams.searchTerm)
    params.append("searchTerm", productParams.searchTerm);
  if (productParams.brands.length > 0)
    params.append("brands", productParams.brands.toString());
  if (productParams.types.length > 0)
    params.append("types", productParams.types.toString());
  return params;
};

export const fecthProductsAsync = createAsyncThunk<
  Product[],
  void,
  { state: RootState }
>("catalog/fetchProductsAsync", async (_, thunkAPI) => {
  const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
  try {
    const response = await agent.Catalog.list(params);
    thunkAPI.dispatch(setMetaData(response.metaData));

    return response.items;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.data });
  }
});
export const fetchProductAsync = createAsyncThunk<Product, number>(
  "catalog/fetchProductAsync",
  async (productId, thunkAPI) => {
    try {
      return await agent.Catalog.details(productId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);
export const fetchFiltersAsync = createAsyncThunk(
  "catalog/fetchFiltersAsync",
  async (_, thunkAPI) => {
    try {
      return await agent.Catalog.fetchFilters();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const catalogSlice = createSlice({
  name: "catalog",
  initialState: productsAdapter.getInitialState<catalogState>({
    productLoaded: false,
    filtersLoaded: false,
    status: "idle",
    brands: [],
    types: [],
    productParams: initParams(),
    metaData: null,
  }),
  reducers: {
    setProductParams: (state, action) => {
      state.productLoaded = false;
      state.productParams = {
        ...state.productParams,
        ...action.payload,
        pageNumber: 1,
      };
    },
    setPageNumber: (state, action) => {
      state.productLoaded = false;
      state.productParams = { ...state.productParams, ...action.payload };
    },
    setMetaData: (state, action) => {
      state.metaData = action.payload;
    },
    resetProductParams: (state) => {
      state.productParams = initParams();
    },
  },
  extraReducers(builder) {
    builder.addCase(fecthProductsAsync.pending, (state) => {
      state.status = "pendingFetchProducts";
    });
    builder.addCase(fecthProductsAsync.fulfilled, (state, action) => {
      productsAdapter.setAll(state, action.payload);
      state.status = "idle";
      state.productLoaded = true;
    });
    builder.addCase(fecthProductsAsync.rejected, (state, action) => {
      console.log(action);
      state.status = "rejected";
      state.productLoaded = false;
    });
    builder.addCase(fetchProductAsync.pending, (state) => {
      state.status = "pendingFetchProduct";
    });
    builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
      productsAdapter.upsertOne(state, action.payload);
      state.status = "idle";
    });
    builder.addCase(fetchProductAsync.rejected, (state, action) => {
      state.status = "rejected";
      console.log(action);
    });
    builder.addCase(fetchFiltersAsync.pending, (state) => {
      state.status = "pendingFetchFilters";
    });
    builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
      state.filtersLoaded = true;
      state.brands = action.payload.brands;
      state.types = action.payload.types;
      state.status = "idle";
    });
    builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
      state.status = "rejected";
      console.log(action);
    });
  },
});

export const productsSelectors = productsAdapter.getSelectors(
  (state: RootState) => state.catalog
);

export const {
  setProductParams,
  resetProductParams,
  setMetaData,
  setPageNumber,
} = catalogSlice.actions;
