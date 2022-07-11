import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Counter {
  data: number;
  title: string;
}

//initial state
const initialState: Counter = {
  data: 0,
  title: "",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementBy1: (state) => {
      state.data += 1;
      state.title = "Added 1";
    },
    incrementByAny: (state, action: PayloadAction<number>) => {
      state.data += action.payload;
      state.title = "Added by any number";
    },
    decrementBy1: (state) => {
      state.data -= 1;
      state.title = "Minus 1";
    },
  },
});
//generated actions
export const { incrementBy1, incrementByAny, decrementBy1 } =
  counterSlice.actions;
