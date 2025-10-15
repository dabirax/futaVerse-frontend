
import { z } from "zod";

// 🧍 Basic Info

export const studentBasicRaw = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  middlename: z.string().optional(),
  gender: z.enum(["Male", "Female", "Other"], {
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


export const studentBasicSchema = studentBasicRaw.refine(
  (data) => data.password === data.confirmPassword,
  { message: "Passwords must match", path: ["confirmPassword"] }
);

export type StudentBasicFormData = z.infer<typeof studentBasicSchema>;


 // 🎓 School Info

export const studentSchoolSchema = z.object({
  matric_no: z.string().min(1, "Matriculation number is required"),
  department: z.string().min(1, "Department is required"),
  faculty: z.string().min(1, "Faculty is required"),
  expected_grad_year: z.coerce
    .number()
    .min(new Date().getFullYear(), "Graduation year cannot be in the past"),
   level: z.enum(
    ["100", "200", "300", "400", "500", "600"],
    { message: "Select a valid level" }
  ),

  cgpa: z.enum(
    ["First Class", "Second Class Upper", "Second Class Lower", "Third Class", "Pass"],
    { message: "Select your CGPA classification" }
  ),
  certificate: z.any().optional(),
});

export type StudentSchoolFormData = z.infer<typeof studentSchoolSchema>;


// 💼 Professional Info

export const studentProfessionalSchema = z.object({
  skills: z.array(z.string()).optional(),
  description: z.string().optional(),
  linkedin_url: z.union([z.literal(""), z.string().url("Invalid LinkedIn URL")]),
  x_url: z.union([z.literal(""), z.string().url("Invalid X URL")]),
  instagram_url: z.union([z.literal(""), z.string().url("Invalid Instagram URL")]),
  facebook_url: z.union([z.literal(""), z.string().url("Invalid Facebook URL")]),
  github_url: z.union([z.literal(""), z.string().url("Invalid GitHub URL")]),
  website_url: z.union([z.literal(""), z.string().url("Invalid Website URL")]),
});

export type StudentProfessionalFormData = z.infer<typeof studentProfessionalSchema>;


// All student Info

export const studentSchema = studentBasicRaw
  .merge(studentSchoolSchema)
  .merge(studentProfessionalSchema);

export type StudentFormData = z.infer<typeof studentSchema>;
