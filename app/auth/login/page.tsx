"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DonorServices from "../../Services/DonorServices";
import { TokenService } from "../../Services/StorageService";
import { loginSchema } from "@/app/validationSchemas";
import { BsGlobe } from "react-icons/bs";
import { Button, Input } from "@nextui-org/react";
import { IoMdMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    user_role: "donor",
  });

  const [errors, setErrors] = useState({
    invalidCredentials: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const resetErrors = () => {
    setErrors({ email: "", password: "", invalidCredentials: "" });
  };

  const handleSubmit = async () => {
    resetErrors();
    const validation = loginSchema.safeParse(userDetails);

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

    const res = await DonorServices.login(userDetails);

    if (res.data.status) {
      const refreshToken = res.data.data;

      const accessTokenResponse = await DonorServices.getAccessToken(refreshToken);

      console.log({ accessTokenResponse });

      if (!accessTokenResponse.data.status) {
        throw new Error("status false in getting Access Token");
      }

      TokenService.saveAccessToken(accessTokenResponse.data.data);
      toast.success("Login Successful.");
      router.push("/donor");
    } else {
      setErrors({
        email: "",
        password: "",
        invalidCredentials: "Invalid Credentials.",
      });
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center flex-col gap-5 p-2 sm:p-10">
      <div className="flex gap-2 items-center">
        <BsGlobe className="w-6 h-6" />
        <h1 className="text-2xl font-bold">Regift</h1>
      </div>
      <div className="w-full md:w-[500px] shadow-md min-h-[400px] rounded-xl p-10 dark:shadow-[#111111]">
        <h1 className="font-bold text-2xl text-center">Sign in to your account.</h1>
        {errors.invalidCredentials && <p className="text-center my-5 text-secondary-500">Invalid Credentials.</p>}
        <div className="flex flex-col gap-8 mt-12">
          <Input
            type="email"
            label="Email"
            radius="sm"
            size="lg"
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
            size="lg"
            onValueChange={(val) => setUserDetails({ ...userDetails, password: val })}
            isInvalid={errors.password ? true : false}
            errorMessage={errors.password}
            placeholder="........"
            labelPlacement="outside"
            startContent={<IoKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          />
        </div>
        <div className="my-6">
          <p
            className="text-md text-end text-primary font-semibold cursor-pointer"
            onClick={() => router.push("/auth/forgot-password")}
          >
            Forgot Password?
          </p>
        </div>
        <div>
          <Button color="primary" className="w-full" size="lg" onClick={handleSubmit}>
            Log in to you account
          </Button>
        </div>

        <div className="mt-6">
          <p
            className="text-md text-center text-primary font-semibold cursor-pointer"
            onClick={() => router.push("/auth/register")}
          >
            Don&apos;t have an account?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
