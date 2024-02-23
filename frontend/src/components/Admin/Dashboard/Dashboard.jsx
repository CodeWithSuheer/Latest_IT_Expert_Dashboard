import { useEffect, useState } from "react";
import { Trash, Chat } from "phosphor-react";
import { Modal, Button } from "keep-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteContactFormAsync,
  getAllFormsAsync,
} from "../../../features/contactFormSlice";
import "./Dashboard.css";
import { Spinner } from "keep-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showModalX, setShowModalX] = useState(false);
  const [showErrorModalX, setShowErrorModalX] = useState(false);
  const [Message, setMessage] = useState(null);
  const [deleteMsgId, setDeleteMsgId] = useState(null);

  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const DashboardData = useSelector((state) => state.contactForms.allForms);
const  loading = useSelector((state) => state.contactForms.loading);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  let filterdData;
  if (name) {
    filterdData = DashboardData.filter((item) => item.reference === name);
  } else {
    filterdData = DashboardData;
  }

  let searchData = [];

  if (searchQuery) {
    searchData = DashboardData.filter(
      (data) =>
        data.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (data.refNumber &&
          data.refNumber.toString().includes(searchQuery.toLowerCase())) ||
        data.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(
    (searchQuery.length > 1 ? searchData.length : filterdData.length) / limit
  );
  const disabled = currentPage === totalPages;
  const disabled2 = currentPage === 1;

  // Calculate the index range for the currently displayed data
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  let displayedData = filterdData.slice(startIndex, endIndex);

  displayedData = searchQuery.length > 1 ? searchData : displayedData;

  useEffect(() => {
    dispatch(getAllFormsAsync());
  }, [dispatch]);

  // VIEW MESSAGE MODAL FUNCTION
  const onClickTwo = (id) => {
    setShowModalX(!showModalX);
    setMessage(id);
  };

  // DELETE MESSAGE MODAL FUNCTION
  const onClickErrorModal = (id) => {
    setShowErrorModalX(!showErrorModalX);
    setDeleteMsgId(id);
  };

  const filteredId = DashboardData.filter((data) => data.id === Message);
  const delete_MsgId = DashboardData.filter((data) => data.id === deleteMsgId);

  // HANDLE CREATE INVOICE
  const handleDelete = async (id) => {
    await dispatch(deleteContactFormAsync(id)).then(() => {
      dispatch(getAllFormsAsync());
    });
  };

  return (
    <>
      <div className=" py-10 px-2 md:px-5 rounded-md bg-white">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 tracking-wide  text-2xl font-bold sm:text-3xl">
              Contact Queries{" "}
              <span className="text-lg font-normal">
                ({DashboardData.length})
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
                  className="md:w-64 lg:w-64 py-2 pl-10 pr-4 text-gray-700 bg-white border border-[#D9D9D9] rounded-lg focus:border-red-400 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-red-300"
                  placeholder="Search"
                />
              </div>
            </div>
          </div>
        </div>


        {loading ? (
            <div className="flex justify-center items-center">    
    <Spinner color="failure" size="lg"  />
    </div>
  ) : (

        <div className="mt-12 relative h-max overflow-x-auto">
          {/* ------------- CONTACT QUERIES TABLE ------------- */}

    

          <table className="contact_table w-full table-auto text-sm text-left overflow-x-auto">
            <thead className="text-[#242435] bg-[#F7F7F7] font-medium border-b">
              <tr>
                <th className="py-4 px-2 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">Sr. </th>
                <th className="py-4 px-6 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">Name</th>
                <th className="py-4 px-2 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">Date</th>
                <th className="py-4 px-2 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">Ref Number</th>
                <th className="py-4 px-2 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">Phone</th>
                {/* <th className="py-4 px-2 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">Email</th> */}
                {/* <th className="py-4 px-2 md:text-md lg:text-md font-medium">Company</th> */}
                <th className="py-4 px-6 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">Message</th>
                <th className=" md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            
            
            <tbody className="text-gray-600 divide-y">
              {displayedData.length > 0 ? (
                displayedData.map((data, idx) => {
                  return (
                    <>
                      <tr key={startIndex + idx} className="cursor-pointer">
                        <td className="px-2 py-3 md:text-md lg:text-md xl:text-md 2xl:text-lg">{startIndex + idx + 1}</td>

                        {/* <td className="gap-x-3 px-6 whitespace-nowrap w-72">
                        <span className="text-gray-700 md:text-md lg:text-md xl:text-md 2xl:text-lg font-medium capitalize">
                          {data.name}
                        </span>{" "}
                        <br />
                        <span className="text-gray-700 text-md">
                          {data.email}
                        </span>
                      </td> */}

                      <td className="gap-x-3 px-6 whitespace-nowrap">
                        <span className="text-gray-700 md:text-sm lg:text-md xl:text-lg font-medium capitalize">
                           {data.name}
                        </span>{" "}
                        <br />
                        <span className="text-gray-700 text-sm">
                          {data?.email || ""}
                        </span>
                      </td>


                        <td className="px-2 py-3 md:text-md lg:text-md xl:text-md 2xl:text-lg w-60">{new Date(data.createdAt).toLocaleDateString()}</td>
                        <td className="px-2 py-3 md:text-md lg:text-md xl:text-md 2xl:text-lg w-60">{data.refNumber}</td>
                        <td className="px-2 py-3 md:text-md lg:text-md xl:text-md 2xl:text-lg w-60">{data.phone}</td>
                        {/* <td className="px-2 py-3 md:text-md lg:text-md xl:text-md 2xl:text-lg">{data.email}</td> */}
                        <td className="pr-1 py-3 pl-6 md:text-md lg:text-md xl:text-md 2xl:text-lg w-60 font-semibold underline underline-offset-4 text-[#F11900]" onClick={() => onClickTwo(data.id)}>View Now</td>
                        <td className="py-3 w-44">
                          <div className="w-11 rounded-full bg-[#F7F7F7] text-black p-2 ms-2.5"
                            onClick={() => onClickErrorModal(data.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-trash-2"
                            >
                              <path d="M3 6h18" />
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                              <line x1="10" x2="10" y1="11" y2="17" />
                              <line x1="14" x2="14" y1="11" y2="17" />
                            </svg>
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })
              ) : (
                <tr>
                  <td className="px-6 py-4 text-lg text-gray-950">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>

 

        </div>

)}
      </div>





      {/* -------------- PAGINATION -------------- */}
      <div className=" flex justify-center mt-5 mb-5">
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
      </div>

      {/* ------------- VIEW MESSAGE MODAL ------------- */}
      {filteredId.map((data, idx) => (
        <Modal
          icon={<Chat size={28} color="#1B4DFF" />}
          size="4xl"
          show={showModalX}
          onClose={onClickTwo}
        >
          <Modal.Header>Message</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <p className="text-xl leading-relaxed text-metal-500">
                {data.message}
              </p>
            </div>
          </Modal.Body>
        </Modal>
      ))}

      {/* ------------- DELETE MESSAGE MODAL ------------- */}
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
    </>
  );
};

export default Dashboard;
