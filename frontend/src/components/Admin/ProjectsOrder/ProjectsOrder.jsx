import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { X, FileArrowDown } from "phosphor-react";
import { Modal, Button, Tooltip } from "keep-react";
import { getAllProjectOrderAsync } from "../../../features/projectorderSlice";

const ProjectsOrder = () => {
  const [showModalX, setShowModalX] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const dispatch = useDispatch();
  const ProjectOrders = useSelector(
    (state) => state.projectorder.AllProjectOrder
  );

  // console.log("ProjectOrders", ProjectOrders);

  useEffect(() => {
    dispatch(getAllProjectOrderAsync());
  }, [dispatch]);

  if (!ProjectOrders) {
    return <div>Loading...</div>;
  }

  const openModal = (objectId) => {
    setShowModalX(!showModalX);
    setSelectedObjectId(objectId);
  };

  const getSelectedProjectDetails = () => {
    return ProjectOrders.find((data) => data.id === selectedObjectId);
  };
  const SelectedProjectOrderDetails = getSelectedProjectDetails();
  const logoFile = SelectedProjectOrderDetails?.logoFile;
  const additionalFile = SelectedProjectOrderDetails?.attachmentFile;

  return (
    <>
      <div className="py-10 px-4 md:px-8 rounded-md bg-white">
        <div className="items-start justify-between md:flex">
          <div className="max-w-4xl">
            <h3 className="text-gray-800 text-2xl font-semibold tracking-wide sm:text-3xl">
              PROJECT ORDERS{" "}
              <span className="text-lg font-normal">
                ({ProjectOrders.length})
              </span>
            </h3>
          </div>
        </div>

        <div className="mt-12 relative h-max overflow-auto">
          <table className="w-full table-auto text-md text-left overflow-auto">
            <thead className="text-[#242435] bg-[#F7F7F7] font-medium border-b">
              <tr>
                <th className="py-4 px-6 text-lg font-medium">Sr. </th>
                <th className="py-4 px-6 text-lg font-medium">Company Name</th>
                <th className="py-4 px-6 text-lg font-medium">Project Title</th>
                <th className="py-4 px-6 text-lg font-medium">Customer ID</th>
                <th className="py-4 px-6 text-lg font-medium">Date</th>
                <th className="py-4 px-6 text-lg font-medium">Deadline</th>
                <th className="py-4 px-6 text-lg font-medium">Order ID</th>
                <th className="py-4 px-6 text-lg font-medium">View Details</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {ProjectOrders.map((data, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-3 text-lg ">{idx + 1}</td>
                  <td className="px-6 py-3 text-lg ">{data.companyName}</td>
                  <td className="px-6 py-3 text-lg ">{data.projectTitle}</td>
                  <td className="px-6 py-3 text-lg  text-red-600">{data.customerId}</td>
                  <td className="px-6 py-3 text-md">{new Date(data.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-3 ">{new Date(data.Deadline).toLocaleDateString()}</td>
                  <td className="px-6 py-3 text-lg text-md text-red-600">{data.orderId}</td>
                  <td className="px-6 py-3">
                    <td
                      onClick={() => openModal(data.id)}
                      className="bg-[#f11900] text-white text-sm px-4 py-2 rounded-lg cursor-pointer"
                    >
                      View Details
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        size="4xl"
        show={showModalX}
        icon={
          <X
            size={28}
            onClick={() => openModal(null, null)}
            className="cursor-pointer"
          />
        }
      >
        <Modal.Header className="text-center">
          <p className="text-3xl text-[#f11900] mb-5">Order Projects Details</p>
        </Modal.Header>
        <Modal.Body className="px-10">
          <div className="flex justify-between mb-6">
            <p className="text-lg leading-relaxed  text-[#f11900] ">
              <span className="font-bold text-black me-2">Order ID: </span>
              {SelectedProjectOrderDetails?.orderId}
            </p>
            <p className="text-lg leading-relaxed  text-[#f11900]">
              <span className="font-bold text-black me-2">Customer ID: </span>
              {SelectedProjectOrderDetails?.customerId}
            </p>
          </div>
          <div className="flex justify-between mb-6">
            <p className="text-lg leading-relaxed text-metal-500">
              <span className="font-bold text-black me-2">Project Title: </span>
              {SelectedProjectOrderDetails?.projectTitle}
            </p>
            <p className="text-lg leading-relaxed text-metal-500">
              <span className="font-bold text-black me-2">Company Name:</span>
              {SelectedProjectOrderDetails?.companyName}
            </p>
          </div>
          <div className="flex justify-between mb-6">
            <p className="text-lg leading-relaxed text-metal-500">
              <span className="font-bold text-black me-2">Start Date: </span>
              {new Date(
                SelectedProjectOrderDetails?.startDate
              ).toLocaleDateString()}
            </p>
            <p className="text-lg leading-relaxed  text-[#f11900]">
              <span className="font-bold text-black me-2">End Date:</span>
              {new Date(
                SelectedProjectOrderDetails?.Deadline
              ).toLocaleDateString()}
            </p>
          </div>
          <div className="flex justify-between mb-6">
            <p className="flex items-center text-lg leading-relaxed text-metal-500">
              <span className="font-bold text-black me-2">LOGO File: </span>
              <a
                href={logoFile?.downloadURL}
                download={logoFile?.name}
                className="flex items-center  text-[#f11900]"
              >
                {logoFile?.name ? logoFile?.name : 'NoFile'  }  {logoFile?.name && <FileArrowDown size={20} />}
              </a>
            </p>
            <p className="flex items-center text-lg leading-relaxed text-metal-500">
              <span className="font-bold text-black me-2">
                Additional File:
              </span>
              <a
                href={additionalFile?.downloadURL}
                download={additionalFile?.name}
                className="flex items-center  text-[#f11900]"
              >
                 {/* {additionalFile?.name ? additionalFile?.name : 'NoFile'  } */} Additional File {additionalFile?.name && <FileArrowDown size={20} />} 
              </a>
            </p>
          </div>
          <p className="text-lg text-metal-500 leading-9">
            <span className="font-bold text-black me-2 text-2xl">
              Additional Note:
            </span>
            {SelectedProjectOrderDetails?.additionalNote}.
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProjectsOrder;
