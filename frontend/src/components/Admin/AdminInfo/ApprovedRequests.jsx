import React, { useEffect, useState } from "react";
import { Dropdown, Spinner } from "keep-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsersAsync,
  rejectUserAsync,
  updateRoleAsync,
} from "../../../features/adminInfoSlice";

const ApprovedRequests = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);


  const approvedUsers = useSelector((state) => state.adminInfo.allUsers).filter((ele) => ele.isAuthenticated && ele.id !== "659d33bad568c4d134b6aed3");
  
  const loading = useSelector((state) => state.adminInfo.loading)


  // HANDLE ROLE UPDATE
  const handleUnauthorize = (id) => {
    dispatch(rejectUserAsync(id)).then(() => {
      dispatch(getAllUsersAsync());
    });
  };


  const handleUpdateRole = (id, superAdmin) => {
    console.log(id, superAdmin);
    dispatch(updateRoleAsync({ id, superAdmin })).then(() => {
      dispatch(getAllUsersAsync());
    });
  };

  const displayRole = (role) => {
    if (role) {
      return <p>Super Admin</p>;
    } else {
      return <p>Admin</p>;
    }
  };

  return (
    <>
      <div className="py-10 px-4 md:px-8 rounded-md bg-white">
        <div className="items-start justify-between md:flex">
          <div className="max-w-4xl">
            <h3 className="text-gray-800 text-2xl font-semibold tracking-wide sm:text-3xl">
              ADMINS{" "}
              <span className="text-lg font-normal">
                ({approvedUsers.length})
              </span>
            </h3>
            <p className="text-gray-700 text-lg mt-4">
              List of authorized admins.
            </p>
          </div>
        </div>




        {loading ? (
            <div className="flex justify-center items-center">    
    <Spinner color="failure" size="lg"  />
    </div>
  ) : (


        <div className="mt-12 relative h-max">
          <table className="w-full table-auto text-sm text-left">
            <thead className="text-[#242435] bg-[#F7F7F7] font-medium border-b">
              <tr>
              <th className="py-4 px-6 text-lg font-medium">Id</th>
                <th className="py-4 px-6 text-lg font-medium">Name</th>
                <th className="py-4 px-6 text-lg font-medium">Email</th>
                <th className="py-4 px-6 text-lg font-medium">Role</th>
                <th className="py-4 px-6 text-lg font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-lg divide-y">
              {approvedUsers.map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {displayRole(data.superAdmin)}
                  </td>
                  <td className="whitespace-nowrap flex py-2">
                    <Dropdown
                      label="Update Role"
                      size="sm"
                      dismissOnClick={true}
                      className="bg-gray-700 mx-1 text-white hover:bg-gray-700 hover:text-white"
                    >
                      <Dropdown.Item
                        onClick={() => handleUpdateRole(data.id, true)}
                        className="text-md font-medium hover:bg-gray-300 hover:text-black"
                      >
                        Super Admin
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => handleUpdateRole(data.id, false)}
                        className="text-md font-medium hover:bg-gray-300 hover:text-black"
                      >
                        Admin
                      </Dropdown.Item>
                    </Dropdown>
                    <button
                      onClick={() => handleUnauthorize(data.id)}
                      className="inline-block rounded-lg bg-red-600 px-4 py-2.5 mx-1 text-sm font-medium text-white focus:outline-none focus:ring active:bg-red-500"
                    >
                      Unauthorized
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      
  )}
      
      </div>
    </>
  );
};

export default ApprovedRequests;
