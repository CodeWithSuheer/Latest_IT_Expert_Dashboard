import { useEffect, useState } from "react";
import { Sidebar } from "keep-react";
import {
  Chat,
  SignOut,
  PaperPlaneTilt,
  UserGear,
  UsersThree,
  Clock,
  Check,
  Browsers,
  Files,
  FileText,
} from "phosphor-react";
import Icons from "./Icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, reset } from "../../features/authSlice";
import { HeartHandshake, File } from "lucide-react";
import "./AdminPanel.css";

const AdminBody = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  // HANDLE LOGOUT
  const handleLogout = () => {
    dispatch(logoutUserAsync()).then(() => {
      dispatch(reset());
    });
  };

  const AllUsersIcon = (
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
      className={`lucide lucide-users-round ${
        location.pathname === "/adminpanel/allusers" ? "text-white" : ""
      }`}
    >
      <path d="M18 21a8 8 0 0 0-16 0" />
      <circle cx="10" cy="8" r="5" />
      <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
    </svg>
  );

  const admin = useSelector((state) => state.auth.user);

  return (
    <>
      <div className="adminBody bg-slate-300 px-0">
        {/* ------------ DASHBOARD SIDE MENU ------------  */}
        <div className="admin_sideMenu">
          <Sidebar
            className="pt-6"
            aria-label="Sidebar with multi-level dropdown example"
            style={{
              minHeight: "92.1vh",
              backgroundColor: "#fff",
            }}
          >
            <Sidebar.ItemGroup>
              {/* -------- CONTACT QUERIES --------  */}
              <Link to="/adminpanel">
                <Sidebar.Item
                  // style={{ fontSize: "1.125rem" }}
                  icon={
                    <Chat
                      size={22}
                      className={` ${
                        location.pathname === "/adminpanel" ? "text-white" : ""
                      }`}
                    />
                  }
                  className={`my-3 ${
                    location.pathname === "/adminpanel" ? "active-link" : ""
                  }`}
                >
                  <span className="md:text-sm lg:text-sm xl:text-md 2xl:text-lg">
                    Contact Queries
                  </span>
                </Sidebar.Item>
              </Link>

              {/* -------- ALL USERS / CLIENTS --------  */}
              <Link to="/adminpanel/allusers">
                <Sidebar.Item
                  // icon={ <Files size={24} className={` ${ location.pathname === "/adminpanel/allusers" ? "text-white" : "" }`} /> }
                  icon={<Icons.AllUsersIcon location={location} />}
                  className={`my-3 ${
                    location.pathname === "/adminpanel/allusers"
                      ? "active-link"
                      : ""
                  }`}
                >
                  <span className="md:text-sm lg:text-sm xl:text-md 2xl:text-lg">
                    Clients
                  </span>
                </Sidebar.Item>
              </Link>

              {/* -------- ALL INVOICE --------  */}
              <Link to="/adminpanel/all-invoice">
                <Sidebar.Item
                  // style={{ fontSize: "1.125rem" }}
                  icon={
                    <Files
                      size={24}
                      className={` ${
                        location.pathname === "/adminpanel/all-invoice"
                          ? "text-white"
                          : ""
                      }`}
                    />
                  }
                  className={`my-3 ${
                    location.pathname === "/adminpanel/all-invoice"
                      ? "active-link"
                      : ""
                  }`}
                >
                  <span className="md:text-sm lg:text-sm xl:text-md 2xl:text-lg">
                    Invoices
                  </span>
                </Sidebar.Item>
              </Link>
              {/* -------- ALL INVOICE --------  */}
              <Link to="/adminpanel/projectsOrders">
                <Sidebar.Item
                  // style={{ fontSize: "1.125rem" }}
                  icon={
                    <File
                      size={24}
                      className={` ${
                        location.pathname === "/adminpanel/projectsOrders"
                          ? "text-white"
                          : ""
                      }`}
                    />
                  }
                  className={`my-3 ${
                    location.pathname === "/adminpanel/projectsOrders"
                      ? "active-link"
                      : ""
                  }`}
                >
                  <span className="md:text-sm lg:text-sm xl:text-md 2xl:text-lg">
                    Projects Order
                  </span>
                </Sidebar.Item>
              </Link>

              {/* -------- PROJECTS --------  */}
              <Link to="/adminpanel/projects">
                <Sidebar.Item
                  icon={
                    <Browsers
                      size={24}
                      className={` ${
                        location.pathname === "/adminpanel/projects"
                          ? "text-white"
                          : ""
                      }`}
                    />
                  }
                  className={`my-3 ${
                    location.pathname === "/adminpanel/projects"
                      ? "active-link"
                      : ""
                  }`}
                >
                  <span className="md:text-sm lg:text-sm xl:text-md 2xl:text-lg">
                    Projects
                  </span>
                </Sidebar.Item>
              </Link>

              {/* -------- SUPPORT --------  */}
              <Link to="/adminpanel/support">
                <Sidebar.Item
                  icon={
                    <HeartHandshake
                      size={24}
                      className={` ${
                        location.pathname === "/adminpanel/support"
                          ? "text-white"
                          : ""
                      }`}
                    />
                  }
                  className={`my-3 ${
                    location.pathname === "/adminpanel/support"
                      ? "active-link"
                      : ""
                  }`}
                >
                  <span className="md:text-sm lg:text-sm xl:text-md 2xl:text-lg">
                    Support
                  </span>
                </Sidebar.Item>
              </Link>

              {/* -------- PROJECTS --------  */}
              {/* <Sidebar.Collapse
                icon={<Browsers size={24} />}
                label="Projects"
                style={{ fontSize: "1.125rem" }}
              >
                <Link to="/adminpanel/ongoingprojects">
                  <Sidebar.Item
                    icon={
                      <Clock
                        size={24}
                        className={` ${
                          location.pathname === "/adminpanel/ongoingprojects"
                            ? "text-white"
                            : ""
                        }`}
                      />
                    }
                    className={`my-2 ${
                      location.pathname === "/adminpanel/ongoingprojects"
                        ? "active-link"
                        : ""
                    }`}
                  >
                    <span className="text-lg">Ongoing Projects</span>
                  </Sidebar.Item>
                </Link>
                <Link to="/adminpanel/completedprojects">
                  <Sidebar.Item
                    icon={
                      <Check
                        size={24}
                        className={` ${
                          location.pathname === "/adminpanel/completedprojects"
                            ? "text-white"
                            : ""
                        }`}
                      />
                    }
                    className={`my-2 ${
                      location.pathname === "/adminpanel/completedprojects"
                        ? "active-link"
                        : ""
                    }`}
                  >
                    <span className="text-lg">Completed Projects</span>
                  </Sidebar.Item>
                </Link>
              </Sidebar.Collapse> */}

              {/* -------- ADMIN INFO'S --------  */}
              {admin?.superAdmin ? (
                <Sidebar.Collapse
                  // icon={<UsersThree size={24} />}
                  icon={<Icons.AdminInfoIcon location={location} />}
                  label="Admin's Info"
                  // style={{ fontSize: "1.125rem" }}
                >
                  <>
                    <Link to="/adminpanel/pending-requests">
                      <Sidebar.Item
                        icon={
                          <PaperPlaneTilt
                            size={24}
                            className={` ${
                              location.pathname ===
                              "/adminpanel/pending-requests"
                                ? "text-white"
                                : ""
                            }`}
                          />
                        }
                        className={`my-2 ${
                          location.pathname === "/adminpanel/pending-requests"
                            ? "active-link"
                            : ""
                        }`}
                      >
                        <span className="md:text-sm lg:text-sm xl:text-md 2xl:text-lg">
                          Pending Requests
                        </span>
                      </Sidebar.Item>
                    </Link>

                    <Link to="/adminpanel/approved-requests">
                      <Sidebar.Item
                        icon={
                          <UserGear
                            size={24}
                            className={` ${
                              location.pathname ===
                              "/adminpanel/approved-requests"
                                ? "text-white"
                                : ""
                            }`}
                          />
                        }
                        className={`my-2 ${
                          location.pathname === "/adminpanel/approved-requests"
                            ? "active-link"
                            : ""
                        }`}
                      >
                        <span className="md:text-sm lg:text-sm xl:text-md 2xl:text-lg">
                          Appproved Admins
                        </span>
                      </Sidebar.Item>
                    </Link>
                  </>
                </Sidebar.Collapse>
              ) : (
                ""
              )}
            </Sidebar.ItemGroup>

            {/* -------- GENERATE INVOICE --------  */}
            <Sidebar.ItemGroup>
              <Link to="/adminpanel/invoice">
                <Sidebar.Item
                  icon={
                    <FileText
                      size={24}
                      className={` ${
                        location.pathname === "/adminpanel/invoice"
                          ? "text-white"
                          : ""
                      }`}
                    />
                  }
                  className={`my-2 ${
                    location.pathname === "/adminpanel/invoice"
                      ? "active-link"
                      : ""
                  }`}
                >
                  <span className="md:text-sm lg:text-sm xl:text-md 2xl:text-lg">
                    Generate Invoice
                  </span>
                </Sidebar.Item>
              </Link>
            </Sidebar.ItemGroup>
          </Sidebar>
        </div>
        {/* ------------ DASHBOARD DISPLAYER ------------  */}
        <div className="admin_display sm:mx-2 md:mx-4 mx-6 mt-5 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminBody;
