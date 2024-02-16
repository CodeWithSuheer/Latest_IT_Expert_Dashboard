import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createProjectsAsync,
  getAllProjectsAsync,
} from "../../../features/ProjectSlice";
import "./Projects.css";
import { useNavigate } from "react-router-dom";

const AddProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialFormData = {
    projectTitle: "",
    companyName: "",
    startDate: "",
    Deadline: "",
    customerId: "",
    amount: 0,
    projectDescription: "",
    projectProgress: [
      {
        title: "",
        description: "",
      },
    ],
    orderId: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  // Update form data on input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the input belongs to projectProgress, handle nested fields
    if (name.startsWith("projectProgress.")) {
      const [parent, field] = name.split(".");
      setFormData((prevData) => {
        const newData = { ...prevData };

        if (!newData[parent]) {
          newData[parent] = [{}];
        }

        if (!newData[parent][0]) {
          newData[parent][0] = {};
        }

        newData[parent][0][field] = value;
        return { ...newData };
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // HANDLE SUBMIT FUNCIION
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    dispatch(createProjectsAsync(formData)).then(() => {
      dispatch(getAllProjectsAsync());
      // navigate("/adminpanel/projects");
    });
  };

  return (
    <>
      <div className="py-10 px-4 md:px-8 rounded-md bg-white">
        {/* HEADER */}
        <div className="items-start justify-between md:flex">
          <div className="max-w-4xl">
            <h3 className="text-gray-800 text-2xl font-semibold tracking-wide sm:text-3xl">
              ADD PROJECTS
            </h3>
          </div>
        </div>
        {/* BODY */}
        <div className="addProjects_body mt-14">
          <form onSubmit={handleSubmit}>
            {/* --------------- FIRST ROW --------------- */}
            <div className="mb-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
              <div>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block project_input w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-500 placeholder:text-lg text-gray-800 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="projectTitle"
                    placeholder="Project Title"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block project_input w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-500 placeholder:text-lg text-gray-500 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2.5">
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block project_input w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-500 placeholder:text-lg text-gray-500 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* --------------- SECOND ROW --------------- */}
            <div className="mb-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="customerId"
                    placeholder="Customer ID"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block project_input w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-500 placeholder:text-lg text-gray-500 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="orderId"
                    placeholder="Order ID"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block project_input w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-500 placeholder:text-lg text-gray-500 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* --------------- THIRD ROW --------------- */}
            <div className="mb-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <div className="mt-1.5">
                  <label
                    className="text-gray-600 ml-1 font-medium text-lg"
                    htmlFor="password"
                  >
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    placeholder="Company Name"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block project_input w-full mt-1 pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-500 placeholder:text-lg text-gray-500 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <div className="mt-1.5">
                  <label
                    className="text-gray-600 ml-1 font-medium text-lg"
                    htmlFor="password"
                  >
                    Deadline
                  </label>
                  <input
                    type="date"
                    name="Deadline"
                    placeholder="Project Title"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block project_input w-full mt-1 pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-500 placeholder:text-lg text-gray-500 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* --------------- FORTH ROW --------------- */}
            <div className="mb-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
              <div>
                <div className="mt-1.5">
                  <label
                    className="text-gray-700 ml-1 font-medium text-lg"
                    htmlFor="password"
                  >
                    Project Progress
                  </label>
                  <input
                    type="text"
                    name="projectProgress.title"
                    placeholder="Project Title"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block project_input mt-1 w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-500 placeholder:text-lg text-gray-500 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="mt-1.5">
                  <label
                    className="text-gray-700 ml-1 font-medium text-lg"
                    htmlFor="password"
                  ></label>
                  <input
                    type="text"
                    name="projectProgress.description"
                    placeholder="Description"
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block project_input w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-500 placeholder:text-lg text-gray-500 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* --------------- FIFTH ROW --------------- */}
            <div className="mb-4 pt-2 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
              <div className="col-span-full">
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="projectDescription"
                    onChange={handleChange}
                    placeholder="Write the project details"
                    rows="3"
                    className="block project_input w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-500 placeholder:text-lg text-gray-500 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-7">
              <button
                className="block project_input py-2.5 px-6 text-white font-medium bg-[#f11900] duration-150 hover:bg-[#f11900] active:bg-red-700 rounded-lg shadow-lg hover:shadow-none"
                type="submit"
              >
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProjects;
