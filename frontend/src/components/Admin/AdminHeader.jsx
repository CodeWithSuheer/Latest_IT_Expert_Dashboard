import { Navbar, TextInput } from "keep-react";
import {
  CaretDown,
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  MagnifyingGlass,
  TwitterLogo,
  SignOut,
  SquaresFour,
  TreeStructure,
  Users,
} from "phosphor-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAsync, reset } from "../../features/authSlice";
import logo from "../../assets/logo2.png";
import "./AdminPanel.css";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);

  // HANDLE LOGOUT
  const handleLogout = () => {
    dispatch(logoutUserAsync()).then(() => {
      dispatch(reset());
    });
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <Navbar fluid={true} className="bg-white navbar">
      <Navbar.Container className="flex items-center justify-between py-1">
        <Link to="/adminpanel">
          <Navbar.Brand>
            <img src={logo} alt="keep" width="150" height="60" />
          </Navbar.Brand>
        </Link>

        <Navbar.Container className="flex items-center gap-6">
          <Navbar.Container className="menu_remove flex gap-1">
            <Navbar.Toggle
              className="text-gray-100"
              onClick={() => setMenuOpen(!isMenuOpen)} // Toggle menu open/close
            />
            <div className=" capitalize text-xl text-black">
              {user?.login ? user.name : ""}
            </div>
          </Navbar.Container>

          <Navbar.Container
            tag="ul"
            className="lg:flex hidden items-center justify-between gap-4 pr-6"
          >
            <button className="Btn" onClick={handleLogout}>
              <div className="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>

              <div className="text">Logout</div>
            </button>
          </Navbar.Container>
        </Navbar.Container>
        <Navbar.Collapse
          collapseType="sidebar"
          className="fixed right-0 top-0 bg-white p-10 lg:!w-2/6 xl:!w-1/6 md:!w-2/6 w-1/2"
        >
          <Navbar.Container tag="ul" className="flex flex-col gap-5">
            <Link
              className="flex"
              to="/adminpanel"
              onClick={handleMenuItemClick}
            >
              <SquaresFour size={24} className="me-2" />
              Dashboard
            </Link>
            <Link
              className="flex"
              to="/adminpanel/users"
              onClick={handleMenuItemClick}
            >
              <Users size={24} className="me-2" />
              Users
            </Link>
          </Navbar.Container>
        </Navbar.Collapse>
      </Navbar.Container>
    </Navbar>
  );
};

export default AdminHeader;
