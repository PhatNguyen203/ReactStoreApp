import { Button, ButtonGroup, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { decrementBy1, incrementBy1, incrementByAny } from "./counterSlice";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);
  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography variant="h3">{data}</Typography>
      <ButtonGroup>
        <Button
          onClick={() => dispatch(incrementBy1())}
          variant="contained"
          color="secondary"
        >
          INCREMENT BY 1
        </Button>
        <Button
          onClick={() => dispatch(incrementByAny(4))}
          variant="contained"
          color="primary"
        >
          INCREMENT
        </Button>
        <Button
          onClick={() => dispatch(decrementBy1())}
          variant="contained"
          color="error"
        >
          DECREMENT
        </Button>
      </ButtonGroup>
    </>
  );
}
