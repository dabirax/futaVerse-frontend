


import { z } from "zod";

// 🧍 Basic Info

export const alumnusBasicRaw = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  middlename: z.string().optional(),
  gender: z.enum(["male", "female", "other"], {
    message: "Gender is required",
  }),
  address: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  phone_num: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string()
    .min(8, "Confirm Password must be at least 8 characters long"),
  profilePic: z.any().optional(),
})

export const alumnusBasicSchema = alumnusBasicRaw.refine(
  (data) => data.password === data.confirmPassword,
  { message: "Passwords must match", path: ["confirmPassword"] }
);

export type AlumnusBasicFormData = z.infer<typeof alumnusBasicSchema>;


 // 🎓 School Info

export const alumnusSchoolSchema = z.object({
  matric_no: z.string().min(1, "Matriculation number is required"),
  department: z.string().min(1, "Department is required"),
  faculty: z.string().min(1, "Faculty is required"),
  grad_year: z.coerce
    .number()
    .min(1900, "Graduation year must be valid")
    .max(new Date().getFullYear(), "Graduation year cannot be in the future"),
  certificate: z.any().optional(),
});

export type AlumnusSchoolFormData = z.infer<typeof alumnusSchoolSchema>;


// 💼 Professional Info

export const alumnusProfessionalSchema = z.object({
  current_job_title: z.string().optional(),
  current_company: z.string().optional(),
  previous_comps: z.array(z.string()).optional(),
  years_of_exp: z.coerce
    .number()
    .min(0, "Years of experience must be valid"),
  industry: z.union([
  z.literal(""),
  z.enum([
    "Information Technology",
    "Software Development",
    "Cybersecurity",
    "Data Science & Analytics",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Renewable Energy",
    "Banking & Finance",
    "Digital Marketing",
    "Healthcare",
    "Education",
    "Agriculture",
    "Media & Entertainment",
    "Construction & Real Estate",
    "NGO / Nonprofit",
    "Government & Public Sector",
  ]),
]).refine((val) => val !== "", { message: "Industry is required" }),

  description: z.string().optional(),
  linkedin_url: z.union([z.literal(""), z.string().url("Invalid LinkedIn URL")]),
  x_url: z.union([z.literal(""), z.string().url("Invalid X URL")]),
  instagram_url: z.union([z.literal(""), z.string().url("Invalid Instagram URL")]),
  facebook_url: z.union([z.literal(""), z.string().url("Invalid Facebook URL")]),
  github_url: z.union([z.literal(""), z.string().url("Invalid GitHub URL")]),
  website_url: z.union([z.literal(""), z.string().url("Invalid Website URL")]),
});

export type AlumnusProfessionalFormData = z.infer<typeof alumnusProfessionalSchema>;


// All Alumnus Info
export const alumnusSchema = alumnusBasicRaw
  .merge(alumnusSchoolSchema)
  .merge(alumnusProfessionalSchema)
;

export type AlumnusFormData = z.infer<typeof alumnusSchema>;
