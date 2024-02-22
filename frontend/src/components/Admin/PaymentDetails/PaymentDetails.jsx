import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Spinner } from "keep-react";
import { X, FileArrowDown } from "phosphor-react";
import { Modal, Button, Tooltip } from "keep-react";
import { getAllProjectOrderAsync } from "../../../features/projectorderSlice";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModalX, setShowModalX] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState(null);

  const ProjectOrders = useSelector((state) => state.projectorder.AllProjectOrder);
  console.log('ProjectOrders', ProjectOrders);

  const loading = useSelector((state) => state.projectorder.loading);

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
              INVOICE PAYMENT DETAILS{" "}
              <span className="text-lg font-normal">
                ({ProjectOrders.length})
              </span>
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner color="failure" size="lg" />
          </div>
        ) : (
          <div className="mt-12 relative h-max overflow-auto">
            <table className="w-full table-auto text-md text-left overflow-auto">
              <thead className="text-[#242435] bg-[#F7F7F7] font-medium border-b">
                <tr>
                  <th className="py-4 px-0 text-lg font-medium">Sr. </th>
                  <th className="py-4 px-10 text-lg font-medium">Client Name</th>
                  <th className="py-4 px-10 text-lg font-medium">Bank Details</th>
                  <th className="py-4 px-10 text-lg font-medium">Customer ID</th>
                  <th className="py-4 px-10 text-lg font-medium">Order ID</th>
                  <th className="py-4 px-10 text-lg font-medium">Status</th>
                  <th className="py-4 px-10 text-lg font-medium">Pop</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {ProjectOrders.map((data, idx) => (
                  <tr key={idx}>
                    <td className="pl-0 py-3 text-lg ">{idx + 1}</td>
                    {/* ------------ USERS DETAILS ------------ */}
                    <td className="gap-x-3 pl-10">
                        <span className="text-gray-700 text-lg font-medium capitalize">
                          Username
                        </span>{" "}
                        <br />
                        <span className="text-gray-700 text-sm">
                          suheer@gmail.com
                        </span>
                    </td>

                    
                    {/* ------------ BANK DETAILS ------------ */}
                    <td className="gap-x-3 pl-10">
                        <span className="text-gray-700 text-lg font-medium capitalize">
                          JS Bank
                        </span>{" "}
                        <br />
                        <span className="text-gray-700 text-sm">
                          IBN254123546354354
                        </span>
                    </td>

                    <td className="pl-10 py-3 text-lg  text-red-600">{data.customerId}</td>
                    <td className="pl-10 py-3 text-lg  text-red-600">{data.customerId}</td>

                    

                    <td className="whitespace-nowrap flex py-2 pl-10">
                    <Dropdown
                      label="Update Status"
                      size="sm"
                      dismissOnClick={true}
                      className="bg-gray-200 mx-1 text-gray-900 hover:bg-gray-300"
                    >
                      <Dropdown.Item
                        // onClick={() => handleUpdateRole(data.id, true)}
                        className="text-md font-medium hover:bg-gray-300 hover:text-black"
                      >
                        Pending
                      </Dropdown.Item>
                      <Dropdown.Item
                        // onClick={() => handleUpdateRole(data.id, false)}
                        className="text-md font-medium hover:bg-gray-300 hover:text-black"
                      >
                        Verify
                      </Dropdown.Item>
                      <Dropdown.Item
                        // onClick={() => handleUpdateRole(data.id, false)}
                        className="text-md font-medium hover:bg-gray-300 hover:text-black"
                      >
                        Rejected
                      </Dropdown.Item>
                    </Dropdown>
                  </td>

                  <td className="px-4 py-3">
                      <button  onClick={() => openModal(data.id)} className="text-white text-sm pl-8 py-2 rounded-lg cursor-pointer">
                        <img src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/eye-close-line.png?v=1708585900" alt="" />
                      </button>
                  </td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
          <p className="text-3xl text-black tracking-wider mb-8">Invoice Payment Screenshot</p>
        </Modal.Header>
        <Modal.Body className="pb-10">
          <div className="flex justify-center items-center">
            <img src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/Portfolio_Section1.png?v=1708328992" alt="" />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaymentDetails;
