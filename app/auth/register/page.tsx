"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DonorServices from "../../Services/DonorServices";
import { TokenService } from "../../Services/StorageService";
import { donorSchema, loginSchema } from "@/app/validationSchemas";
import { BsGlobe } from "react-icons/bs";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { IoMdMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import toast from "react-hot-toast";
import { FaArrowRight, FaLock, FaUser } from "react-icons/fa";

const RegisterPage = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    gender: "",
  });

  const genders = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Other",
      value: "other",
    },
  ];

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    userExists: "",
    otp: "",
  });

  const router = useRouter();

  const resetErrors = () => {
    setErrors({ firstName: "", lastName: "", email: "", password: "", gender: "", userExists: "", otp: "" });
  };

  const handleSubmit = async () => {
    const otpToast = toast.loading("Sending OTP...");
    resetErrors();
    const validation = donorSchema.safeParse(userDetails);

    if (!validation.success) {
      const errorArray = validation.error.errors;

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    const res = await DonorServices.register(userDetails);

    toast.dismiss(otpToast);
    if (res.data.status) {
      toast.success("OTP Sent on Mail");
      setShowOtp(true);
    } else {
      toast.error("Failed To Send OTP");
      setErrors({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "",
        otp: "",
        userExists: "User Already Exsits.",
      });
    }
  };

  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const verifyOTP = async () => {
    const otpToast = toast.loading("Verifying OTP...");
    resetErrors();
    const res = await DonorServices.verifyOTP({ email: userDetails.email, otp });

    toast.dismiss(otpToast);

    if (!res.data.status) {
      toast.success("Verification Failed.");
      setErrors({ ...errors, otp: "OTP is not valid" });
      return;
    }

    toast.success("OTP Verified.");
    router.push("/auth/login");
  };

  const handleGoBack = async () => {
    const res = await DonorServices.deleteDonor({ email: userDetails.email });

    if (!res.data.status) {
      toast.error("Server Error.");
      return;
    }

    setShowOtp(false);
  };

  return (
    <div className="h-[100vh] flex justify-center items-center flex-col gap-5 py-32">
      <div className="flex gap-2 items-center">
        <BsGlobe className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Regift</h1>
      </div>
      {!showOtp && (
        <div className="w-full md:w-[500px] shadow-md min-h-[400px] rounded-xl p-10 dark:shadow-[#111111]">
          <h1 className="font-bold text-2xl text-center">Create your account.</h1>
          {errors.userExists && <p className="text-center my-5 text-secondary-500">Email already in use.</p>}
          <div className="flex flex-col gap-8 mt-12">
            <Input
              type="text"
              label="First Name"
              radius="sm"
              size="md"
              onValueChange={(val) => setUserDetails({ ...userDetails, firstName: val })}
              isInvalid={errors.firstName ? true : false}
              errorMessage={errors.firstName}
              placeholder="Eg. John"
              labelPlacement="outside"
              startContent={<FaUser className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
            />
            <Input
              type="text"
              label="Last Name"
              radius="sm"
              size="md"
              onValueChange={(val) => setUserDetails({ ...userDetails, lastName: val })}
              isInvalid={errors.lastName ? true : false}
              errorMessage={errors.lastName}
              placeholder="Eg. Doe"
              labelPlacement="outside"
              startContent={<FaUser className="text-xl text-default-400 pointer-events-none flex-shrink-0" />}
            />
            <Input
              type="email"
              label="Email"
              radius="sm"
              size="md"
              onValueChange={(val) => setUserDetails({ ...userDetails, email: val })}
              isInvalid={errors.email ? true : false}
              errorMessage={errors.email}
              placeholder="you@example.com"
              labelPlacement="outside"
              startContent={<IoMdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            />
            <Input
              type="password"
              label="Password"
              radius="sm"
              size="md"
              onValueChange={(val) => setUserDetails({ ...userDetails, password: val })}
              isInvalid={errors.password ? true : false}
              errorMessage={errors.password}
              placeholder="........"
              labelPlacement="outside"
              startContent={<IoKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            />
            <Select
              items={genders}
              label="Gender"
              placeholder="Gender"
              radius="sm"
              size="md"
              isInvalid={errors.gender ? true : false}
              errorMessage={errors.gender}
              value={userDetails.gender}
              labelPlacement="outside"
              onChange={(e) => setUserDetails({ ...userDetails, gender: e.target.value })}
            >
              {(gender) => <SelectItem key={gender.value}>{gender.label}</SelectItem>}
            </Select>
            <Textarea
              onValueChange={(val) => setUserDetails({ ...userDetails, address: val })}
              label="Address"
              radius="sm"
              size="md"
              labelPlacement="outside"
            />
          </div>
          <div className="mt-6">
            <Button color="primary" className="w-full" size="lg" onClick={handleSubmit}>
              Create Account.
            </Button>
          </div>

          <div className="mt-6">
            <p
              className="text-md text-center text-primary font-semibold cursor-pointer"
              onClick={() => router.push("/auth/login")}
            >
              Already have an account?
            </p>
          </div>

          <div className="h-20"></div>
        </div>
      )}

      {showOtp && (
        <div className={`w-full md:w-2/3 lg:w-1/2 px-10 mt-10 flex flex-col items-end gap-2`}>
          <div className={`w-full flex items-end gap-2 ${errors.otp && "items-center"}`}>
            <Input
              type="password"
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
          <div className="w-full mt-2">
            <p className="text-center">
              Did not get OTP or entered an incorrect email?{" "}
              <span className="text-pink-500 font-semibold cursor-pointer" onClick={() => handleGoBack()}>
                Go back.
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
