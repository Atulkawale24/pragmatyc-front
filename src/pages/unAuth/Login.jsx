import React, { useState } from "react";
import loginImg from "../../assets/images/login-img.jpg";
import loginStyle from "../../styles/login.module.css";
import CustomInput from "../../common-components/CustomInput";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { communication } from "../../services/communication";
import Cookies from "js-cookie";
import Loader from "../../common-components/Loader";
import { toast } from "react-toastify";
import { setUserData } from "../../store/userDetail";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const {
    trigger,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({

  });
  const [isLoading, setIsLoading] = useState(false)
  const [toggle, setToggle] = useState({
    password: false,
    confirmPassword: false,
  });
  //register user
  const Login = async (data) => {
    try {
      setIsLoading(true);
      const dataToSend = {
        email: data?.email,
        password: data?.password
      }
      const responseFromServer = await communication.loginUser(dataToSend);
      if (responseFromServer?.data?.status === "SUCCESS") {
        setIsLoading(false);
        Cookies.set("pragmatyc_token", responseFromServer?.data?.jwtToken);
        dispatch(setUserData(responseFromServer?.data?.userDetails));
        toast.success(responseFromServer?.data?.message);
        navigate("/dashboard");
      } else {
        setIsLoading(false);
        toast.error(responseFromServer?.data?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading &&
        <Loader />
      }
      <div className={loginStyle?.loginWrapper}>
        <div className={`${loginStyle?.gridWrapper}`}>
          <div className={`${loginStyle?.formWrapper}`}>
            <div className="w-[100%]">
              <h2 className={loginStyle?.title}>Let's Get Started</h2>
              <p className={loginStyle?.secondaryTitle}>
                Sign in to continue to Admin
              </p>
              <div className="pt-6">
                <CustomInput
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Enter your Email..."
                  trigger={trigger}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  }}
                />
                <CustomInput
                  control={control}
                  name="password"
                  label="Password"
                  type={!toggle?.password ? "password" : "text"}
                  placeholder="Enter your Password..."
                  trigger={trigger}
                  rules={{ required: "Password is required" }}
                  icon={
                    toggle?.password ? (
                      <FaEye className="text-gray" />
                    ) : (
                      <IoEyeOffSharp className="text-gray" />
                    )
                  }
                  onClick={() =>
                    setToggle({ ...toggle, password: !toggle?.password })
                  }
                />
                <button
                  onClick={handleSubmit(Login)}
                  className="bg-blue text-white w-full py-1.5 my-4 rounded-md shadow-md font-montserrat text-sm"
                >
                  Login
                </button>
                <div className="flex items-center justify-center gap-1">
                  <h6 className="text-gray font-montserrat text-sm">
                    Don't have an account?
                  </h6>
                  <button
                    onClick={() => navigate("/register")}
                    className="text-black font-montserrat text-sm"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={loginStyle?.imageWrapper}>
            <img src={loginImg} alt="login-img" loading="lazy" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
