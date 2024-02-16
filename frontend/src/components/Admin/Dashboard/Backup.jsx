import React, { useState } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { useTheme } from "../../Theme/ThemeContext";
import "./Support.css";
import { useSupportSendMutation } from "../../Services/Support";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";

const Support = ({ openSupportModal, setSupportModal }) => {
  const { isDarkTheme } = useTheme();
  const [support, setSupport] = useState({
    
    AdditionalFile: null,
  
  });
  
 
  

  const handleChange = (e, fieldName) => {
    if (e.target.type === "file") {
      setSupport({
        ...support,
        [fieldName]: e.target.files[0],
      });
    } 
  };

  const Output = async (e) => {
    e.preventDefault();
    if (support.AdditionalFile) {
      // Show loading toast message
      var loadingToastId = toast.loading("Uploading");
    }
    const formData = new FormData();
    formData.append("filename", support.AdditionalFile);
    formData.append("customerId", user.customerId);

    try {
      // Display a toast notification for progress

      // Axios instance with progress event listener
      const response = await axios.post(
        "http://localhost:8080/api/support/createSupport",
        formData
      );

      console.log("response", response);

      // Dismiss the progress toast on success

      if (
        response?.data?.data &&
        response?.data?.msg === "Successfully Submitted"
      ) {
        toast.dismiss(loadingToastId);
        setSuccess(true);
        setTicket(response?.data?.data?.ticketNumber);
        setSupport({
          Service: "",
          AdditionalFile: null,
          Message: "",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const CloseModal = () => {
    openSupportModal();
    setSuccess(success);
  };

  return (
    <>
      <div
        className={"modal OrderModalBox"}
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="modelSupportBox"
          style={{ backgroundColor: isDarkTheme ? "#242435" : "#F7F7F7" }}
        >
          <h1 className="closeOrderModel" onClick={openSupportModal}>
            <RxCross2 />
          </h1>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="image-section">
              <img src="/Dashboard/Suppot_page_image.png" />
            </div>
            <form
              className="content-section d-flex flex-column SupportContent "
              onSubmit={Output}
            >
              <h1
                className=" ModelOrderHead"
                style={{
                  color: isDarkTheme ? "#fff" : "#242435",
                }}
              >
                Get Support?
              </h1>
              <p
                className="supportHead_pera"
                style={{
                  color: isDarkTheme ? "#fff" : "#242435",
                }}
              >
                Lorem ipsum dolor sit amet consectetur. Tincidunt ut et arcu vel
                tincpurus
              </p>
              <select
                className="SelectField"
                value={setSupport.Service}
                onChange={(e) => handleChange(e, "Service")}
                style={{
                  backgroundColor: isDarkTheme ? "#242435" : "#F7F7F7",
                  color: isDarkTheme ? "#868686" : "#242435",
                  border: `1px solid ${isDarkTheme ? "#474759" : "#D9D9D9"}`,
                }}
                required
              >
                <option
                  value=""
                  style={{
                    backgroundColor: isDarkTheme ? "#242435" : "#F7F7F7",
                    color: isDarkTheme ? "#868686" : "#242435",
                  }}
                >
                  Select the Service
                </option>
                <option
                  value="Finance"
                  style={{
                    backgroundColor: isDarkTheme ? "#242435" : "#F7F7F7",
                    color: isDarkTheme ? "#868686" : "#242435",
                  }}
                >
                  Finance
                </option>
                <option
                  value="Product Development/Engineering"
                  style={{
                    backgroundColor: isDarkTheme ? "#242435" : "#F7F7F7",
                    color: isDarkTheme ? "#868686" : "#242435",
                  }}
                >
                  Product Development/Engineering
                </option>
                <option
                  value="Customer Support"
                  style={{
                    backgroundColor: isDarkTheme ? "#242435" : "#F7F7F7",
                    color: isDarkTheme ? "#868686" : "#242435",
                  }}
                >
                  Customer Support
                </option>
                <option
                  value="Sales and Marketing"
                  style={{
                    backgroundColor: isDarkTheme ? "#242435" : "#F7F7F7",
                    color: isDarkTheme ? "#868686" : "#242435",
                  }}
                >
                  Sales and Marketing
                </option>
              </select>

              <div className="FileSupportContainer">
                <label
                  className="FileInputLabelSUpport"
                  htmlFor="logoFile"
                  style={{
                    backgroundColor: isDarkTheme ? "#242435" : "#F7F7F7",
                    border: `1px solid ${isDarkTheme ? "#474759" : "#D9D9D9"}`,
                    "::placeholder": {
                      color: isDarkTheme ? "#868686" : "#242435",
                    },
                  }}
                >
                  <input
                    type="file"
                    id="logoFile"
                    value={setSupport.AdditionalFile}
                    onChange={(e) => handleChange(e, "AdditionalFile")}
                    className="ModelFileDropFieldSupport"
                  />
                  <div className="FileInputIcon">
                    <img
                      className="uploadIcon"
                      src="/Dashboard/upload_file.png"
                    />
                    <span
                      style={{ color: isDarkTheme ? "#868686" : "#242435" }}
                    >
                      {support.AdditionalFile
                        ? support.AdditionalFile.name
                        : "Upload Additional Attachment"}
                    </span>
                  </div>
                </label>
              </div>

              <textarea
                className="NoteFieldSupport"
                placeholder="Message"
                rows="4"
                value={setSupport.Message}
                required
                onChange={(e) => handleChange(e, "Message")}
                style={{
                  backgroundColor: isDarkTheme ? "#242435" : "#F7F7F7",
                  color: isDarkTheme ? "#fff" : "#242435",
                  border: `1px solid ${isDarkTheme ? "#474759" : "#D9D9D9"}`,
                  "::placeholder": {
                    color: isDarkTheme ? "#fff" : "#242435",
                  },
                }}
              ></textarea>
              <button className="ModelSupportBtn mt-3" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      {success && (
        <div
          className={"modal SuccessModalBox"}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="SuccessBox">
            <div className="successHeader">
              <svg
                className="successSVG"
                viewBox="0 0 26 26"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    class="circle"
                    d="M13 1C6.372583 1 1 6.372583 1 13s5.372583 12 12 12 12-5.372583 12-12S19.627417 1 13 1z"
                  />
                  <path
                    className="tick"
                    d="M6.5 13.5L10 17 l8.808621-8.308621"
                  />
                </g>
              </svg>
            </div>
            <h1 className="SuccessHeading">Success!</h1>
            <p className="SuccessText pt-0">Your Ticket Number: {ticket}</p>
            <p className="SuccessText pt-0">
              Our Support team will shortly contact you. Thank You.
            </p>
            <button className="SuccessOkBtn" onClick={CloseModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Support;
