import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown, Spinner } from "keep-react";
import { X, FileArrowDown } from "phosphor-react";
import { Modal, Button, Tooltip } from "keep-react";
import { getAllProjectOrderAsync } from "../../../features/projectorderSlice";
import {
  getAllPaymentProofsAsync,
  updatePaymentProofsAsync,
} from "../../../features/PaymentStatusSlice";
import {
  getAllInvoicesAsync,
  updateInvoicesAsync,
} from "../../../features/invoiceSlice";
const PaymentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModalX, setShowModalX] = useState(false);
  const [selectedObjectId, setSelectedObjectId] = useState(null);

  const allPaymentProofs = useSelector(
    (state) => state.paymentDetail.allPaymentProofs
  );
  console.log("all data", allPaymentProofs);
  const selectedImage = allPaymentProofs.find(
    (data) => data.id === selectedObjectId
  );
  // console.log('selectedImage', selectedImage);

  const loading = useSelector((state) => state.paymentDetail.loading);

  useEffect(() => {
    dispatch(getAllPaymentProofsAsync());
  }, [dispatch]);

  if (!allPaymentProofs) {
    return <div>Loading...</div>;
  }

  const openModal = (objectId) => {
    setShowModalX(!showModalX);
    setSelectedObjectId(objectId);
  };

  const getSelectedProjectDetails = () => {
    return allPaymentProofs.find((data) => data.id === selectedObjectId);
  };
  const SelectedProjectOrderDetails = getSelectedProjectDetails();
  const logoFile = SelectedProjectOrderDetails?.logoFile;
  const additionalFile = SelectedProjectOrderDetails?.attachmentFile;
  // enum:['Verified','Pending','Rejected'],

  const handleUpdatePaymentStatus = (objectId, selectedValue, datamain) => {
    console.log("datamain", datamain);

    // SENDING VALUE TO BACKEND
    dispatch(
      updatePaymentProofsAsync({ id: objectId, status: selectedValue })
    ).then(() => {
      dispatch(getAllPaymentProofsAsync());
      if (datamain.mainDocumentData.invoices[0].invoiceType === "full") {
        const payload = {
          id: datamain?.mainDocumentId,
          invoiceId: datamain?.invoiceId,
          paymentStatus: "paid",
          status: "paid",
          orderId: datamain?.clientData?.orderId,
        };

        dispatch(updateInvoicesAsync(payload));
      } else if (datamain.mainDocumentData.invoices[0].invoiceType === "half") {
        const selectedinvoice = datamain.mainDocumentData.invoices.find(
          (data) => data?._id === datamain?.invoiceId
        );
        const requiredPaymentStatus = datamain.mainDocumentData.paymentStatus;

        const payloadforpartially = {
          id: datamain?.mainDocumentId,
          invoiceId: selectedinvoice?._id,
          paymentStatus:
            requiredPaymentStatus === "partially paid"
              ? "paid"
              : "partially paid",
          status: "paid",
          orderId: datamain?.clientData?.orderId,
        };

        dispatch(updateInvoicesAsync(payloadforpartially));
      }
    });
  };

  return (
    <>
      <div className="py-10 px-4 md:px-8 rounded-md bg-white">
        <div className="items-start justify-between md:flex">
          <div className="max-w-4xl">
            <h3 className="text-gray-800 text-2xl font-semibold tracking-wide sm:text-3xl">
              INVOICE PAYMENT DETAILS{" "}
              <span className="text-lg font-normal">
                ({allPaymentProofs.length})
              </span>
            </h3>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner color="failure" size="lg" />
          </div>
        ) : (
          <div
            className="mt-12 relative h-max overflow-auto"
            style={{ minHeight: "40vh" }}
          >
            <table className="w-full table-auto text-md text-left overflow-auto">
              <thead className="text-[#242435] bg-[#F7F7F7] font-medium border-b">
                <tr>
                  <th className="py-4 px-0 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">
                    Sr.{" "}
                  </th>
                  <th className="py-4 px-10 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">
                    Client_Name
                  </th>
                  <th className="py-4 px-10 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">
                    Bank_Details
                  </th>
                  <th className="py-4 px-10 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">
                    Customer_ID
                  </th>
                  <th className="py-4 px-10 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">
                    Order_ID
                  </th>
                  <th className="py-4 px-10 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">
                    Status
                  </th>
                  <th className="py-4 px-10 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">
                    Pop
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {allPaymentProofs.map((data, idx) => (
                  <tr key={idx}>
                    <td className="pl-0 py-3 md:text-md lg:text-md xl:text-md 2xl:text-lg ">
                      {idx + 1}
                    </td>
                    <td className="pl-10 py-3 md:text-md lg:text-md xl:text-md 2xl:text-lg">
                      {data.clientData.name}
                    </td>

                    {/* ------------ BANK DETAILS ------------ */}
                    <td className="gap-x-3 pl-10">
                      <span className="text-gray-700 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium capitalize">
                        {data.accountUsed.branchAddress}
                      </span>{" "}
                      <br />
                      <span className="text-gray-700 text-sm">
                        {data.accountUsed.IBAN}
                      </span>
                    </td>

                    <td className="pl-10 py-3 md:text-md lg:text-md xl:text-md 2xl:text-lg  text-red-600">
                      {data.clientData.customerId}
                    </td>
                    <td className="pl-10 py-3 md:text-md lg:text-md xl:text-md 2xl:text-lg  text-red-600">
                      {data.clientData.orderId}
                    </td>

                    <td className="whitespace-nowrap flex py-2 pl-10">
                      {data.status === "Verified" ? (
                        <>
                          <button className="bg-green-300 text-black text-md py-2.5 px-8 mx-1 rounded-md">
                            Verified
                          </button>
                        </>
                      ) : (
                        <Dropdown
                          label={data.status}
                          size="sm"
                          dismissOnClick={true}
                          className={`mx-1 text-gray-900 ${
                            data.status == "Pending"
                              ? "bg-gray-200 hover:bg-gray-300"
                              : data.status == "Verified"
                              ? "bg-green-300 hover:bg-green-400"
                              : data.status == "Rejected"
                              ? "bg-red-300 hover:bg-red-400"
                              : ""
                          } w-32`}
                        >
                          <Dropdown.Item
                            onClick={() =>
                              handleUpdatePaymentStatus(
                                data.id,
                                "Verified",
                                data
                              )
                            }
                            className="text-md font-medium hover:bg-gray-300 hover:text-black w-36"
                          >
                            Verified
                          </Dropdown.Item>

                          <Dropdown.Item
                            onClick={() =>
                              handleUpdatePaymentStatus(data.id, "Rejected")
                            }
                            className="text-md font-medium hover:bg-gray-300 hover:text-black w-36"
                          >
                            Rejected
                          </Dropdown.Item>
                        </Dropdown>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <button
                        onClick={() => openModal(data.id)}
                        className="text-white text-sm pl-8 py-2 rounded-lg cursor-pointer"
                      >
                        <img
                          src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/eye-line.png?v=1708596135"
                          alt=""
                        />
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
          <p className="text-3xl text-black tracking-wider mb-8">
            Invoice Payment Screenshot
          </p>
        </Modal.Header>
        <Modal.Body className="pb-10">
          <div className="flex justify-center items-center">
            <img
              src={selectedImage?.image.secure_url}
              alt=""
              width={400}
              height={400}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PaymentDetails;
