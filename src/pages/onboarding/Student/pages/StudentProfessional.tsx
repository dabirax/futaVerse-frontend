import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import loginImage from "../../../../assets/login.png";
import Logo from "../../../../components/Logo";
import { BackButton } from "../../../components/BackButton";
import { useHasHydrated, useStudentStoreData } from "../hooks/useStudentStoreData";
import { studentProfessionalSchema } from "../lib/studentSchema";
import type { StudentProfessionalFormData } from "../lib/studentSchema";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api"




const StudentProfessional = () => {

type StudentProfessionalFormInput = z.input<typeof studentProfessionalSchema>;
type StudentProfessionalFormOutput = z.output<typeof studentProfessionalSchema>;

  // Form initialization
  const form = useForm<StudentProfessionalFormInput, any,StudentProfessionalFormOutput>({
    resolver: zodResolver(studentProfessionalSchema),
    defaultValues: {
      skills: [],
      description: "",
      linkedin_url: "",
      x_url: "",
      instagram_url: "",
      facebook_url: "",
      github_url: "",
      website_url: "",
    },
  });


  const router = useRouter();

  // Get Stored Data from Zustand
  const {
    firstname, lastname, middlename, gender, address, country, state, phone_num, email, password, confirmPassword, profilePic, matric_no, department, faculty, expected_grad_year,certificate,
  } = useStudentStoreData.getState()

// Handle Submit
  const onSubmit = async (data: StudentProfessionalFormData) => {
    console.log('Form submitted with data:', data);
    console.log('Store values:', {firstname, lastname, middlename, gender, address, country, state, phone_num, email, password ,confirmPassword, profilePic, matric_no, department, faculty, expected_grad_year, certificate });
    console.log('Form errors:', form.formState.errors);

    

  // Payload Preparation
  const payload = {
    firstname,
    lastname,
    middlename,
    gender,
    email,
    password,
    phone_num,
    house_no: address || "",
    street: "",
    city: "",
    state,
    country,
    profile: {
      matric_no,
      department,
      faculty,
      expected_grad_year,
      previous_comps: data.skills,
      description: data.description,
      linkedin_url: data.linkedin_url,
      company_linkedin_url: "",
      github_url: data.github_url,
      website_url: data.website_url,
      company_website_url: "",
      x_url: data.x_url,
      instagram_url: data.instagram_url,
      facebook_url: data.facebook_url,
      profile_img: profilePic || null,
    },
    }

  try {
    const res = await api.post("/auth/signup/Student", payload)
    console.log("✅ Signup successful:", res.data)
    router.navigate({ to: "/signup/success" })
  } catch (err: any) {
    console.error("❌ Signup failed:", err.response?.data || err.message)
  }

  };

  // Not allowing users to skip steps (or pages) during the onboarding
    const hasHydrated = useHasHydrated()

    useEffect(() => {
      console.log('useEffect triggered, hasHydrated:', hasHydrated);
      console.log('Store values check:', {firstname, lastname, gender, country, state, phone_num, email, password, confirmPassword, matric_no, department, faculty, expected_grad_year});
      if (!hasHydrated) {
        console.log('Not hydrated yet, returning');
        return;
      }
      if (!firstname || !lastname || !gender || !country || !state || !phone_num || !email || !password || !confirmPassword || !matric_no || !department || !faculty || !expected_grad_year) {
        console.log('Missing required fields, navigating to /signup/StudentSchool');
        router.navigate({ to: "/signup/StudentSchool" })
      } else {
        console.log('All required fields present, staying on page');
      }
    }, [firstname, lastname, middlename, gender , address, country, state, phone_num, email, password ,confirmPassword, profilePic, matric_no, department, faculty, expected_grad_year, router, hasHydrated])
  

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
        <div className="bg-[#9017C2] hidden lg:flex justify-center border">
          <div className="fixed flex justify-center items-center h-screen pt-10 px-10">
            <motion.img
              src={loginImage}
              alt="Login"
              className="object-cover"
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        <div className="max-w-md m-auto w-full flex flex-col items-center py-4">
          <div className="flex items-center justify-between w-full text-[#9017c2] text-2xl px-2">
            <div className="mt-1">
              <BackButton />
            </div>
            <Logo />
          </div>
          <div className="px-5">
            <p className="text-xl font-semibold tracking-tight text-center">
              Professional Information
            </p>

            <Form {...form}>
              <form
                className="w-full space-y-5 mt-5"
                onSubmit={form.handleSubmit(onSubmit)}
                          >

                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your skills"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              

                <FormField
  control={form.control}
  name="description"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Personal Description</FormLabel>
      <FormControl>
        <textarea
          placeholder="Describe yourself"
          className="w-full h-20 border border-gray-300 rounded-md p-2"
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

                                <div className=" grid grid-cols-2 gap-4 ">
                <FormField
                  control={form.control}
                  name="linkedin_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="LinkedIn profile URL"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="x_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>X </FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="X profile URL"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                              </div>
                              
                                <div className=" grid grid-cols-2 gap-4 ">
                                    
                <FormField
                  control={form.control}
                  name="instagram_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instagram URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Instagram profile URL"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="facebook_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Facebook URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Facebook profile URL"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                                  />
                              </div>
                              
                                <div className=" grid grid-cols-2 gap-4 ">
                <FormField
                  control={form.control}
                  name="github_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="GitHub profile URL"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="website_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website URL</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="Your website URL"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                              />
                              </div>
                              

<div className="flex justify-between py-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ transformOrigin: "left center" }}
                >
                                      <Button className="bg-[#5E0B80] flex ml-auto" onClick={() => {
router.history.back();
                                                             }}>
                    Back
                  </Button>
                                  </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ transformOrigin: "right center" }}
                >
                  <Button type="submit" className="bg-[#5E0B80] flex ml-auto">
                    Submit
                  </Button>
                                  </motion.div>
                                  </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfessional;