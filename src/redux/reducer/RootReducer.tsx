import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiUrls from "../../utils/ApiUrls";

const initialState = {
  userData: [],
};

export const fetchUser = createAsyncThunk("fetchUser", async (page) => {
  console.log("URL--->", ApiUrls.base_url + "&page=" + page);
  const response = await fetch(ApiUrls.base_url + "&page=" + page);

  return response.json();
});

const RootReducer = createSlice({
  name: "User",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.userData = [];
    });
    builder.addCase(fetchUser.fulfilled, (state: any, action) => {
      state.userData = action.payload;
    });
  },
  reducers: {},
});

export default RootReducer.reducer;
