import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "../../layout/Loading";
import { Basket } from "../../models/Basket";
import agent from "./../../api/agent";

export default function BasketPage() {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>();

  useEffect(() => {
    agent.Basket.getBasket()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading message="Loading Basket..." />;
  if (basket == null)
    return <Typography variant="h3">Your Cart is Empty</Typography>;

  return <h1>Buyer Id = {basket.buyerId}</h1>;
}
