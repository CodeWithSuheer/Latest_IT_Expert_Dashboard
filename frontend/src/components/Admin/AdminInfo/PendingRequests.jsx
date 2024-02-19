import { useEffect, useState } from "react";
import { Modal, Button, Spinner } from "keep-react";
import { Trash } from "phosphor-react";
import { useDispatch, useSelector } from "react-redux";
import {
  authorizeUserAsync,
  getAllUsersAsync,
  rejectUserAsync,
} from "../../../features/adminInfoSlice";

const PendingRequests = () => {
  const dispatch = useDispatch();
  const [showErrorModalX, setShowErrorModalX] = useState(false);
  const [deleteMsgId, setDeleteMsgId] = useState(null);
  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);
  const allUsers = useSelector((state) => state.adminInfo.allUsers).filter(
    (ele) => !ele.isAuthenticated
  );

  const loading = useSelector((state) => state.adminInfo.loading)

  const handleApprove = (id) => {
    dispatch(authorizeUserAsync(id)).then(() => {
      dispatch(getAllUsersAsync());
    });
  };

  const onClickErrorModal = (id) => {
    setShowErrorModalX(!showErrorModalX);
  };

  const openDeleteModal = (id) => {
    setShowErrorModalX(!showErrorModalX);
    setDeleteMsgId(id);
  };

  const handleDelete = (id) => {
    dispatch(rejectUserAsync(id)).then(() => {
      dispatch(getAllUsersAsync());
    });
  };

  const delete_MsgId = allUsers.filter((data) => data.id === deleteMsgId);

  return (
    <>
      <div className="py-10 px-4 md:px-8 rounded-md bg-white">
        <div className="items-start justify-between md:flex">
          <div className="max-w-4xl">
            <h3 className="text-gray-800 text-2xl font-semibold tracking-wide sm:text-3xl">
              PENDING REQUESTS{" "}
              <span className="text-lg font-normal">({allUsers.length})</span>
            </h3>
            <p className="text-gray-700 text-lg mt-4">
              List of Pending Requests.
            </p>
          </div>
          {/* <div className="mt-3 md:mt-0"></div> */}
        </div>


        {loading ? (
            <div className="flex justify-center items-center">    
    <Spinner color="failure" size="lg"  />
    </div>
  ) : (

        <div className="mt-12 relative h-max">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-gray-600 font-medium border-b">
              <tr>
                <th className="py-3 pr-6 text-lg">Id</th>
                <th className="py-3 pr-6 text-lg">Name</th>
                <th className="py-3 pr-6 text-lg">Email</th>
                {/* <th className="py-3 pr-6 text-lg">Role</th> */}
                <th className="py-3 pl-2 text-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 divide-y">
              {allUsers.map((data, index) => (
                <tr key={index}>
                  <td className="pr-6 py-4 text-lg">{index + 1}</td>
                  <td className="pr-6 py-4 text-lg">{data.name}</td>
                  <td className="pr-6 py-4 text-lg">{data.email}</td>
                  {/* <td className="pr-6 py-4 text-lg">{data.role}</td> */}
                  <td className="whitespace-nowrap">
                    <button
                      onClick={() => handleApprove(data.id)}
                      className="inline-block rounded-lg bg-gray-700 px-4 py-2.5 mx-1 text-md font-medium text-white focus:outline-none focus:ring active:bg-indigo-500"
                    >
                      Approved
                    </button>

                    <button
                      onClick={() => openDeleteModal(data.id)}
                      className="inline-block rounded-lg border border-red-600 bg-red-600 text-white px-4 py-2.5 mx-1 text-md font-medium transition  focus:outline-none focus:ring active:bg-red-500"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

  )}

        
      </div>

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

export default PendingRequests;
