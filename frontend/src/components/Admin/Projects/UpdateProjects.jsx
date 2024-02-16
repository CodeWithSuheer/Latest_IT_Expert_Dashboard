import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProjectsAsync,
  getAllProjectsAsync,
  updateProjectsAsync,
} from "../../../features/ProjectSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";

const UpdateProjects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const Projects = useSelector((state) => state.project.allProjects);
  const ProjectsData = Projects.filter((data) => data.id === id);
  console.log("ProjectsData", ProjectsData);

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
    id: id || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (ProjectsData.length > 0) {
      const projectData = ProjectsData[0];

      setFormData({
        projectTitle: projectData.projectTitle || "",
        companyName: projectData.companyName || "",
        startDate: projectData.startDate || "",
        Deadline: projectData.Deadline || "",
        customerId: projectData.customerId || "",
        amount: projectData.amount || 0,
        projectDescription: projectData.projectDescription || "",
        projectProgress: projectData.projectProgress || [
          {
            title: "",
            description: "",
          },
        ],
        orderId: projectData.orderId || "",
        id: projectData.id || "",
      });
    }
  }, []);

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

        // Update the specific field in the projectProgress array
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

  const handleProjectProgressChange = (index, field, value) => {
    setFormData((prevData) => {
      const newData = { ...prevData };

      if (!newData.projectProgress) {
        newData.projectProgress = [];
      }

      if (!newData.projectProgress[index]) {
        newData.projectProgress[index] = {};
      }

      // Update the specific field in the projectProgress array using immutability
      const updatedProjectProgress = newData.projectProgress.map(
        (progress, i) => {
          if (i === index) {
            return {
              ...progress,
              [field]: value,
            };
          }
          return progress;
        }
      );

      newData.projectProgress = updatedProjectProgress;

      return newData;
    });
  };

  // Function to format date to "yyyy-MM-dd"
  const formatDate = (dateString) => {
    const formattedDate = dateString.split("T")[0];
    return formattedDate;
  };

  // HANDLE SUBMIT FUNCIION
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    dispatch(updateProjectsAsync(formData)).then((res) => {
      dispatch(getAllProjectsAsync());
      navigate(`/adminpanel/projectdetails/${formData.id}`);
    });
  };

  return (
    <>
      <div className="py-10 px-4 md:px-8 rounded-md bg-white">
        {/* HEADER */}
        <div className="items-start justify-between md:flex">
          <div className="max-w-4xl">
            <h3 className="text-gray-800 text-2xl font-semibold tracking-wide sm:text-3xl">
              UPDATE PROJECT DETAILS
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
                    value={formData.companyName}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-600 placeholder:text-lg text-gray-600 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="projectTitle"
                    placeholder="Project Title"
                    value={formData.projectTitle}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-600 placeholder:text-lg text-gray-600 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2.5">
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-600 placeholder:text-lg text-gray-600 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
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
                    value={formData.customerId}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-600 placeholder:text-lg text-gray-600 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
              <div>
                <div className="mt-2.5">
                  <input
                    type="text"
                    name="orderId"
                    placeholder="Order ID"
                    value={formData.orderId}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-600 placeholder:text-lg text-gray-600 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
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
                    value={formatDate(formData.startDate)}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block w-full mt-1 pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-600 placeholder:text-lg text-gray-600 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
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
                    value={formatDate(formData.Deadline)}
                    onChange={handleChange}
                    autoComplete="given-name"
                    className="block w-full mt-1 pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-600 placeholder:text-lg text-gray-600 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* --------------- FORTH ROW --------------- */}
            <div className="mb-4 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-3">
              {formData.projectProgress.map((progress, index) => (
                <React.Fragment key={index}>
                  <div>
                    <div className="mt-1.5">
                      <label
                        className="text-gray-700 ml-1 font-medium text-lg"
                        htmlFor="Title"
                      >
                        Project Title
                      </label>
                      <input
                        type="text"
                        name={`projectProgress[${index}].title`}
                        placeholder="Project Title"
                        value={progress.title}
                        onChange={(e) =>
                          handleProjectProgressChange(
                            index,
                            "title",
                            e.target.value
                          )
                        }
                        autoComplete="given-name"
                        className="block mt-1 w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-600 placeholder:text-lg text-gray-600 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="mt-1.5">
                      <label
                        className="text-gray-700 ml-1 font-medium text-lg"
                        htmlFor="Title"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name={`projectProgress[${index}].description`}
                        placeholder="Description"
                        value={progress.description}
                        onChange={(e) =>
                          handleProjectProgressChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        autoComplete="given-name"
                        className="block w-full pl-5 pr-3 py-3 text-lg font-normal placeholder:text-gray-600 placeholder:text-lg text-gray-600 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* --------------- FIFTH ROW --------------- */}
            <div className="mb-4 pt-2 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
              <div className="col-span-full">
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleChange}
                    placeholder="Write the project details"
                    rows="8"
                    className="block w-full pl-5 pr-3 py-4 text-lg font-normal placeholder:text-gray-600 placeholder:text-lg text-gray-600 bg-gray-100 outline-none focus:border-gray-600 shadow-sm rounded-lg"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-7">
              <button
                className="block py-2.5 px-6 text-white font-medium bg-[#f11900] duration-150 hover:bg-[#f11900] active:bg-red-700 rounded-lg shadow-lg hover:shadow-none"
                type="submit"
              >
                Update Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProjects;
