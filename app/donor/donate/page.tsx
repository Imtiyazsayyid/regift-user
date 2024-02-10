"use client";

import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Avatar,
  Image,
  Button,
  Input,
  Textarea,
  Autocomplete,
  AutocompleteItem,
  Chip,
} from "@nextui-org/react";
import { RiGalleryFill, RiMusic2Fill } from "react-icons/ri";
import { FaCheckCircle, FaVideo } from "react-icons/fa";
import { IoInformationCircleSharp } from "react-icons/io5";
import { CgSoftwareUpload } from "react-icons/cg";
import { TbBallAmericanFootball } from "react-icons/tb";
import { FiArrowRight } from "react-icons/fi";
import { DonatedItem } from "@/app/interfaces/DonatedItemInterface";

import { CldUploadWidget, CldImage } from "next-cloudinary";

export interface CloudinaryResult {
  url: string;
  public_id: string;
}

export default function DonatePage() {
  const categories = [
    { value: "1", label: "Furniture" },
    { value: "2", label: "Games" },
    { value: "3", label: "Electronics" },
  ];

  const condition = [
    { value: "1", label: "New", color: "success" },
    { value: "2", label: "Like New", color: "warning" },
    { value: "3", label: "Good", color: "primary" },
    { value: "4", label: "Fair", color: "secondary" },
    { value: "5", label: "Poor", color: "danger" },
  ];

  const [donatedItem, setDonatedItem] = useState({
    name: "",
    description: "",
    image: "",
    condition: "",
    category: "",
  });

  const [selected, setSelected] = useState("upload-info");

  return (
    <div className="flex flex-col p-10 h-[90vh] w-[100vw] items-center justify-center">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
        className="w-full justify-center"
        selectedKey={selected}
        onSelectionChange={(val) => setSelected(val as any)}
        disabledKeys={["verify"] as any}
      >
        <Tab
          key="upload-info"
          className="flex justify-center items-center w-full"
          title={
            <div className="flex items-center space-x-2">
              <CgSoftwareUpload />
              <span>Upload</span>
            </div>
          }
        >
          <Card className="w-full lg:w-2/3 h-[400px] md:h-[600px] p-10">
            <CardHeader>
              <h1 className="text-3xl font-bold">Upload Details</h1>
            </CardHeader>
            <Divider className="my-3" />
            <CardBody className="w-full">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col md:p-10 md:pl-0 gap-4 items-center md:items-start">
                  {donatedItem.image && (
                    <Image className="min-h-[300px] w-full md:max-w-[300px] object-cover" src={donatedItem.image} />
                  )}
                  {!donatedItem.image && (
                    <Image
                      className="min-h-[300px] md:max-w-[300px] w-full object-cover"
                      src="https://archive.org/download/placeholder-image/placeholder-image.jpg"
                    />
                  )}
                  <CldUploadWidget
                    options={{
                      sources: ["local"],
                      multiple: false,
                      cropping: true,
                      styles: {
                        palette: {
                          window: "#ffffff",
                          sourceBg: "#f4f4f5",
                          windowBorder: "#90a0b3",
                          tabIcon: "#000000",
                          inactiveTabIcon: "#555a5f",
                          menuIcons: "#555a5f",
                          link: "#0433ff",
                          action: "#339933",
                          inProgress: "#0433ff",
                          complete: "#339933",
                          error: "#cc0000",
                          textDark: "#000000",
                          textLight: "#fcfffd",
                        },
                        fonts: {
                          default: null,
                          "sans-serif": {
                            url: null,
                            active: true,
                          },
                        },
                      },
                    }}
                    uploadPreset="oekh1dfb"
                    onUpload={(result) => {
                      if (result.event !== "success") return;
                      const info = result.info as CloudinaryResult;
                      setDonatedItem({
                        ...donatedItem,
                        image: info.url,
                      });
                    }}
                  >
                    {({ open }) => (
                      <Button
                        startContent={<CgSoftwareUpload />}
                        className="w-full"
                        onClick={() => {
                          open();
                        }}
                      >
                        Upload
                      </Button>
                    )}
                  </CldUploadWidget>
                </div>

                <Divider orientation="vertical" className="hidden md:block" />
                <Divider orientation="horizontal" className="block md:hidden mt-10" />

                <div className="flex flex-col md:p-10 w-full gap-6 md:gap-8">
                  <Input
                    type="text"
                    label="Name"
                    radius="sm"
                    size="lg"
                    placeholder="Enter Donated Item Name"
                    value={donatedItem.name}
                    onValueChange={(val) => setDonatedItem({ ...donatedItem, name: val })}
                    labelPlacement="outside"
                  />

                  <Textarea
                    type="text"
                    label="Description"
                    radius="sm"
                    size="lg"
                    placeholder="Description"
                    value={donatedItem.description}
                    onValueChange={(val) => setDonatedItem({ ...donatedItem, description: val })}
                    labelPlacement="outside"
                  />

                  <div className="w-full flex flex-col md:flex-row gap-6 md:gap-4">
                    <div className="md:w-1/2">
                      <Autocomplete
                        label="Category"
                        radius="sm"
                        placeholder="Pick A Category"
                        defaultItems={categories}
                        labelPlacement="outside"
                        selectedKey={donatedItem.category}
                        onSelectionChange={(val) =>
                          setDonatedItem({ ...donatedItem, category: (val && val.toString()) || "" })
                        }
                        disableSelectorIconRotation
                      >
                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                      </Autocomplete>
                    </div>
                    <div className="md:w-1/2">
                      <Autocomplete
                        label="Condition"
                        radius="sm"
                        placeholder="Pick A Condition"
                        defaultItems={condition}
                        selectedKey={donatedItem.condition}
                        // onValueChange={(val) => setDonatedItem({ ...donatedItem, condition: val })}
                        onSelectionChange={(val) =>
                          setDonatedItem({ ...donatedItem, condition: (val && val.toString()) || "" })
                        }
                        labelPlacement="outside"
                        disableSelectorIconRotation
                      >
                        {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                      </Autocomplete>
                    </div>
                  </div>

                  <div className="mt-2 flex justify-end">
                    <Button color="primary" endContent={<FiArrowRight />} onClick={() => setSelected("verify")}>
                      Verify
                    </Button>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
        <Tab
          className="flex justify-center items-center w-full"
          key="verify"
          title={
            <div className="flex items-center space-x-2">
              <FaCheckCircle />
              <span>Verify</span>
            </div>
          }
        >
          <Card className="w-full lg:w-2/3 h-[400px] md:h-[600px] p-10">
            <CardHeader>
              <h1 className="text-3xl font-bold">Verify Details</h1>
            </CardHeader>
            <Divider orientation="horizontal" className="my-3" />
            <CardBody className="gap-4">
              <div className="flex flex-col md:flex-row gap-8 min-h-full overflow-scroll">
                <div className="rounded-xl min-h-[100px] max-w-[100px] md:min-h-full md:min-w-[50%] overflow-hidden">
                  <Image
                    className="min-h-[100px] md:min-h-[450px] w-full object-cover"
                    src={
                      donatedItem.image ||
                      "https://images.pexels.com/photos/544115/pexels-photo-544115.jpeg?auto=compress&cs=tinysrgb&w=800"
                    }
                  />
                </div>
                <div className="flex flex-col gap-3 py-5 overflow-hidden overflow-y-scroll">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p>{donatedItem.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Description</p>
                    <p>{donatedItem.description}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Category</p>
                    <p>{categories.find((cat) => cat.value === donatedItem.category)?.label}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Condition</p>
                    <p>{condition.find((condition) => condition.value === donatedItem.condition)?.label}</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
