import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createuserAsync } from "../../features/authSlice";
import Logo from "../../Images/ITEXPERTS_LOGO.png";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // HANDLE SIGNUP
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(createuserAsync(formData)).then((res) => {
        if(res.payload.msg == 'User Registerd SuccessFully'){
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        navigate('/', { replace: true }); 
       }
      });
    } catch (error) {
      console.log(error);
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
            <div className="lg:w-1/2 mt-14">
              <img className="w-auto h-32 sm:h-20" src={Logo} alt="" />

              <h1 className="mt-6 font-semibold text-gray-700 md:text-xl">
                IT EXPERTS ADMIN DASHBOARD
              </h1>

              <h1 className="mt-6 text-4xl font-bold text-gray-600 capitalize lg:text">
                SignUp your account
              </h1>
            </div>

            <div className="mt-14 lg:w-1/2 lg:mt-8">
              <form className="w-full lg:max-w-xl" onSubmit={handleSignUp}>
                <div className="relative flex items-center mt-8">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="block w-full py-3 text-lg text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="relative flex items-center mt-4">
                  <span className="absolute">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mx-3 text-gray-700 "
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
                    name="email"
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
                      className="w-6 h-6 mx-3 text-gray-700 "
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
                    name="password"
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
                    // onClick={handleSignUp}
                    type="submit"
                    className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg md:w-1/2 hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Sign Up
                  </button>

                  <Link
                    to="/"
                    className="inline-block mt-4 text-center text-blue-500 md:mt-0 md:mx-6 hover:underline"
                  >
                    Already have an account?
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

export default SignUp;
