import React from "react";
import { useEffect, useState } from "react";
import { Trash, PencilSimple } from "phosphor-react";
import { Modal, Button, Tooltip } from "keep-react";
import { X } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInvoicesAsync,
  getAllInvoicesAsync,
} from "../../../features/invoiceSlice";
import "../AdminPanel.css";
import { Mail, Phone, CreditCard, FileCheck } from "lucide-react";

const AllInvoices = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModalX, setShowModalX] = useState(false);
  const [showErrorModalX, setShowErrorModalX] = useState(false);
  const [deleteMsgId, setDeleteMsgId] = useState(null);
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedObjectId, setSelectedObjectId] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  // CALL TO GET ALL INVOICES
  useEffect(() => {
    dispatch(getAllInvoicesAsync());
  }, [dispatch]);

  // HERE WE GET DATA USING USESELECTOR FROM STATE
  const InvoicesData = useSelector((state) => state.invoice.allInvoices);

  const Modal_id = InvoicesData.filter((data) => data.id === selectedObjectId);

  const selectedData = Modal_id.map((data) => { const selectedInvoice = data.invoices.find( (invoice) => invoice.id === selectedInvoiceId );

    if (selectedInvoice) {
      return {
        ...data,
        selectedInvoice,
        isFirstInvoice: data.invoices.indexOf(selectedInvoice) === 0,
        isSecondInvoice: data.invoices.indexOf(selectedInvoice) === 1,
      };
    }

    return null;
  }).filter(Boolean);

  // console.log("Selected Data", selectedData);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // THESE STATE ARE RELATED TO PAGINATION
  const [limit, setLimit] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(InvoicesData.length / limit);
  const disabled = currentPage === totalPages;
  const disabled2 = currentPage === 1;

  const startIndex = (currentPage - 1) * limit;

  const endIndex = startIndex + limit;
  let displayedData = InvoicesData.slice(startIndex, endIndex);

  // VIEW MESSAGE MODAL FUNCTION
  const openModal = (objectId, invoiceId) => {
    setShowModalX(!showModalX);
    setSelectedObjectId(objectId);
    setSelectedInvoiceId(invoiceId);
  };

  // DELETE MESSAGE MODAL FUNCTION
  const onClickErrorModal = (id) => {
    setShowErrorModalX(!showErrorModalX);
    setDeleteMsgId(id);
  };

  // HANDLE UPDATE INVOICE
  const handleUpdateInvoice = (object_id, invoice_Id) => {
    navigate(`/adminpanel/updateInvoice/${object_id}-${invoice_Id}`);
  };

  // HANDLE DELETE INVOICE
  const handleDelete = (id) => {
    dispatch(deleteInvoicesAsync(id)).then(() => {
      dispatch(getAllInvoicesAsync());
    });
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setProduct({
      ...product,
      [name]: newValue,
    });
  };

  // const filteredId = InvoicesData.filter((data) => data.id === Message);
  const delete_MsgId = InvoicesData.filter((data) => data.id === deleteMsgId);

  const [filterdByStatus, setFilterdByStatus] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setFilterdByStatus(InvoicesData);
  }, [InvoicesData]);

  const handlePaid = () => {
    const data = InvoicesData.filter((item) => item.paymentStatus === "paid");
    console.log(data);
    setFilterdByStatus(data);
    setActiveTab("paid");
  };

  const handleUnPaid = () => {
    const data = InvoicesData.filter((item) => item.paymentStatus === "unpaid");
    setFilterdByStatus(data);
    setActiveTab("unpaid");
  };

  const handlePartiallyPaid = () => {
    const data = InvoicesData.filter(
      (item) => item.paymentStatus === "partially paid"
    );
    setFilterdByStatus(data);
    setActiveTab("partiallyPaid");
  };

  const handleAllInvoices = () => {
    const data = InvoicesData.filter((item) => item);
    setFilterdByStatus(data);
    setActiveTab("all");
  };

  return (
    <>
      <div className=" py-10 px-4 md:px-8 rounded-md bg-white">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              All Invoices{" "}
              <span className="text-lg font-normal">
                ({InvoicesData.length})
              </span>
            </h3>
          </div>
          <div className="mt-3 md:mt-0 flex gap-8">
            {/* ------------- SEARCH BAR ------------- */}
            <div className="search_bar mr-10">
              <div className="relative mt-4 md:mt-0">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="w-5 h-5 text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </span>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border border-[#D9D9D9] rounded-lg focus:border-red-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-red-300"
                  placeholder="Search name & email"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ------------- TABS ------------- */}
        <div className="my-10 flex justify-start items-center">
          <button
            className={`${
              activeTab === "all"
                ? "bg-[#F11900] text-white"
                : "bg-white text-black border border-black hover:bg-[#F11900] hover:text-white hover:border-[#f11900]"
            } rounded-md mr-5`}
            style={{ padding: "8px 25px" }}
            onClick={handleAllInvoices}
          >
            All
          </button>
          <button
            className={`${
              activeTab === "paid"
                ? "bg-[#F11900] text-white"
                : "bg-white text-black border border-black hover:bg-[#F11900] hover:text-white hover:border-[#f11900]"
            } rounded-md mr-5`}
            style={{ padding: "8px 25px" }}
            onClick={handlePaid}
          >
            Paid
          </button>
          <button
            className={`${
              activeTab === "partiallyPaid"
                ? "bg-[#F11900] text-white"
                : "bg-white text-black border border-black hover:bg-[#F11900] hover:text-white hover:border-[#f11900]"
            } rounded-md mr-5`}
            style={{ padding: "8px 25px" }}
            onClick={handlePartiallyPaid}
          >
            Partially Payment
          </button>
          <button
            className={`${
              activeTab === "unpaid"
                ? "bg-[#F11900] text-white"
                : "bg-white text-black border border-black hover:bg-[#F11900] hover:text-white hover:border-[#f11900]"
            } rounded-md mr-5`}
            style={{ padding: "8px 25px" }}
            onClick={handleUnPaid}
          >
            Unpaid
          </button>
        </div>

        {/* ------------- TABLE ------------- */}
        <div className="-mt-2 relative h-max overflow-auto">
          {/* ------------- TABLE ------------- */}
          <table className="w-full table-auto text-sm text-left">
            {/* ------------- TABLE HEAD ------------- */}
            <thead className="text-[#242435] bg-[#F7F7F7] font-medium border-b">
              <tr>
                {/* <th className="py-4 pl-4 text-lg font-medium">Sr. </th> */}
                <th className="py-4 px-6 text-lg font-medium">Name</th>
                <th className="py-4 px-6 text-lg font-medium">Customer ID</th>
                <th className="py-4 px-6 text-lg font-medium">Order ID</th>
                <th className="py-4 px-6 text-lg font-medium">Amount</th>
                <th className="py-4 px-6 text-lg font-medium">Invoice Type</th>
                <th className="py-3 pr-6 text-lg font-medium">View Invoice</th>
                <th className="py-3 pl-14 text-lg font-medium">Actions</th>
              </tr>
            </thead>
            {/* ------------- TABLE BODY ------------- */}
            <tbody className="text-gray-600 divide-y">
              {filterdByStatus.map((data, index) => (
                <React.Fragment key={index}>
                  {data.invoices.map((invoice, invoiceIndex) => (
                    <tr
                      key={`${index}-${invoiceIndex}`}
                      className="cursor-pointer"
                    >
                      <td className="gap-x-3 px-6 whitespace-nowrap">
                        <span className="text-gray-700 text-lg font-medium capitalize">
                          {invoice.to.name}
                        </span>{" "}
                        <br />
                        <span className="text-gray-700 text-md">
                          {invoice.to.email}
                        </span>
                      </td>

                      <td className="pl-6 py-3 text-lg">{data.customerId}</td>
                      <td className="pl-6 py-3 text-lg">{invoice.orderId}</td>
                      <td className="pl-6 py-3 text-lg">${invoice.amount}</td>

                      <td className="pl-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-4 py-1.5 rounded-full capitalize font-semibold text-xs ${
                            data.paymentStatus && invoice.status === "unpaid"
                              ? "text-red-600 bg-red-50"
                              : invoice.status === "paid"
                              ? "text-green-600 bg-green-50"
                              : data.paymentStatus === "partially paid"
                              ? "text-yellow-600 bg-yellow-50"
                              : ""
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      {/* ---------- PREVIEW BUTTON ----------  */}
                      <td className="pr-6 py-3 text-lg font-semibold underline underline-offset-4 text-[#F11900]"
                        onClick={() => openModal(data.id, invoice.id)}
                      >
                        Preview Invoice
                      </td>

                      <td className="flex items-center justify-center py-3">
                        {/* ---------- EDIT BUTTON ----------  */}
                        {invoice?.status !== "paid" ? (
                          <div
                            className="rounded-full bg-gray-200 text-gray-800 p-2 ms-2.5 transition hover:scale-110"
                            onClick={() =>
                              handleUpdateInvoice(data.id, invoice.id)
                            }
                          >
                            <PencilSimple size={24} />
                          </div>
                        ) : null}

                        {/* ---------- DELETE BUTTON ----------  */}
                        <div
                          className="trash_button rounded-full bg-red-600 text-white p-2 ms-2.5 transition hover:scale-110"
                          onClick={() => onClickErrorModal(data.id)}
                        >
                          <Trash size={24} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              {/* If no data is available */}
              {InvoicesData.length === 0 && (
                <tr>
                  <td className="px-6 py-4 text-lg text-gray-950">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --------------- PAGINATION --------------- */}
      {/* <div className=" flex justify-center mt-5 mb-5">
        <nav aria-label="Page navigation example">
          <ul className="inline-flex -space-x-px text-lg">
            <li>
              <button
                onClick={() => {
                  setCurrentPage((prev) => Math.max(prev - 1, 1));
                  window.scroll({ top: 0, behavior: "smooth" });
                }}
                disabled={disabled2}
                className={`flex items-center justify-center px-5 h-11 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg ${
                  disabled2
                    ? "cursor-not-allowed bg-[#CCCCCC] text-black "
                    : "hover:bg-gray-600 hover:text-white "
                } `}
              >
                Prev
              </button>
            </li>
            <li>
              <span className="flex items-center justify-center px-5 h-11 leading-tight text-gray-500 bg-white border border-gray-300 ">
                {currentPage} / {totalPages}
              </span>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={disabled}
                className={`flex items-center justify-center px-5 h-11 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg ${
                  disabled
                    ? "cursor-not-allowed bg-[#CCCCCC] text-black "
                    : "hover:bg-gray-600 hover:text-white"
                }`}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div> */}

      {/* ---------- DELETE MESSAGE MODAL ---------- */}
      {delete_MsgId.map((data, idx) => (
        <Modal
          icon={<Trash size={28} color="#E92215" />}
          size="lg"
          show={showErrorModalX}
          onClose={onClickErrorModal}
        >
          <Modal.Header>Do you want to delete this file?</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-metal-500">
                This action will permanently remove the query.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="outlineGray" onClick={onClickErrorModal}>
              Cancel
            </Button>
            <Button
              type="primary"
              color="error"
              onClick={() => handleDelete(data.id)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      ))}

      {/* ------------- PREVIEW INVOICE ------------- */}
      {selectedData.map((data, index) => (
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
          <Modal.Header>
            {/* <div className="flex justify-between items-center border-b-4 border-gray-500 pb-2"> */}
            <div className="flex justify-between items-center mt-2">
              <img
                src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/ITEXPERTS_LOGO.png?v=1704170784"
                alt="keep"
                width="120"
                height="40"
                className=""
              />
              <p className="text-4xl text-black font-semibold modelHead me-3">
                Invoice
              </p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="flex justify-between">
              {selectedData.map((data) => (
                <div className="p-2 w-100" key={data.id}>
                  <p className="modelClientText mb-2 text-base">Bill To:</p>
                  <h1 className="modelClientHeadText mb-2 font-semibold text-lg capitalize">
                    {data.selectedInvoice.to.name}
                  </h1>
                  <p className="modelClientText flex items-center mb-2 text-base">
                    <Phone size={18} className="mr-1" />
                    {data.selectedInvoice.to.phone}
                  </p>
                  <p className="modelClientText flex items-center mb-2 text-base">
                    <Mail size={18} className="mr-1" />
                    {data.selectedInvoice.to.email}
                  </p>
                  <p className="modelClientText flex items-center mb-2 text-base">
                    <CreditCard size={20} className="mr-1" />
                    {data.selectedInvoice.customerId}
                  </p>
                  <p className="modelClientText flex items-center mb-2 text-base">
                    <FileCheck size={20} className="mr-1" />
                    {data.isFirstInvoice ? "Invoice 1" : "Invoice 2"}
                  </p>
                </div>
              ))}

              <div className="p-2 w-100 text-right">
                <p className="modelClientText mb-2 text-base">From:</p>
                <h1 className="modelClientHeadText mb-2 font-semibold text-lg">
                  IT EXPERTS
                </h1>
                <p className="modelClientText mb-2 text-base">042-36860072</p>
                <p className="modelClientText mb-2 text-base">
                  info@it-experts.com.pk
                </p>
                <p className="modelClientText text-base w-64">
                  1200 Brickell Avenue, Suite 1950 Miami, FLORIDA 33131
                </p>
              </div>
            </div>

            {selectedData.map((data) => (
              <div key={data.id}>
                <div className="flex justify-between mx-2 mt-5">
                  <div className="left flex flex-col">
                    <p className="text-base">
                      <span className="font-semibold">Order Id: </span>
                      {data.selectedInvoice.orderId}
                    </p>
                    {data.selectedInvoice.invoiceType === "half" && (
                      <p className="modelClientText flex items-center mb-2 text-base">
                        <span className="font-semibold mr-2">
                          Invoice Type:
                        </span>
                        Partially Payment
                      </p>
                    )}
                  </div>

                  <p className="text-base">
                    <span className="font-semibold">Due Date: </span>
                    {data.isFirstInvoice ? (
                      <>
                        {new Date(
                          data.selectedInvoice.dueDate
                        ).toLocaleDateString()}
                      </>
                    ) : (
                      <>
                        {new Date(
                          data.selectedInvoice.secondInvoiceDueDate
                        ).toLocaleDateString()}
                      </>
                    )}
                  </p>
                </div>

                <div className="mt-5 shadow-sm overflow-x-auto">
                  <table className="w-full table-auto text-sm text-left">
                    <thead className="bg-gray-200 text-black font-normal text-lg border-b">
                      <tr>
                        <th className="py-3 px-6 tracking-wide">Description</th>
                        <th className="py-3 px-6 text-end">SubTotal</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 border-b-2 divide-y">
                      {data.selectedInvoice.service.map((service, idx) => (
                        <tr key={idx}>
                          <td className="ps-5 py-4 text-lg whitespace-nowrap flex items-end gap-x-6">
                            {service.serviceName} <br />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-end text-lg">
                            ${service.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="w-full flex justify-end pr-3 mb-6">
                    <div className="pt-2 flex flex-col text-lg text-right">
                      {data.selectedInvoice.invoiceType === "full" ? (
                        <>
                          {/* SUB TOTAL */}
                          <div className="invoice_total py-2.5 font-medium flex justify-end items-center gap-6">
                            <div className="total_amount text-right mr-3">
                              Sub Total
                            </div>
                            <div className="invoice_heading w-24">
                              $
                              {data.selectedInvoice.amount +
                                data.selectedInvoice.discount}
                            </div>
                          </div>
                          {/* DISCOUNT */}
                          <div className="invoice_total py-2.5 font-medium flex justify-end items-center gap-6">
                            <div className="total_amount text-right mr-3">
                              Discount
                            </div>
                            <div className="invoice_heading w-24">
                              ${data.selectedInvoice.discount}
                            </div>
                          </div>
                          {/* TOTAL AMOUNT */}
                          <div className="border-t py-2.5 font-semibold flex justify-end items-center gap-6">
                            <div className="total_amount text-right mr-3">
                              Total Amount
                            </div>
                            <div className="invoice_heading w-24">
                              ${data.selectedInvoice.amount}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {data.isFirstInvoice ? (
                            <>
                              {/* SUB TOTAL */}
                              <div className="invoice_total py-2.5 font-medium flex justify-end items-center gap-6">
                                <div className="total_amount text-right mr-3">
                                  Sub Total
                                </div>
                                <div className="invoice_heading w-24">
                                  {data.selectedInvoice.invoiceType ===
                                  "full" ? (
                                    <>
                                      $
                                      {data.selectedInvoice.amount +
                                        data.selectedInvoice.discount}
                                    </>
                                  ) : (
                                    <>
                                      $
                                      {data.selectedInvoice.amount * 2 +
                                        data.selectedInvoice.discount}
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* DISCOUNT */}
                              <div className="invoice_total py-2.5 font-medium flex justify-end items-center gap-6">
                                <div className="total_amount text-right mr-3">
                                  Discount
                                </div>
                                <div className="invoice_heading w-24">
                                  ${data.selectedInvoice.discount}
                                </div>
                              </div>

                              {/* TOTAL AMOUNT */}
                              <div className="border-t py-2.5 font-semibold flex justify-end items-center gap-6">
                                <div className="total_amount text-right mr-3">
                                  Total Amount
                                </div>
                                <div className="invoice_heading w-24">
                                  ${data.selectedInvoice.amount}
                                </div>
                              </div>

                              {/* <div className="border-t py-2.5 font-semibold flex justify-end items-center gap-6">
                                <div className="total_amount text-right mr-3">
                                  First Invoice
                                </div>
                                <div className="invoice_heading w-24">
                                  ${data.selectedInvoice.amount}
                                </div>
                              </div> */}
                            </>
                          ) : (
                            <>
                              {/* SUB TOTAL */}
                              <div className="invoice_total py-2.5 font-medium flex justify-end items-center gap-6">
                                <div className="total_amount text-right mr-3">
                                  Sub Total
                                </div>
                                <div className="invoice_heading w-24">
                                  {data.selectedInvoice.invoiceType ===
                                  "full" ? (
                                    <>
                                      $
                                      {data.selectedInvoice.amount +
                                        data.selectedInvoice.discount}
                                    </>
                                  ) : (
                                    <>
                                      $
                                      {data.selectedInvoice.amount * 2 +
                                        data.selectedInvoice.discount}
                                    </>
                                  )}
                                </div>
                              </div>

                              {/* DISCOUNT */}
                              <div className="invoice_total py-2.5 font-medium flex justify-end items-center gap-6">
                                <div className="total_amount text-right mr-3">
                                  Discount
                                </div>
                                <div className="invoice_heading w-24">
                                  ${data.selectedInvoice.discount}
                                </div>
                              </div>

                              {/* TOTAL AMOUNT */}
                              <div className="border-t py-2.5 font-semibold flex justify-end items-center gap-6">
                                <div className="total_amount text-right mr-3">
                                  Total Amount
                                </div>
                                <div className="invoice_heading w-24">
                                  ${data.selectedInvoice.amount}
                                </div>
                              </div>

                              {/* <div className="border-t py-2.5 font-semibold flex justify-end items-center gap-6">
                                <div className="total_amount text-right mr-3">
                                  Second Invoice
                                </div>
                                <div className="invoice_heading w-24">
                                  ${data.selectedInvoice.amount}
                                </div>
                              </div> */}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="flex justify-center gap-5 mt-5">
              <button
                className="px-6 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#f11900] rounded-md hover:bg-[#f11900] focus:outline-none focus:bg-[#D22B2B]"
                onClick={openModal}
                type="button"
              >
                Download Invoice
              </button>
            </div> */}
          </Modal.Body>
        </Modal>
      ))}
    </>
  );
};

export default AllInvoices;
