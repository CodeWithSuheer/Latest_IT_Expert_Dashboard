import { useEffect, useState } from "react";
import { TextInput } from "keep-react";
import { MagnifyingGlass, Trash, Chat } from "phosphor-react";
import { Modal, Button } from "keep-react";
import { CloudArrowUp } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSupportReqAsync } from "../../../features/SupportSlice";

const Support = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModalX, setShowModalX] = useState(false);
  const [Message, setMessage] = useState(null);

  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const allSupportRequests = useSelector(
    (state) => state.support.allSupportReq
  );
  // console.log("allSupportRequests", allSupportRequests);

  // HERE WE CALL THE FUNCTION TO GET SUPPORT DATA
  useEffect(() => {
    dispatch(getAllSupportReqAsync());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  let filterdData;

  if (name) {
    filterdData = allSupportRequests.filter((item) => item.reference === name);
  } else {
    filterdData = allSupportRequests;
  }

  let searchData = [];

  if (searchQuery) {
    searchData = filterdData.filter((data) => {
      const clientName = `${data.client?.firstName || ""} ${
        data.client?.lastName || ""
      }`;
      const clientEmail = data.client?.email || "";

      return (
        clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clientEmail.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
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

  // VIEW MESSAGE MODAL FUNCTION
  const onClickTwo = (id) => {
    console.log("message ", id);
    setShowModalX(!showModalX);
    setMessage(id);
  };

  // MESSEGES FOR MODAL ARE FILTERED HERE
  const filteredId = allSupportRequests.filter(
    (data) => data.support.id === Message
  );

  return (
    <>
      <div className=" py-10 px-2 md:px-5 rounded-md bg-white">
        <div className="items-start justify-between md:flex">
          <div className="max-w-lg">
            <h3 className="text-gray-800 tracking-wide text-2xl font-bold sm:text-3xl">
              Support Queries{" "}
              <span className="text-lg font-normal">
                ({allSupportRequests.length})
              </span>
            </h3>
            {/* <p className="text-gray-600 mt-2">
              {allSupportRequests.length} Total Queries
            </p> */}
          </div>
          <div className="mt-3 mr-10 md:mt-0 flex gap-8">
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
        <div className="mt-12 relative h-max overflow-x-auto">
          {/* ------------- CONTACT QUERIES TABLE ------------- */}
          <table className="contact_table w-full table-auto text-sm text-left overflow-x-auto">
            <thead className="text-[#242435] bg-[#F7F7F7] font-medium border-b">
              <tr>
                <th className="py-4 px-2 text-lg font-medium pl-3">Sr.</th>
                <th className="py-4 px-6 text-lg font-medium pl-3">Name</th>
                <th className="py-4 px-4 text-lg font-medium">Ticket No</th>
                <th className="py-4 px-4 text-lg font-medium">Customer ID</th>
                <th className="py-4 px-4 text-lg font-medium">Department</th>
                <th className="py-4 px-4 text-lg font-medium">Message</th>
                <th className="py-4 px-4 text-lg font-medium">Download</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {displayedData.length > 0 ? (
                displayedData.map((data, idx) => (
                  <tr key={startIndex + idx} className="cursor-pointer">
                    <td className="pr-3 py-3 text-lg pl-3">
                      {startIndex + idx + 1}
                    </td>
                    <td className="gap-x-3 px-6 whitespace-nowrap">
                      <span className="text-gray-700 text-lg font-medium">
                        {`${data.client?.firstName || ""} ${
                          data.client?.lastName || ""
                        }`}
                      </span>{" "}
                      <br />
                      <span className="text-gray-700 text-md">
                        {data.client?.email || ""}
                      </span>
                    </td>
                    <td className="pr-3 py-3 text-lg pl-6">
                      {data.support?.ticketNumber || ""}
                    </td>
                    <td className="pr-6 py-3 text-lg pl-6">
                      {data.client?.customerId || ""}
                    </td>
                    <td className="pr-6 py-3 text-lg pl-6">
                      {data.support?.departmentName || ""}
                    </td>
                    <td
                      className="pr-1 py-3 text-lg pl-6 font-semibold underline underline-offset-4 text-[#F11900]"
                      onClick={() => onClickTwo(data.support?.id)}
                    >
                      View Now
                    </td>
                    <td className="pr-3 py-3 text-lg pl-3">
                      {data.support?.file ? (
                        // <a
                        //   href={data.support.file.downloadURL}
                        //   download={data.support.file.name}
                        //   className="px-3 py-2 text-sm rounded-md bg-gray-700 text-white"
                        // >
                        //   Download
                        // </a>
                        <a
                          href={data.support.file.downloadURL}
                          download={data.support.file.name}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium text-sm py-2 px-4 rounded inline-flex items-center"
                        >
                          <svg
                            className="fill-current w-4 h-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
                          </svg>
                          <span>Download</span>
                        </a>
                      ) : (
                        <span className="text-gray-500">No file available</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 text-2xl text-gray-950">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
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
                {data.support.message}
              </p>
            </div>
          </Modal.Body>
        </Modal>
      ))}
    </>
  );
};

export default Support;
