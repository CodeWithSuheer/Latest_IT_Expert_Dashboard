import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../Images/ITEXPERTS_LOGO.png";
import { loginuserAsync } from "../../features/authSlice";
import Loader from "../../components/Loader/Loader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.auth.user);

  // HANDLE FORM SUBMISSION
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginuserAsync(formData));
      // setLoading(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    {loading ? <Loader/> : 
      <section
        className="bg-gray-100 flex justify-center items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="container px-6 mx-auto">
          <div className="lg:flex">
            <div className="lg:w-1/2">
              <img
                className="w-auto h-32 sm:h-20"
                src={Logo}
                alt="company logo"
              />

              <h1 className="mt-6 font-semibold text-gray-700 md:text-xl">
                IT EXPERTS ADMIN DASHBOARD
              </h1>

              <h1 className="mt-6 text-4xl font-bold text-gray-600 capitalize lg:text">
                Login to your account
              </h1>
            </div>

            <div className="mt-14 lg:w-1/2 lg:mt-0">
              <form className="w-full lg:max-w-xl" onSubmit={handleLogin}>
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
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="block w-full py-3 text-lg text-gray-900 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Email address"
                    required
                  />
                </div>

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
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="block w-full px-10 py-3 text-lg text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Password"
                    required
                  />
                </div>

                <div className="mt-8 md:flex md:items-center">
                  <button
                    // onClick={handleLogin}
                    type="submit"
                    className="w-full px-6 py-3 text-md font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Login
                  </button>

                  <Link
                    to="/forgetpassword"
                    className="inline-block mt-4 text-center text-blue-500 md:mt-0 md:mx-6 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>

                <div className="already_account mt-6">
                  <Link
                    to="/signup"
                    className="inline-block mt-4 text-center text-blue-500 md:mt-0 md:mx-2 hover:underline"
                  >
                    Create a new account
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      }
    </>
  );
};

export default Login;
