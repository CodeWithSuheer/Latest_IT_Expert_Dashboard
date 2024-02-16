import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../Images/ITEXPERTS_LOGO.png";
import toast from "react-hot-toast";
import { forgetuserAsync, loginuserAsync } from "../../features/authSlice";

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  // HANDLE SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("email", email);
    dispatch(forgetuserAsync({ email: email }));
    setEmail("");
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
                Forget Password
              </h1>
            </div>

            <div className="mt-14 lg:w-1/2 lg:mt-16">
              <form className="w-full lg:max-w-xl" onSubmit={handleSubmit}>
                <div className="relative flex items-center">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </span>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full py-3 text-lg text-gray-900 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                    required
                  />
                </div>

                <div className="mt-8 flex justify-center md:items-center">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 text-md font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Send Email
                  </button>

                  <Link
                    to="/"
                    className="inline-block mt-4 text-center text-blue-500 md:mt-0 md:mx-6 hover:underline"
                  >
                    Login to your account?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ForgetPassword;
