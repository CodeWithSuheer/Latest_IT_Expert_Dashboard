import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, Toggle } from "keep-react";
import { X, FileText } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import { createInvoicesAsync } from "../../../features/invoiceSlice";

const Invoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [showModalX, setShowModalX] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [services, setServices] = useState([
    { number: 1, name: "", amount: "" },
  ]);

  const data = useSelector((state) => state.contactForms.allForms);

  const [formData, setFormData] = useState({
    to: {
      name: "",
      phone: "",
      email: "",
      company: "",
    },
    service: [
      {
        serviceName: "",
        price: null,
      },
    ],
    paymentStatus: "unpaid",
    amount: "",
    discount: "",
    customerId: "",
    orderId: "",
    invoiceType: "full",
    dueDate: "",
    secondInvoiceDueDate: "",
  });

  // HANDLE FORM CHANGE
  const handleFormChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    updatedServices[index][field] = value;

    setFormData((prevData) => ({
      ...prevData,
      services: updatedServices,
    }));
  };

  // HANDLE TOGGLE
  const handleToggle = (e) => {
    setToggle((prevToggle) => !prevToggle);
    const isChecked = e.target.checked;
    const newInvoiceType = isChecked ? "half" : "full";

    setFormData((prevData) => ({
      ...prevData,
      invoiceType: newInvoiceType,
    }));
  };

  const invoiceData = data.filter((data) => data.id == id);

  const onClickTwo = () => {
    setShowModalX(!showModalX);
  };

  // HANDLE INPUT CHANGE
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (!name) {
      console.error("Input field name is undefined");
      return;
    }

    const [category, index, fieldName] = name.split(".");

    if (category === "to") {
      setFormData((prevData) => ({
        ...prevData,
        to: {
          ...prevData.to,
          [fieldName]: value,
        },
      }));
    } else if (category === "service") {
      setFormData((prevData) => ({
        ...prevData,
        service: prevData.service.map((s, i) =>
          i === parseInt(index) ? { ...s, [fieldName]: value } : s
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const isFormEmpty = () => {
    const formFields = document.querySelectorAll("input, select, textarea");
    for (const field of formFields) {
      if (!field.value.trim()) {
        return true;
      }
    }
    return false;
  };

  // HANDLE ADD SERVICE
  const handleAddService = () => {
    const maxServiceNumber = Math.max(
      ...formData.service.map((service) => service.number),
      0
    );
    const newServiceNumber = maxServiceNumber + 1;

    setFormData((prevData) => ({
      ...prevData,
      service: [
        ...prevData.service,
        { number: newServiceNumber, serviceName: "", price: "" },
      ],
    }));
  };

  // HANDLE SERVICE CHANGE
  const handleServiceChange = (index, property, value) => {
    setFormData((prevData) => {
      const updatedServices = [...prevData.service];
      updatedServices[index] = { ...updatedServices[index], [property]: value };
      return { ...prevData, service: updatedServices };
    });
  };

  // HANDLE DELETE SERVICE
  const handleDeleteService = (index) => {
    const updatedServices = [...formData.service];
    updatedServices.splice(index, 1);
    setFormData({ ...formData, service: updatedServices });
  };

  const tableItems = [
    {
      name: "Project Name",
      SubName: "Home page / logo / Mockups ",
      Price: "$7500",
    },
    {
      name: "Project Name",
      SubName: "Home page / logo / Mockups ",
      Price: "$7500",
    },
    {
      name: "Project Name",
      SubName: "Home page / logo / Mockups ",
      Price: "$7500",
    },
  ];

  // HANDLE FORM SUBMIT FUNCTION
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Calculate the total amount based on service prices
    const totalAmount = formData.service.reduce(
      (total, service) => total + Number(service.price),
      0
    );

    // Get the discount value
    const discountValue = Number(
      document.querySelector('[name="discount"]').value
    );

    // Calculate the discounted amount
    const discountedAmount = totalAmount - discountValue;

    // Update the total amount field
    document.querySelector('[name="amount"]').value =
      discountedAmount.toFixed(2);

    const invoiceType = toggle ? "half" : "full";
    const includeSecondDueDate = toggle;

    const finalData = {
      to: {
        name: document.querySelector('[name="name"]').value,
        phone: document.querySelector('[name="phone"]').value,
        email: document.querySelector('[name="email"]').value,
        company: document.querySelector('[name="company"]').value,
      },
      service: formData.service.map((s, index) => ({
        serviceName: document.querySelector(
          `[name="service.${index}.serviceName"]`
        ).value,
        price: Number(
          document.querySelector(`[name="service.${index}.price"]`).value
        ),
      })),
      paymentStatus: "unpaid",
      amount: discountedAmount,
      discount: document.querySelector('[name="discount"]').value,
      customerId: document.querySelector('[name="customerId"]').value,
      orderId: document.querySelector('[name="orderId"]').value,
      invoiceType: invoiceType,
      dueDate: document.querySelector('[name="dueDate"]').value,
      secondInvoiceDueDate: includeSecondDueDate
        ? document.querySelector('[name="secondInvoiceDueDate"]').value || ""
        : "",
    };

    // console.log(finalData);
    dispatch(createInvoicesAsync(finalData));
    navigate("/adminpanel/all-invoice");
  };

  return (
    <>
      <section className="max-w-7xl px-4 mb-5 py-12 mx-auto bg-gray-50 rounded-md shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-gray-800 text-2xl pl-10 font-bold tracking-wide sm:text-3xl underline decoration-red-500 underline-offset-8">
            CREATE INVOICE
          </h2>

          {/* -------------- TOGGLE BUTTON --------------  */}
          <div className="flex items-center gap-4 mr-11">
            <label
              className="text-gray-700 font-medium text-xl"
              htmlFor="emailAddress"
            >
              Partial Payment?
            </label>
            <label
              className="relative inline-flex cursor-pointer items-center"
              onChange={handleToggle}
            >
              <input id="switch-2" type="checkbox" className="peer sr-only" />
              <label htmlFor="switch-2" className="hidden"></label>
              <div
                className={`peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300`}
              ></div>
            </label>
          </div>
        </div>

        {/* {invoiceData.map((data) => ( */}
        <form className="p-10" onSubmit={handleFormSubmit}>
          {/* CLIENT DETAILS */}
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {/* CLIENT NAME */}
            <div>
              <label className="text-gray-700 font-medium text-xl">
                Client Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter client name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40  focus:outline-none focus:ring"
                required
              />
            </div>

            {/* CLIENT COMPANY NAME */}
            <div>
              <label
                className="text-gray-700 font-medium text-xl"
                htmlFor="emailAddress"
              >
                Client Company Name
              </label>
              <input
                type="text"
                name="company"
                placeholder="Client company name"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40  focus:outline-none focus:ring"
                required
              />
            </div>

            {/* CLIENT EMAIL */}
            <div>
              <label
                className="text-gray-700 font-medium text-xl"
                htmlFor="password"
              >
                Client Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter client email"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40  focus:outline-none focus:ring"
                required
              />
            </div>

            {/* CLIENT PHONE */}
            <div>
              <label className="text-gray-700 font-medium text-xl">
                Client Phone Number
              </label>
              <input
                type="number"
                name="phone"
                placeholder="Client phone number"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40  focus:outline-none focus:ring"
                required
              />
            </div>

            {/* AMOUNT */}
            <div style={{ display: "none" }}>
              <label
                className="text-gray-700 font-medium text-xl"
                htmlFor="amount"
              >
                Total Amount
              </label>
              <input
                type="number"
                name="amount"
                placeholder="Amount"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40  focus:outline-none focus:ring"
                required
                readOnly
              />
            </div>

            {/* DISCOUNT */}
            <div>
              <label
                className="text-gray-700 font-medium text-xl"
                htmlFor="emailAddress"
              >
                Discount
              </label>
              <input
                type="number"
                name="discount"
                placeholder="Discount"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40  focus:outline-none focus:ring"
              />
            </div>

            {/* ORDER ID */}
            <div>
              <label className="text-gray-700 font-medium text-xl">
                Order No
              </label>
              <input
                type="text"
                name="orderId"
                placeholder="Order Id"
                className="block w-full px-4 py-2 text-lg mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            {/* CUSTOMER ID */}
            <div>
              <label className="text-gray-700 font-medium text-xl">
                Customer Id
              </label>
              <input
                type="text"
                name="customerId"
                placeholder="customer Id"
                className="block w-full px-4 py-2 text-lg mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            {/* DUE DATE */}
            <div>
              <label
                className="text-gray-700  font-medium text-xl"
                htmlFor="password"
              >
                {toggle ? "First Invoice Due Date" : "Due Date"}
              </label>
              <input
                type="date"
                name="dueDate"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40 focus:outline-none focus:ring"
                required
              />
            </div>

            {/* NEXT DUE DATE */}
            {toggle && (
              <div>
                <label
                  className="text-gray-700 font-medium text-xl"
                  htmlFor="password"
                >
                  Second Invoice Due Date
                </label>
                <input
                  type="date"
                  name="secondInvoiceDueDate"
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40 focus:outline-none focus:ring"
                  required
                />
              </div>
            )}
          </div>

          {/* SERVICES DETAILS */}
          <div className="mt-8">
            <h1 className="text-gray-700 ml-1 font-semibold text-2xl">
              Services
            </h1>

            <div className="border-solid border-2 border-gray-300 mt-3 p-5 rounded-lg">
              {formData.service.map((service, index) => (
                <div
                  key={index}
                  className="flex justify-center gap-5 w-100 mb-2"
                >
                  <input
                    type="text"
                    name={`service.${index}.serviceName`}
                    placeholder="Service Name"
                    value={service.serviceName}
                    onChange={(e) =>
                      handleServiceChange(index, "serviceName", e.target.value)
                    }
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40 focus:outline-none focus:ring"
                  />
                  <input
                    type="number"
                    name={`service.${index}.price`}
                    placeholder="Service amount"
                    value={service.price}
                    onChange={(e) =>
                      handleServiceChange(index, "price", e.target.value)
                    }
                    className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-[#D22B2B] focus:ring-[#D22B2B] focus:ring-opacity-40 focus:outline-none focus:ring"
                  />

                  <button
                    className="h-10 w-24 text-xl text-white transition-colors duration-300 transform bg-[#f11900] rounded-md hover:bg-[#f11900] focus:outline-none focus:bg-[#D22B2B]"
                    onClick={() => handleDeleteService(index)}
                    type="button"
                  >
                    X
                  </button>
                </div>
              ))}

              <button
                className="mt-3 px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#f11900] rounded-md hover:bg-[#f11900] focus:outline-none focus:bg-[#D22B2B]"
                onClick={handleAddService}
                type="button"
              >
                Add Services
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-10 mt-6">
            <button
              className="px-8 py-3 leading-5 text-white transition-colors duration-300 transform bg-[#f11900] rounded-md hover:bg-[#f11900] focus:outline-none focus:bg-[#D22B2B]"
              type="submit"
            >
              Generate Invoice
            </button>
          </div>
        </form>
        {/* ))} */}
      </section>

      {/* ----------------- PREVIEW INVOICE ----------------- */}
      <Modal
        size="4xl"
        show={showModalX}
        icon={<X size={30} onClick={onClickTwo} className="cursor-pointer" />}
      >
        <Modal.Header>
          {/* <div className="flex justify-between items-center border-b-4 border-gray-500 pb-2"> */}
          <div className="flex justify-between items-center">
            <img
              src="https://cdn.shopify.com/s/files/1/0704/6378/2946/files/ITEXPERTS_LOGO.png?v=1704170784"
              alt="keep"
              width="120"
              height="40"
              className=""
            />
            <p className="text-4xl text-black font-semibold modelHead me-14">
              Invoice
            </p>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className=" flex justify-between">
            <div className=" p-2 w-100">
              <p className="modelClientText mb-2 text-base">Bill To:</p>
              <h1 className="modelClientHeadText mb-2 font-semibold text-lg">
                {formData.to.name}
              </h1>
              <p className="modelClientText mb-2 text-base">
                (+92) 334 41087865
              </p>
              <p className="modelClientText mb-2 text-base">info@gmail.com</p>
            </div>
            <div className=" p-2 w-100">
              <p className="modelClientText mb-2 text-base">From:</p>
              <h1 className="modelClientHeadText mb-2 font-semibold text-lg">
                Webz Poland
              </h1>
              <p className="modelClientText mb-2 text-base">
                (+92) 334 41087865
              </p>
              <p className="modelClientText mb-2 text-base">info@gmail.com</p>
              <p className="modelClientText text-base">
                3909 Heavner Avenue <br /> Mountain, GA 30083
              </p>
            </div>
          </div>
          <div className="flex justify-between mx-2 mt-5">
            <p className="text-base">Reference No: 00004 </p>
            <p className="text-base">04 December 2024 </p>
          </div>
          <div className="mt-5 shadow-sm border rounded-lg overflow-x-auto">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-200 text-black font-normal text-lg border-b">
                <tr>
                  <th className="py-3 px-6">Description</th>
                  <th className="py-3 px-6 text-end">SubTotal</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 divide-y">
                {tableItems.map((item, idx) => (
                  <tr key={idx}>
                    <td className="ps-5 py-4 whitespace-nowrap flex items-end gap-x-6">
                      {item.name} <br />
                      {item.SubName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-end text-lg">
                      {item.Price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-gray-200 text-black text-lg border-b">
                <tr>
                  <th className="py-3 px-6 font-bold">Description</th>
                  <th className="py-3 px-6 text-end">$150,000</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="flex justify-center gap-5 mt-5">
            <button
              className="px-6 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-[#D22B2B] rounded-md hover:bg-[#D22B2B] focus:outline-none focus:bg-[#D22B2B]"
              onClick={onClickTwo}
              type="submit"
            >
              Generate Invoice
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Invoice;
