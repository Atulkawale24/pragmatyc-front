import React, { useState } from "react";
import loginImg from "../../assets/images/login-img.jpg";
import loginStyle from "../../styles/login.module.css";
import CustomInput from "../../common-components/CustomInput";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { IoEyeOffSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { communication } from "../../services/communication";
import { toast } from "react-toastify";
import Loader from "../../common-components/Loader";

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  const {
    getValues,
    trigger,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const [toggle, setToggle] = useState({
    password: false,
    confirmPassword: false,
  });
  
  //register user
  const registerUser = async (data) => {
    try {
      setIsLoading(true);
      const dataToSend = {
        name: data?.fullName,
        email: data?.email,
        password: data?.password
      }
      const responseFromServer = await communication.userRegistration(dataToSend);
      if (responseFromServer?.data?.status === "SUCCESS") {
        setIsLoading(false);
        toast.success(responseFromServer?.data?.message);
        navigate("/");
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
              <h2 className={loginStyle?.title}>Get started with us</h2>
              <p className={loginStyle?.secondaryTitle}>
                Register a new membership
              </p>
              <div className="pt-6">
                <CustomInput
                  control={control}
                  name="fullName"
                  label="Full Name"
                  placeholder="Enter Full Name..."
                  trigger={trigger}
                  rules={{ required: "Full Name is required" }}
                />
                <CustomInput
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Enter Email..."
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
                  placeholder="Enter Password..."
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
                <CustomInput
                  control={control}
                  name="confirmPassword"
                  label="Retype Password"
                  type={!toggle?.confirmPassword ? "password" : "text"}
                  placeholder="Retype password..."
                  trigger={trigger}
                  rules={{
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Password does not matched!",
                  }}
                  icon={
                    toggle?.confirmPassword ? (
                      <FaEye className="text-gray" />
                    ) : (
                      <IoEyeOffSharp className="text-gray" />
                    )
                  }
                  onClick={() =>
                    setToggle({
                      ...toggle,
                      confirmPassword: !toggle?.confirmPassword,
                    })
                  }
                />
                <button
                  onClick={handleSubmit(registerUser)}
                  className="bg-blue text-white w-full py-1.5 my-4 rounded-md shadow-md font-montserrat text-sm"
                >
                  Register
                </button>
                <div className="flex items-center justify-center gap-1">
                  <h6 className="text-gray font-montserrat text-sm">
                    Already have an account?
                  </h6>
                  <button
                    onClick={() => navigate("/")}
                    className="text-black font-montserrat text-sm"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={loginStyle?.imageWrapper}>
            <img src={loginImg} alt="vehicle-img" loading="lazy" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
