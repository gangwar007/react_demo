import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ApiUrls from "../../utils/ApiUrls";

const initialState = {
  userData: [],
  loading:false,
  errorMassege: ''
};

export const fetchUser = createAsyncThunk("fetchUser", async (page) => {

  const response = await fetch(ApiUrls.base_url + "&page=" + page);

  return response.json();
});

const RootReducer = createSlice({
  name: "User",
  initialState,
  reducers:{
    clearAllUser:( state )=> {
      state.userData=[]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state: any, action) => {
      state.loading= false;
      state.userData = [...state.userData,...action.payload?.items];
    });
    builder.addCase(fetchUser.rejected, (state, action ) => {
         state.loading= false;
         state.errorMassege = action.error.message || '';
    });
  },
});

export const {clearAllUser}= RootReducer.actions;

export default RootReducer.reducer;
