"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { donorSchema } from "../../validationSchemas";
import DonorServices from "@/app/Services/DonorServices";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { IoMdMail } from "react-icons/io";
import { IoKey } from "react-icons/io5";
import toast from "react-hot-toast";
import { FaArrowRight, FaLock, FaUser } from "react-icons/fa";

interface Props {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  gender?: "male" | "female" | "other";
  profileImg?: string | null;
  address?: string | null;
}

const UserForm = ({
  id,
  firstName,
  lastName,
  email,
  password,
  gender,
  profileImg,
  address,
}: Props) => {

  const router = useRouter();

  const [donorDetails, setDonorDetails] = useState({
    id: null as number | undefined | null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    profileImg: "",
    address: "",
  });

  useEffect(() => {
    setDonorDetails({
      id: id,
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      password: password || "",
      gender: gender || "",
      profileImg: profileImg || "",
      address: address || "",
    });
  }, [id, firstName, lastName, gender, profileImg, address, password]);

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
    gender: "",
    password: "",
  });

  const handleSave = async () => {
    setErrors(() => ({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
    }));
    
    const validation = donorSchema.safeParse(donorDetails);

    if (!validation.success) {
      console.log(validation.error.errors);
      const errorArray = validation.error.errors;

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    const res = await DonorServices.saveDonor(donorDetails);
    console.log(res);
    if (!res.data.status) {
      toast.error("Failed to Save");
      return;
    }

    toast.success("Saved Successfully");
  };

  return (
    <div className="h-[100vh] flex justify-center items-center flex-col gap-5 py-32">
      <div className="flex gap-2 items-center">
        {/* <BsGlobe className="w-6 h-6" /> */}
        <h1 className="text-2xl font-bold">Your Credentials</h1>
      </div>
      <div className="flex flex-col gap-8 mt-12">
        <Input
          type="text"
          label="First Name"
          radius="sm"
          size="md"
          value={donorDetails?.firstName}
          onValueChange={(val) =>
            setDonorDetails({ ...donorDetails, firstName: val })
          }
          startContent={
            <FaUser className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Input
          type="text"
          label="Last Name"
          radius="sm"
          size="md"
          value={donorDetails?.lastName}
          onValueChange={(val) =>
            setDonorDetails({ ...donorDetails, lastName: val })
          }
          startContent={
            <FaUser className="text-xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Input
          type="email"
          label="Email"
          radius="sm"
          size="md"
          value={donorDetails?.email}
          readOnly
          onValueChange={(val) =>
            setDonorDetails({ ...donorDetails, email: val })
          }
          startContent={
            <IoMdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Input
          type="password"
          label="Password"
          radius="sm"
          size="md"
          value={donorDetails?.password}
          onValueChange={(val) =>
            setDonorDetails({ ...donorDetails, password: val })
          }
          startContent={
            <IoKey className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />
        <Select
          items={genders}
          label="Gender"
          placeholder={donorDetails?.gender}
          radius="sm"
          size="md"
          value={donorDetails.gender} 
          onChange={(e) =>
            setDonorDetails({ ...donorDetails, gender: e.target.value })
          }
        >
          {(gender) => (
            <SelectItem key={gender.value} value={gender.value}>
              {gender.label}
            </SelectItem>
          )}
        </Select>
        <Textarea
          value={donorDetails?.address || ""}
          label="Address"
          radius="sm"
          size="md"
          onValueChange={(val) =>
            setDonorDetails({ ...donorDetails, address: val })
          }
        />
      </div>

      <div className="mt-6" style={{ display: 'flex', gap: '16px' }}>
        <Button
          color="primary"
          className="w-full"
          size="lg"
          onClick={() => {
            handleSave();
            router.back();
          }}
        >
          Save
        </Button>

        <Button
          color="danger"
          className="w-full"
          size="lg"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default UserForm;
