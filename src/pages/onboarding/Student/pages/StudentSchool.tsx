// External libraries and hooks
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "@tanstack/react-router";
import loginImage from "../../../../assets/login.png";
import { BackButton } from '../../../components/BackButton';
import { useHasHydrated, useStudentStoreData, } from "../hooks/useStudentStoreData";
import { studentSchoolSchema } from "../lib/studentSchema";
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


const StudentSchool = () => {
  // Type definitions for form input and output based on the schema
  type StudentSchoolInput = z.input<typeof studentSchoolSchema>;
  type StudentSchoolOutput = z.output<typeof studentSchoolSchema>;

  // Initialize the form with Zod resolver and default values
  const form = useForm<StudentSchoolInput, any, StudentSchoolOutput>({
    resolver: zodResolver(studentSchoolSchema),
    defaultValues: {
      matric_no: "",
      department: "",
      faculty: "",
      expected_grad_year: 2025,
      level: undefined,
      cgpa: undefined,
      certificate: null,
    },
  });

  // Extract user data from the Student store for validation
  const firstName = useStudentStoreData((state) => state.firstname);
  const lastName = useStudentStoreData((state) => state.lastname);
  const middleName = useStudentStoreData((state) => state.middlename);
  const gender = useStudentStoreData((state) => state.gender);
  const address = useStudentStoreData((state) => state.address);
  const country = useStudentStoreData((state) => state.country);
  const stateOfOrigin = useStudentStoreData((state) => state.state);
  const phone = useStudentStoreData((state) => state.phone_num);
  const email = useStudentStoreData((state) => state.email);
  const password = useStudentStoreData((state) => state.password);
  const confirmPassword = useStudentStoreData((state) => state.confirmPassword);
  const profilePic = useStudentStoreData((state) => state.profilePic);

  // Store setter function and router hook
  const setData = useStudentStoreData((state) => state.setData);
  const router = useRouter();

  // Handle form submission: log data, update store, navigate to next step
  const onSubmit = (data: StudentSchoolOutput) => {
    console.log(data);
    setData(data);
    router.navigate({ to: "/signup/StudentProfessional" });
  };

  // Check if the store has hydrated
  const hasHydrated = useHasHydrated();

  // Redirect to basic info step if required fields are missing. For data persistence.
  useEffect(() => {
    if (!hasHydrated) return;
    if (!firstName || !lastName || !gender || !country || !stateOfOrigin || !phone || !email || !password || !confirmPassword) {
      router.navigate({ to: "/signup/StudentBasic" });
    }
  }, [firstName, lastName, middleName, gender, address, country, stateOfOrigin, phone, email, password, confirmPassword, profilePic, router, useStudentStoreData.persist.hasHydrated]);

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
          {/* Form section */}
          <div className="px-5">
            <p className="text-xl font-semibold tracking-tight text-center">School Information</p>

            <Form {...form}>
              <form
                className="w-full space-y-5 mt-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Matriculation Number field */}
                <FormField
                  control={form.control}
                  name="matric_no"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Matriculation Number <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="ABC/01/2345"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Department field */}
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your department"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Faculty field */}
                <FormField
                  control={form.control}
                  name="faculty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Faculty <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Enter your faculty"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Graduation Year field */}
                <FormField
                  control={form.control}
                  name="expected_grad_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Graduation Year <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your expected graduation year"
                          className="w-fit"
                          value={Number(field.value) || ""}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-4">  <FormField
  control={form.control}
  name="level"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        Level <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger>
            <SelectValue placeholder="Select Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="100">100 Level</SelectItem>
            <SelectItem value="200">200 Level</SelectItem>
            <SelectItem value="300">300 Level</SelectItem>
            <SelectItem value="400">400 Level</SelectItem>
            <SelectItem value="500">500 Level</SelectItem>
            <SelectItem value="600">600 Level</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="cgpa"
  render={({ field }) => (
    <FormItem>
      <FormLabel>
        CGPA Class <span className="text-red-500">*</span>
      </FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value} >
          <SelectTrigger>
            <SelectValue placeholder="Select CGPA" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="First Class">First Class</SelectItem>
            <SelectItem value="Second Class Upper">Second Class Upper</SelectItem>
            <SelectItem value="Second Class Lower">Second Class Lower</SelectItem>
            <SelectItem value="Third Class">Third Class</SelectItem>
            <SelectItem value="Pass">Pass</SelectItem>
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/></div>
              


                {/* Certificate upload field (optional) */}
                <FormField
                  control={form.control}
                  name="certificate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Certificate (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*,application/pdf"
                          className="w-full"
                          onChange={(e) =>
                            field.onChange(e.target.files ? e.target.files[0] : null)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Navigation buttons: Back and Next */}
                <div className="flex justify-between py-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ transformOrigin: "left center" }}
                  >
                    <Button className="bg-[#5E0B80] flex ml-auto" onClick={() => router.history.back()}>
                      Back
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ transformOrigin: "right center" }}
                  >
                    <Button type="submit" className="bg-[#5E0B80] flex ml-auto">
                      Next
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

export default StudentSchool;