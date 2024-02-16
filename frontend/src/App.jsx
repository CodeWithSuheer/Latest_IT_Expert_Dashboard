import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPanel from "./components/Admin/AdminPanel";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Dashboard from "./components/Admin/Dashboard/Dashboard";
import Invoice from "./components/Admin/Invoice/Invoice";
import NotFound from "./components/NotFound/NotFound";
import PendingRequests from "./components/Admin/AdminInfo/PendingRequests";
import ApprovedRequests from "./components/Admin/AdminInfo/ApprovedRequests";
import  { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { authUserAsync } from "./features/authSlice";
import { useDispatch } from "react-redux";
import { AdminProtected, LoginProtected } from "./components/ProtectedRoutes/ProtectedRoutes";
import AllInvoices from "./components/Admin/Invoice/AllInvoices";
import AllUsers from "./components/Admin/Users/AllUsers";
import Projects from "./components/Admin/Projects/Projects";
import UpdateInvoice from "./components/Admin/Invoice/UpdateInvoice";
import Support from "./components/Admin/Support/Support";
import AddProjects from "./components/Admin/Projects/AddProjects";
import ProjectsDetails from "./components/Admin/Projects/ProjectsDetails";
import "./App.css";
import UpdateProjects from "./components/Admin/Projects/UpdateProjects";
import ProjectsOrder from "./components/Admin/ProjectsOrder/ProjectsOrder";


function App() {
  const dispatch = useDispatch();

  // SLICE FUNCTION CALL HERE
  useEffect(()=>{
    dispatch(authUserAsync())
  },[dispatch])
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* --------- INITIAL ROUTE --------- */}
          <Route path="/" element={<LoginProtected><Login /></LoginProtected>} />
          <Route path="*" element={<NotFound />} />

          {/* --------- DASHBOARD --------- */}
          <Route path="/adminpanel" element={<AdminProtected><AdminPanel /></AdminProtected>}>
            <Route index element={<Dashboard />} />
            {/* USERS */}
            <Route path="allusers" element={<AllUsers />} />
            {/* INVOICES */}
            <Route path="invoice" element={<Invoice />} />
            <Route path="all-invoice" element={<AllInvoices />} />
            <Route path="updateInvoice/:id" element={<UpdateInvoice />} />
            {/* PROJECTS */}
            <Route path="projects" element={<Projects />} />
            <Route path="addProjects" element={<AddProjects />} />
            <Route path="projectdetails/:id" element={<ProjectsDetails />} />
            <Route path="updateproject/:id" element={<UpdateProjects />} />
            <Route path="projectsOrders" element={<ProjectsOrder />} />
            {/* SUPPORTS */}
            <Route path="support" element={<Support />} />
            {/* ADMIN - REQUESTS */}
            <Route path="pending-requests" element={<PendingRequests />} />
            <Route path="approved-requests" element={<ApprovedRequests />} />
          </Route>

          {/* --------- AUTHENTICATION --------- */}
          <Route path="/signup" element={<LoginProtected><SignUp /></LoginProtected>} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/api/user/resetPassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}

export default App;
