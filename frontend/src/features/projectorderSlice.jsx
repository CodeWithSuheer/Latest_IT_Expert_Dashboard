import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//API URL
const getAllProjectsOrder = "http://localhost:8080/api/ProjectOrder/getAllProjectOrders";

//GET ALL PROJECTS
export const getAllProjectOrderAsync = createAsyncThunk(
  "getAllProjects/Projects",
  async () => {
    try {
      const response = await axios.post(getAllProjectsOrder);
      // console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      // console.log(error.response.data.msg);
      throw error;
    }
  }
);

// INITIAL STATE
const initialState = {
  AllProjectOrder: [],
  loading: false,
};

const ProjectorderSlice = createSlice({
  name: "ProjectorderSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET ALL PROJECTS
      .addCase(getAllProjectOrderAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProjectOrderAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.AllProjectOrder = action.payload;
      });
  },
});

export default ProjectorderSlice.reducer;
