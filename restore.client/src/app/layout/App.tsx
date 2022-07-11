import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Catalog from "../features/catalog/Catalog";
import HomePage from "../features/home/HomePage";
import Header from "./Header";
import AboutPage from "./../features/about/AboutPage";
import ContactPage from "../features/contact/ContactPage";
import ProdutDetails from "../features/catalog/ProdutDetails";
import { ToastContainer } from "react-toastify";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../features/Basket/BasketPage";
import { getCookie } from "./../utils/utils";
import agent from "./../api/agent";
import Loading from "./Loading";
import CheckoutPage from "./../checkout/CheckoutPage";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../features/Basket/BasketSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("BuyerId");
    if (buyerId) {
      agent.Basket.getBasket()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });
  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  if (loading) return <Loading message="Initial..." />;

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar />
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/catalog" component={Catalog} />
          <Route path="/catalog/:id" component={ProdutDetails} />
          <Route path="/about" component={AboutPage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/basket" component={BasketPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/server-error" component={ServerError} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
