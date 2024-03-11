import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

interface DataState {
  username: string;
}

const dataSlice = createSlice({
  name: "data",
  initialState: {
    username: "",
  } as DataState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
});

export const useUsername = () =>
  useSelector((state: { mainData: DataState }) => state.mainData.username);

export const { setUsername: setUsernameAction } = dataSlice.actions;

export default dataSlice.reducer;
