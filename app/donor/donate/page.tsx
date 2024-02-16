"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Image,
  Input,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CgSoftwareUpload } from "react-icons/cg";
import { FaCheckCircle } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

import { donatedItemSchema } from "@/app/validationSchemas";
import { CldUploadWidget } from "next-cloudinary";
import DonorServices from "@/app/Services/DonorServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Category } from "@/app/interfaces/CategoryInterface";

export interface CloudinaryResult {
  url: string;
  public_id: string;
}

export default function DonatePage() {
  const router = useRouter();
  const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);

  // const categories = [
  //   { value: "1", label: "Furniture" },
  //   { value: "2", label: "Games" },
  //   { value: "3", label: "Electronics" },
  // ];

  const [errors, setErrors] = useState({
    image: "",
    title: "",
    description: "",
    condition: "",
    categoryId: "",
  });

  const resetErrors = () => {
    setErrors({
      image: "",
      title: "",
      description: "",
      condition: "",
      categoryId: "",
    });
  };

  const validateForm = () => {
    resetErrors();
    const validation = donatedItemSchema.safeParse(donatedItem);

    if (!validation.success) {
      const errorArray = validation.error.errors;
      console.log({ errorArray });

      for (let error of errorArray) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [error.path[0]]: error.message,
        }));
      }
      return;
    }

    console.log("here");

    setSelected("verify");
  };

  const condition = [
    { value: "new", label: "New" },
    { value: "like_new", label: "Like New" },
    { value: "used_good", label: "Good" },
    { value: "used_fair", label: "Fair" },
    { value: "used_poor", label: "Poor" },
  ];

  const [donatedItem, setDonatedItem] = useState({
    title: "",
    description: "",
    image: "",
    condition: "",
    categoryId: "",
  });

  const [selected, setSelected] = useState("upload-info");

  const makeDonation = async () => {
    const res = await DonorServices.saveDonatedItem({ ...donatedItem, categoryId: parseInt(donatedItem.categoryId) });
    if (!res.status) {
      toast.error("Donation Failed");
      return;
    }
    toast.success("Donation Successful.");
    router.push("/donor/my-donations");
  };

  const getAllCategories = async () => {
    const res = await DonorServices.getAllCategories();
    if (!res.data) {
      toast.error("Failed to Get Categories");
      return;
    }
    const formattedCategories = res.data.data.map((cat: Category) => ({ label: cat.name, value: cat.id.toString() }));
    setCategories(formattedCategories);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

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
          <Card className="w-full lg:w-2/3 h-[500px] md:h-[600px] p-10">
            <CardHeader>
              <h1 className="text-3xl font-bold">Upload Details</h1>
            </CardHeader>
            <Divider className="my-3" />
            <CardBody className="w-full">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col md:p-10 md:pl-0 gap-4 items-center md:items-start">
                  {donatedItem.image && (
                    <Image
                      className="h-[100px] md:min-h-[300px] w-full md:max-w-[300px] object-cover"
                      src={donatedItem.image}
                    />
                  )}
                  {!donatedItem.image && (
                    <Image
                      className="h-[100px] max-w-[300px] md:min-h-[300px] md:max-w-[300px] w-full object-cover"
                      src="https://archive.org/download/placeholder-image/placeholder-image.jpg"
                    />
                  )}
                  {errors.image && <p className="text-xs text-center w-full text-red-500">{errors.image}</p>}
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
                        className="md:w-full"
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
                <Divider orientation="horizontal" className="block md:hidden mt-10 mb-5" />

                <div className="flex flex-col md:p-10 w-full gap-6 md:gap-8">
                  <Input
                    type="text"
                    label="Name"
                    radius="sm"
                    size="lg"
                    isInvalid={errors.title ? true : false}
                    errorMessage={errors.title}
                    placeholder="Enter Donated Item Name"
                    value={donatedItem.title}
                    onValueChange={(val) => setDonatedItem({ ...donatedItem, title: val })}
                    labelPlacement="outside"
                  />

                  <Textarea
                    type="text"
                    label="Description"
                    radius="sm"
                    size="lg"
                    placeholder="Description"
                    isInvalid={errors.description ? true : false}
                    errorMessage={errors.description}
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
                        isInvalid={errors.categoryId ? true : false}
                        errorMessage={errors.categoryId}
                        selectedKey={donatedItem.categoryId}
                        onSelectionChange={(val) =>
                          setDonatedItem({ ...donatedItem, categoryId: (val && val.toString()) || "" })
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
                        isInvalid={errors.condition ? true : false}
                        errorMessage={errors.condition}
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
                    <Button color="primary" endContent={<FiArrowRight />} onClick={validateForm}>
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
          <Card className="w-full lg:w-2/3 h-[500px] md:h-[600px] p-10">
            <CardHeader>
              <h1 className="text-3xl font-bold">Verify Details</h1>
            </CardHeader>
            <Divider orientation="horizontal" className="my-3" />
            <CardBody className="gap-4">
              <div className="flex flex-col md:flex-row gap-8 min-h-full overflow-hidden overflow-y-scroll">
                <div className="rounded-xl min-h-[100px] max-w-[100px] md:min-h-full md:min-w-[50%] overflow-hidden">
                  <Image
                    className="min-h-[100px] md:min-h-[450px] w-full object-cover"
                    src={
                      donatedItem.image ||
                      "https://images.pexels.com/photos/544115/pexels-photo-544115.jpeg?auto=compress&cs=tinysrgb&w=800"
                    }
                  />
                </div>
                <div className="flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-3 md:py-5 overflow-hidden overflow-y-auto">
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p>{donatedItem.title}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Description</p>
                      <p>{donatedItem.description}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p>{categories.find((cat) => cat.value === donatedItem.categoryId)?.label}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Condition</p>
                      <p>{condition.find((condition) => condition.value === donatedItem.condition)?.label}</p>
                    </div>
                  </div>
                  <div>
                    <Button className="w-full" color="primary" onClick={() => makeDonation()}>
                      Donate
                    </Button>
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
