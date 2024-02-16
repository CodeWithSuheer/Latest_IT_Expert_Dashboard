import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//API URL
const getAllSupportReq = "http://localhost:8080/api/support/getAllSupports";
// const deleteContactForm = "http://localhost:8080/api/contactForms/deleteContactForm";



//GET ALL USERS
export const getAllSupportReqAsync = createAsyncThunk( "getSupportReq/Support", async () => {
    try {
      const response = await axios.post(getAllSupportReq);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error.response.data.msg);
      throw error;
    }
  }
);

//PENDING REQUESTS ASYNC THUNK
export const deleteContactFormAsync = createAsyncThunk( "deleteContactForm/ContactForms", async (id) => {
    try {
      const response = await axios.post(deleteContactForm, { id });
      toast.success(response.data.message);

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);


// INITIAL STATE
const initialState = {
  allSupportReq: [],
  loading: false,
};

const SupportSlice = createSlice({
  name: "SupportSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL Forms
      .addCase(getAllSupportReqAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllSupportReqAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allSupportReq = action.payload;
      });
  },
});

export default SupportSlice.reducer;
