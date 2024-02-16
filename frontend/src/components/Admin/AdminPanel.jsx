import React, { useEffect } from "react";
import AdminHeader from "./AdminHeader";
import AdminBody from "./AdminBody";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <AdminHeader />
      <AdminBody />
    </>
  );
};

export default AdminPanel;
