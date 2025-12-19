import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BackButton } from "../../../../components/BackButton";
import { LeftContainer } from "../../components/LeftContainer";
import { useAlumnusStoreData, useHasHydrated } from "../hooks/useAlumnusStoreData";
import { alumnusProfessionalSchema } from "../lib/alumnusSchema";
import { useSignupOTPStore } from "../../hooks/useSignupOTPStore";
import type { AlumnusProfessionalFormData } from "../lib/alumnusSchema";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api"




const AlumnusProfessional = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('');

type AlumnusProfessionalFormInput = z.input<typeof alumnusProfessionalSchema>;
type AlumnusProfessionalFormOutput = z.output<typeof alumnusProfessionalSchema>;

  // Form in bnnnitialization
  const form = useForm<AlumnusProfessionalFormInput, any,AlumnusProfessionalFormOutput>({
    resolver: zodResolver(alumnusProfessionalSchema),
    defaultValues: {
      current_job_title: "",
      current_company: "",
      previous_comps: [],
      years_of_exp: 0,
      description: "",
      linkedin_url: "",
      x_url: "",
      instagram_url: "",
      facebook_url: "",
      github_url: "",
      website_url: "",
      industry: "",
    },
  });


  const router = useRouter();

  // Get Stored Data from Zustand
  const {
    firstname, lastname, middlename, gender, address, country, state, phone_num, email, password, confirmPassword, profilePic, matric_no, department, faculty, grad_year,
  } = useAlumnusStoreData.getState()

const setSignupEmail = useSignupOTPStore((s) => s.setEmail);
const setUserType = useSignupOTPStore((s) => s.setUserType);


// Handle Submit
  const onSubmit = async (data: AlumnusProfessionalFormData) => {
      setIsError("")
      setIsLoading(true)
    console.log('Form errors:', form.formState.errors);

    
    setSignupEmail(email || "");
    setUserType("alumnus"); 

    

  // Payload Preparation
  const payload = {
    firstname,
    lastname,
    middlename,
    gender,
    email,
    password,
    phone_num,
    address,
    street: "",
    city: "",
    state,
    country,
    profile: {
      matric_no,
      department,
      faculty,
      grad_year,
      previous_comps: data.previous_comps,
      current_job_title: data.current_job_title,
      current_company: data.current_company,
      years_of_exp: data.years_of_exp,
      industry: data.industry,
      description: data.description,
      linkedin_url: data.linkedin_url,
      company_linkedin_url: "",
      github_url: data.github_url,
      website_url: data.website_url,
      company_website_url: "",
      x_url: data.x_url,
      instagram_url: data.instagram_url,
      facebook_url: data.facebook_url,
      // profile_img: profilePic,
    },
    }
    console.log(payload)

  try {
    const res = await api.post("/api/auth/signup/alumnus", payload)
    console.log("✅ Signup successful:", res.data)
    router.navigate({ to: "/signup/otp" })
  } catch (err: any) {
    console.error("Signup failed:", err.response?.data || err.message)
  }

  };

  // Not allowing users to skip steps (or pages) during the onboarding
    const hasHydrated = useHasHydrated()

    useEffect(() => {
      console.log('useEffect triggered, hasHydrated:', hasHydrated);
      console.log('Store values check:', {firstname, lastname, gender, country, state, phone_num, email, password, confirmPassword, matric_no, department, faculty, grad_year});
      if (!hasHydrated) {
        console.log('Not hydrated yet, returning');
        return;
      }
      if (!firstname || !lastname || !gender || !country || !state || !phone_num || !email || !password || !confirmPassword || !matric_no || !department || !faculty || !grad_year) {
        console.log('Missing required fields, navigating to /signup/alumnusSchool');
        router.navigate({ to: "/signup/alumnusSchool" })
      } else {
        console.log('All required fields present, staying on page');
      }
    }, [firstname, lastname, middlename, gender , address, country, state, phone_num, email, password ,confirmPassword, profilePic, matric_no, department, faculty, grad_year, router, hasHydrated])
  

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
       <LeftContainer/>
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
                              <div className=" grid grid-cols-2 gap-4 ">
                                  <FormField
                  control={form.control}
                  name="current_job_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Jobs</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter current jobs"
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
                  name="current_company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Companies</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter current companies"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /></div>
                

                <FormField
                  control={form.control}
                  name="previous_comps"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Previous Companies</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your previous companies"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="years_of_exp"
                    render={({ field }) => (
                      <FormItem>
      <FormLabel>Years of Experience</FormLabel>
      <FormControl>
        <Input
          type="number"
          className="w-20"
          value={Number(field.value) || ""}
          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
          onBlur={field.onBlur}
          name={field.name}
          ref={field.ref}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
                />
                
                <FormField
  control={form.control}
  name="industry"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Industry Sector <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your industry" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Information Technology">
              Information Technology
            </SelectItem>
            <SelectItem value="Software Development">
              Software Development
            </SelectItem>
            <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
            <SelectItem value="Data Science & Analytics">
              Data Science & Analytics
            </SelectItem>
            <SelectItem value="Mechanical Engineering">
              Mechanical Engineering
            </SelectItem>
            <SelectItem value="Electrical Engineering">
              Electrical Engineering
            </SelectItem>
            <SelectItem value="Renewable Energy">Renewable Energy</SelectItem>
            <SelectItem value="Banking & Finance">Banking & Finance</SelectItem>
            <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
            <SelectItem value="Healthcare">Healthcare</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Agriculture">Agriculture</SelectItem>
            <SelectItem value="Media & Entertainment">
              Media & Entertainment
            </SelectItem>
            <SelectItem value="Construction & Real Estate">
              Construction & Real Estate
            </SelectItem>
            <SelectItem value="NGO / Nonprofit">NGO / Nonprofit</SelectItem>
            <SelectItem value="Government & Public Sector">
              Government & Public Sector
            </SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
</div>


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
                  <Button type="submit" className="bg-[#5E0B80] flex ml-auto" disabled={isLoading}>
                    {isLoading ? 'Submitting...' : 'Submit'}
                  </Button>
                                  </motion.div>
                </div>
                <p className="text-red-500 text-sm mt-2">{isError}</p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumnusProfessional;