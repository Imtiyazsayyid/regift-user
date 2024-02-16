"use client";
import DonorServices from "@/app/Services/DonorServices";
import { DonatedItem } from "@/app/interfaces/DonatedItemInterface";
import { Order } from "@/app/interfaces/OrderInterface";
import {
  Avatar,
  Badge,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast, { CheckmarkIcon } from "react-hot-toast";
import moment from "moment";
import { FaBan, FaCheckCircle, FaSyncAlt } from "react-icons/fa";
import { TbRefresh } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";

const MyDonationsPage = () => {
  const [donatedItems, setDonatedItems] = useState<DonatedItem[]>([]);

  const getDonatedItems = async () => {
    const res = await DonorServices.getAllDonatedItems();

    if (!res.status) {
      toast.error("Could not get Donations.");
      return;
    }

    setDonatedItems(res.data.data);
  };

  useEffect(() => {
    getDonatedItems();
  }, []);

  const statusMap = {
    pending: {
      text: "Pending",
      color: "warning",
      icon: <FaSyncAlt />,
      description: "Your Donation is being reviewed.",
    },
    approved: {
      text: "Approved",
      color: "success",
      icon: <FaCheckCircle />,
      description: "Donation will be picked up at given address.",
    },
    rejected: {
      text: "Rejected",
      color: "danger",
      icon: <FaBan />,
      description: "Your Donation has been rejected.",
    },
  };

  const list = ["DONATION ID", "IMAGE", "NAME", "DATE", "APPROVAL STATUS", "DESCRIPTION"];
  return (
    <div className="p-10 shadow-xs flex flex-col">
      <div className="py-10">
        <h1 className="font-bold text-3xl md:text-6xl text-center">Your Donations</h1>
      </div>
      <div className="flex justify-center">
        <Table className="lg:w-2/3">
          <TableHeader>
            {list.map((item) => (
              <TableColumn key={item} className="min-w-[100px] max-w-[200px]">
                {item}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody emptyContent={"No Donations Made."}>
            {donatedItems.map((donatedItem) => (
              <TableRow key={donatedItem.id}>
                <TableCell>#{donatedItem.id}</TableCell>
                <TableCell>
                  <Avatar src={donatedItem.image} radius="sm" />
                </TableCell>
                <TableCell>{donatedItem.title}</TableCell>
                <TableCell>{moment(donatedItem.created_at).format("DD MMM, YYYY")}</TableCell>
                <TableCell>
                  <Chip
                    color={statusMap[donatedItem.approvalStatus].color as "primary"}
                    variant="flat"
                    startContent={statusMap[donatedItem.approvalStatus].icon}
                    className="gap-1 px-2"
                    size="sm"
                  >
                    {statusMap[donatedItem.approvalStatus].text}
                  </Chip>
                </TableCell>
                <TableCell>
                  {statusMap[donatedItem.approvalStatus].description.split("\n").map((text, index) => (
                    <p className="text-gray-400" key={index}>
                      {text}
                    </p>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MyDonationsPage;
