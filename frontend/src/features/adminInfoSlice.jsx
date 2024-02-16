import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//API URL
const getUserUrl = "http://localhost:8080/api/user/getAllUsers";
const authorizeUserUrl = "http://localhost:8080/api/user/approveUser";
const rejectUserUrl = "http://localhost:8080/api/user/rejectUser";
const updateRoleUrl = "http://localhost:8080/api/user/updateRole";

export const rejectUserAsync = createAsyncThunk("admininfo/authenticateUser", async (id) => {
  try {
    const response = await axios.post(rejectUserUrl,{id});;
    toast.success(response.data.msg);
    return response.data;
  } catch (error) {
    toast.error( error.response.data.msg);
  }
});

export const authorizeUserAsync = createAsyncThunk("admininfo/authenticateUser", async (id) => {
  try {
    const response = await axios.post(authorizeUserUrl,{id});
    toast.success(response.data.msg);
    return response.data;
  } catch (error) {
    toast.error( error.response.data.msg);
  }
});

export const getAllUsersAsync = createAsyncThunk("user/getAllUser", async () => {
  try {
      const response = await axios.post(getUserUrl);
      // console.log(response.data);
      return response.data;
  } catch (error) {
    throw error
  }
});

export const updateRoleAsync = createAsyncThunk("admininfo/authenticateUser", async ({id,superAdmin}) => {
  try {
    const response = await axios.post(updateRoleUrl,{id,superAdmin});
    toast.success(response.data.msg);
    return response.data;
  } catch (error) {
    toast.error( error.response.data.msg);
  }
});



// INITIAL STATE
const initialState = {
  allUsers:[],
  authorizedUser:null,
  loading: false,
};

const adminInfoSlice = createSlice({
  name: "adminInfoSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL USERS
      .addCase(getAllUsersAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload.users;
    })
  //    // UPDATE ROLE
  //    .addCase(updateRoleAsync.pending, (state, action) => {
  //     state.loading = true;
  //   })
  //   .addCase(updateRoleAsync.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.allUsers = action.payload.users;
  // })
  },
});

export default adminInfoSlice.reducer;
