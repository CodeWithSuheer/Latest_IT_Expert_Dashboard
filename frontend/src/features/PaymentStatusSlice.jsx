import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//API URL
const getAllPaymentProofUrl = "http://localhost:8080/api/paymentProofs/getAllPaymentProofs";
const updatePaymentProofUrl = "http://localhost:8080/api/paymentProofs/updatePaymentProofStatus";


// GET ALL INVOICES ASYNC THUNK
export const getAllPaymentProofsAsync = createAsyncThunk( "allPaymentProofs/getAll",  async () => {
    try {
      const response = await axios.post(getAllPaymentProofUrl);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }
);

// UPDATE INVOICES ASYNC THUNK
export const updatePaymentProofsAsync = createAsyncThunk( "allPaymentProofs/update",  async (formData) => {
    try {
      const response = await axios.post(updatePaymentProofUrl, formData);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }
);


// INITIAL STATE
const initialState = {
  allPaymentProofs: [],
  loading: false,
};

const PaymentStatusSlice = createSlice({
  name: "PaymentStatusSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL INVOICES
      .addCase(getAllPaymentProofsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllPaymentProofsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allPaymentProofs = action.payload;
      })
  },
});

export default PaymentStatusSlice.reducer;



