import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../Images/ITEXPERTS_LOGO.png";
import toast from "react-hot-toast";
import { loginuserAsync, resetpasswordAsync } from "../../features/authSlice";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetToken = new URLSearchParams(window.location.search).get("t");

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      dispatch(
        resetpasswordAsync({ newPassword, confirmPassword, resetToken })
      );
      //console.log(newPassword, confirmPassword, resetToken);

      // setIsLoading(false);
      // if (response.payload && response.payload.success) {
      // toast.success("Password reset successfully.");
      navigate("/");
      // } else {
      //     toast.error("Password reset failed. Please try again.");
      // }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      //toast.error("Password reset failed. Please try again.");
    }
  };

  return (
    <>
      <section
        className="bg-gray-100 flex justify-center items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="container px-6 mx-auto">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <img className="w-auto h-32 sm:h-20" src={Logo} alt="" />

              <h1 className="mt-6 font-semibold text-gray-700 md:text-xl">
                IT EXPERTS ADMIN DASHBOARD
              </h1>

              <h1 className="mt-6 text-4xl font-semibold text-gray-800 capitalize lg:text">
                Reset Password
              </h1>
            </div>

            <div className="mt-14 lg:w-1/2 lg:mt-0">
              <form
                className="w-full lg:max-w-xl"
                onSubmit={handleResetPassword}
              >
                {/* --------- PASSWORD FIELD --------- */}
                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>

                  <input
                    type="password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    className="block w-full px-10 py-3 text-lg text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                    required
                  />
                </div>
                {/* --------- CONFIRM PASSWORD FIELD --------- */}
                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </span>

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="block w-full px-10 py-3 text-lg text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="mt-8 md:flex md:items-center">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-md font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
