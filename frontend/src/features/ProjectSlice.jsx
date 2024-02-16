import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

//API URL
const createProjects = "http://localhost:8080/api/projects/createProject";
const getAllProjects = "http://localhost:8080/api/projects/getAllProjects";
const updateProjects = "http://localhost:8080/api/projects/updateProject";

// CREATE PROJECTS
export const createProjectsAsync = createAsyncThunk("createProjects/Projects", async (formData) => {
    try {
      const response = await axios.post(createProjects, formData);
      console.log(response.data);
      toast.success(response.data.msg);
      return response.data;
    } catch (error) {
      // console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
      throw error;
    }
  }
);

//GET ALL PROJECTS
export const getAllProjectsAsync = createAsyncThunk("getAllProjects/Projects", async () => {
    try {
      const response = await axios.post(getAllProjects);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      // console.log(error.response.data.msg);
      throw error;
    }
  }
);

// UPDATE PROJECTS
export const updateProjectsAsync = createAsyncThunk("updateProjects/Projects", async (formData) => {
    try {
      const response = await axios.post(updateProjects, formData);
      console.log(response.data);
      toast.success(response.data.msg);
      return response.data;
    } catch (error) {
      // console.log(error.response.data.msg);
      throw error;
    }
  }
);

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

// INITIAL STATE
const initialState = {
  createProject: null,
  allProjects: [],
  loading: false,
};

const ProjectSlice = createSlice({
  name: "ProjectSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // CREATE PROJECTS
      .addCase(createProjectsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createProjectsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.createProject = action.payload;
      })

      // GET ALL PROJECTS
      .addCase(getAllProjectsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllProjectsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.allProjects = action.payload;
      });
  },
});

export default ProjectSlice.reducer;
