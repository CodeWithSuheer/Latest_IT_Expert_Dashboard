import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//API URL
const getAllClientsUrl = "http://localhost:8080/api/clients/getAllClients";


//GET ALL USERS
export const getAllClientsDataAsync = createAsyncThunk("clients/getAllClientsData", async () => {
    try {
        const response = await axios.post(getAllClientsUrl);
        // console.log(response.data);
        return response.data;
    } catch (error) {
      throw error
    }
  });

// INITIAL STATE
const initialState = {
  clientsData: [],
  authorizedUser: null,
  loading: false,
};

const UsersSlice = createSlice({
  name: "UsersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL INVOICES
      .addCase(getAllClientsDataAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllClientsDataAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.clientsData = action.payload;
      });
  },
});

export default UsersSlice.reducer;
