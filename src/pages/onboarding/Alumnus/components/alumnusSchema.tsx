import { z } from "zod";


export const alumnusSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  middleName: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other", undefined!], "Gender is required"),
  address: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters long"),
  profilePic: z.any().optional(),
  matricNo: z.string().min(1, "Matriculation number is required"),
  department: z.string().min(1, "Department is required"),
  faculty: z.string().min(1, "Faculty is required"),
  gradYear: z.number().min(1900, "Graduation year must be valid"),
  certificate: z.any().optional(),
  currentJobs: z.preprocess(
  (val) => (typeof val === "string" ? [val] : val),
  z.array(z.string()).optional()
),
currentCompanies: z.preprocess(
  (val) => (typeof val === "string" ? [val] : val),
  z.array(z.string()).optional()
),
previousCompanies: z.preprocess(
  (val) => (typeof val === "string" ? [val] : val),
  z.array(z.string()).optional()
),
  yearsOfExperience: z.number().min(0, "Years of experience must be valid"),
  personalDescription: z.string().optional(),
  linkedin_url: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().url().optional()
  ),
  x_url: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().url().optional()
  ),
  instagram_url: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().url().optional()
  ),
  facebook_url: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().url().optional()
  ),
  github_url: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().url().optional()
  ),
  website_url: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z.string().url().optional()
  ),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

  export type AlumnusFormData = z.infer<typeof alumnusSchema>;