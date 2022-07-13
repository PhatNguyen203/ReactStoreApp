import { LoadingButton } from "@mui/lab";
import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../errors/NotFound";
import Loading from "../../layout/Loading";
import { currencyFormat } from "../../utils/utils";
import { addBasketItemAsync } from "../Basket/BasketSlice";
import { useAppDispatch, useAppSelector } from "./../../store/configureStore";
import { removeBasketItemAsync } from "./../Basket/BasketSlice";
import { fetchProductAsync, productsSelectors } from "./catalogSlice";

export default function ProdutDetails() {
  const { id } = useParams<{ id: string }>();
  const { basket, status } = useAppSelector((state) => state.basket);
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const product = useAppSelector((state) =>
    productsSelectors.selectById(state, id)
  );
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((item) => item.productId === parseInt(id));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (product === undefined) dispatch(fetchProductAsync(parseInt(id)));
    console.log(product);
  }, [id, item, dispatch, product]);

  function handleInputChange(event: any) {
    if (event.target.value >= 0) setQuantity(parseInt(event.target.value));
  }

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (productStatus.includes("pending"))
    return <Loading message="Loading Product Details..." />;
  if (product === undefined) return <NotFound />;
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyFormat(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity ||
                item?.quantity === 0 ||
                item === undefined
              }
              onClick={handleUpdateCart}
              loading={status === "pendingRemoveIte" + product.id}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Card"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
