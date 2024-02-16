import z from "zod";

const allowedGenders = ["male", "female", "other"];

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Invalid Password"),
});

const donorSchema = z.object({
  firstName: z
    .string({ required_error: "First Name is required" })
    .min(2, "First Name is too short")
    .max(100, "First Name is too long"),
  lastName: z
    .string({ required_error: "Last Name is required" })
    .min(2, "Last Name is too short")
    .max(100, "Last Name is too long"),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "Password is too short")
    .max(45, "Password is too long"),
  gender: z.string({ required_error: "Gender is required" }).refine((data) => allowedGenders.includes(data), {
    message: "Invalid gender",
  }),
});

const allowedApprovalStatus = ["pending", "approved", "rejected"];

const organisationSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2, "Name is too short").max(100, "Name is too long"),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(3, "Password is too short")
    .max(45, "Password is too long"),
  websiteUrl: z.string({ required_error: "Website is required" }),
  address: z
    .string({ required_error: "Address is required" })
    .min(5, "Address is too short")
    .max(255, "Address is too long"),
});

const allowedCondtions = ["new", "like_new", "used_good", "used_fair", "used_poor"];

const donatedItemSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(2, "Title is too short").max(100, "Title is too long"),
  description: z.string({ required_error: "Description is required" }).min(2, "Description is too short"),
  image: z.string({ required_error: "Image is required" }).min(1, "Image is required"),
  condition: z.string({ required_error: "Condition is required" }).refine((data) => allowedCondtions.includes(data), {
    message: "Condition is required",
  }),
  categoryId: z.string({ required_error: "Category is required" }).min(1, "Category is required."),
});

const categorySchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(2, "Name is too small").max(100, "Name is too long"),
});

export { donorSchema, organisationSchema, donatedItemSchema, categorySchema, loginSchema };
