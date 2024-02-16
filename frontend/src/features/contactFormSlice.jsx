import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//API URL
const getAllForms = "http://localhost:8080/api/contactForms/getAllForms";
const deleteContactForm =
  "http://localhost:8080/api/contactForms/deleteContactForm";

//PENDING REQUESTS ASYNC THUNK
export const deleteContactFormAsync = createAsyncThunk(
  "deleteContactForm/ContactForms",
  async (id) => {
    try {
      const response = await axios.post(deleteContactForm, { id });
      toast.success(response.data.message);

      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

//GET ALL USERS
export const getAllFormsAsync = createAsyncThunk(
  "getContactForm/ContactForms",
  async () => {
    try {
      const response = await axios.post(getAllForms);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// INITIAL STATE
const initialState = {
  allForms: [],
  loading: false,
};

const adminInfoSlice = createSlice({
  name: "contactFormSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL Forms
      .addCase(getAllFormsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllFormsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allForms = action.payload;
      });
  },
});

export default adminInfoSlice.reducer;
