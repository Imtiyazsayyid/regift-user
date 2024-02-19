"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Donor } from "../../../app/interfaces/DonorInterface";
import DonorServices from "@/app/Services/DonorServices";
import toast from "react-hot-toast";
import Form from '../profile/Form';

const ProfilePage = () => {
  const [donor, setDonor] = useState<Donor>();
  const router = useRouter();

  const getDonorDetail = async () => {
    const res = await DonorServices.getDonorDetails();
    if (!res.status) {
      toast.error("Could Not Get Donor.");
      return;
    }

    setDonor(res.data.data);
  };

  useEffect(() => {
    getDonorDetail();
  }, []);
  
  
  return (
    <Form 
    id={donor?.id}
    firstName={donor?.firstName}
    lastName={donor?.lastName}
    email={donor?.email}
    password={donor?.password}
    profileImg={donor?.profileImg || ""}
    gender={donor?.gender}
    address={donor?.address || ""}
    />
  );
};

export default ProfilePage;