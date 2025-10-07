import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "@tanstack/react-router";
import loginImage from "../../../assets/login.png";
import Logo from "../../../components/Logo";
import { BackButton } from "../../components/BackButton";
import { alumnusSchema } from "./components/alumnusSchema";
import { useAlumnusStoreData, useHasHydrated } from "./useAlumnusStoreData";
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
import { useEffect } from "react";

const alumnusProfessionalSchema = alumnusSchema.pick({
  currentJobs: true,
  currentCompanies: true,
  previousCompanies: true,
  yearsOfExperience: true,
  personalDescription: true,
  linkedin_url: undefined,
  x_url: true,
  instagram_url: true,
  facebook_url: true,
  github_url: true,
  website_url: true,
});

type AlumnusProfessionalFormData = z.infer<typeof alumnusProfessionalSchema>;

const AlumnusProfessional = () => {


  
  const form = useForm<AlumnusProfessionalFormData>({
    resolver: zodResolver(alumnusProfessionalSchema),
    defaultValues: {
      currentJobs: [],
      currentCompanies: [],
      previousCompanies: [],
      yearsOfExperience: 0,
      personalDescription: "",
      linkedin_url: "",
      x_url: "",
      instagram_url: "",
      facebook_url: "",
      github_url: "",
      website_url: "",
    },
  });


  const router = useRouter();

  const firstName = useAlumnusStoreData((state) => state.firstName);
  const lastName = useAlumnusStoreData((state) => state.lastName);
const middleName = useAlumnusStoreData((state) => state.middleName);
const gender = useAlumnusStoreData((state) => state.gender);
const address = useAlumnusStoreData((state) => state.address);
const country = useAlumnusStoreData((state) => state.country);
const stateOfOrigin = useAlumnusStoreData((state) => state.state);
const phone = useAlumnusStoreData((state) => state.phone);
const email = useAlumnusStoreData((state) => state.email);
const password = useAlumnusStoreData((state) => state.password);
const confirmPassword = useAlumnusStoreData((state) => state.confirmPassword);
const profilePic = useAlumnusStoreData((state) => state.profilePic);
const matricNo = useAlumnusStoreData((state) => state.matricNo);
const department = useAlumnusStoreData((state) => state.department);
const faculty = useAlumnusStoreData((state) => state.faculty);
const gradYear = useAlumnusStoreData((state) => state.gradYear);
const certificate = useAlumnusStoreData((state) => state.certificate);

  const onSubmit = (data: AlumnusProfessionalFormData) => {
    console.log({...data, firstName, lastName, middleName, gender, address, country, stateOfOrigin, phone, email, password ,confirmPassword, profilePic, matricNo, department, faculty, gradYear, certificate,}
    );
    // Navigate to the next step or handle submission
  };

  
    const hasHydrated = useHasHydrated()
    
    useEffect(() => {
      if (!hasHydrated) return;
      if (!firstName || !lastName || !gender || !country || !stateOfOrigin || !phone || !email || !password || !confirmPassword || !matricNo || !department || !faculty || !matricNo || !gradYear) {
      router.navigate({ to: "/signup/alumnusSchool" })
      }
    }, [firstName, lastName, middleName, gender , address, country, stateOfOrigin, phone, email, password ,confirmPassword, profilePic, router, useAlumnusStoreData.persist.hasHydrated])
  

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
                              <div className=" grid grid-cols-2 gap-4 ">
                                  <FormField
                  control={form.control}
                  name="currentJobs"
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
                  name="currentCompanies"
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
                  name="previousCompanies"
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

                <FormField
                  control={form.control}
                  name="yearsOfExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder=""
                                  className="w-20"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
  control={form.control}
  name="personalDescription"
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

export default AlumnusProfessional;