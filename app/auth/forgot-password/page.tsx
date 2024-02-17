"use client";

import React, { useState } from "react";
import OrganisationServices from "../../Services/DonorServices";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button, Input } from "@nextui-org/react";
import { IoMdMail } from "react-icons/io";
import { FaArrowRight, FaLock } from "react-icons/fa";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [errors, setErrors] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const [verified, setVerified] = useState({
    email: false,
    otp: false,
    password: false,
  });

  const resetErrors = () => {
    setErrors({
      email: "",
      otp: "",
      password: "",
    });
  };

  const getOTP = async () => {
    resetErrors();
    const res = await OrganisationServices.sendOTP({ email });

    if (!res.data.status) {
      setErrors({ ...errors, email: "Email Not Found." });
      return;
    }

    toast.success("OTP Sent On Mail.");
    setVerified({ ...verified, email: true });
  };

  const verifyOTP = async () => {
    resetErrors();
    const res = await OrganisationServices.verifyOTP({ email, otp });

    if (!res.data.status) {
      setErrors({ ...errors, otp: "OTP not valid" });
      return;
    }

    toast.success("OTP Verified.");
    setVerified({ ...verified, otp: true });
  };

  const resetPassword = async () => {
    resetErrors();
    const res = await OrganisationServices.resetPassword({ email, otp, newPassword: password });

    if (!res.data.status) {
      setErrors({ ...errors, password: "A problem has occured." });
      return;
    }

    toast.success("Password Updated.");
    router.push("/auth/login");
  };

  return (
    <div className="h-[100vh] flex justify-center items-center flex-col">
      <h1 className="text-6xl font-bold">Forgot Password?</h1>
      {!verified.email && (
        <div className={`w-full md:w-2/3 lg:w-1/2 px-10 mt-10 flex items-end gap-2 ${errors.email && "items-center"}`}>
          <Input
            type="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            errorMessage={errors.email}
            isInvalid={errors.email ? true : false}
            onValueChange={(val) => setEmail(val)}
            labelPlacement="outside"
            startContent={<IoMdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          />
          <Button color="primary" onClick={getOTP}>
            <FaArrowRight />
          </Button>
        </div>
      )}

      {verified.email && !verified.otp && (
        <div className={`w-full md:w-2/3 lg:w-1/2 px-10 mt-10 flex items-end gap-2 ${errors.email && "items-center"}`}>
          <Input
            type="text"
            label="OTP"
            placeholder="Eg. 123456"
            value={otp}
            errorMessage={errors.otp}
            isInvalid={errors.otp ? true : false}
            onValueChange={(val) => setOtp(val)}
            labelPlacement="outside"
            startContent={<FaLock className="text-lg text-default-400 pointer-events-none flex-shrink-0 mr-2" />}
          />
          <Button color="primary" onClick={verifyOTP}>
            <FaArrowRight />
          </Button>
        </div>
      )}

      {verified.email && verified.otp && !verified.password && (
        <div className={`w-full md:w-2/3 lg:w-1/2 px-10 mt-10 flex items-end gap-2 ${errors.email && "items-center"}`}>
          <Input
            type="text"
            label="New Password"
            placeholder="Eg. 123456"
            value={password}
            errorMessage={errors.password}
            isInvalid={errors.password ? true : false}
            onValueChange={(val) => setPassword(val)}
            labelPlacement="outside"
            startContent={<IoMdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          />
          <Button color="primary" onClick={resetPassword}>
            <FaArrowRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
