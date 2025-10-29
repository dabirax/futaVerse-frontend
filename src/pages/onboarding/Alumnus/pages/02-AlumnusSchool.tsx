// External libraries and hooks
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "@tanstack/react-router";
import { BackButton } from '../../../components/BackButton';
import { useAlumnusStoreData, useHasHydrated } from "../hooks/useAlumnusStoreData";
import { LeftContainer } from "../../components/LeftContainer";
import { alumnusSchoolSchema } from "../lib/alumnusSchema";
import type { z } from "zod";
import Logo from "@/components/Logo";
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


const AlumnusSchool = () => {
  // Type definitions for form input and output based on the schema
  type AlumnusSchoolInput = z.input<typeof alumnusSchoolSchema>;
  type AlumnusSchoolOutput = z.output<typeof alumnusSchoolSchema>;

  // Initialize the form with Zod resolver and default values
  const form = useForm<AlumnusSchoolInput, any, AlumnusSchoolOutput>({
    resolver: zodResolver(alumnusSchoolSchema),
    defaultValues: {
      matric_no: "",
      department: "",
      faculty: "",
      grad_year: 2025,
      certificate: null,
    },
  });

  // Extract user data from the alumnus store for validation
  const firstName = useAlumnusStoreData((state) => state.firstname);
  const lastName = useAlumnusStoreData((state) => state.lastname);
  const middleName = useAlumnusStoreData((state) => state.middlename);
  const gender = useAlumnusStoreData((state) => state.gender);
  const address = useAlumnusStoreData((state) => state.address);
  const country = useAlumnusStoreData((state) => state.country);
  const stateOfOrigin = useAlumnusStoreData((state) => state.state);
  const phone = useAlumnusStoreData((state) => state.phone_num);
  const email = useAlumnusStoreData((state) => state.email);
  const password = useAlumnusStoreData((state) => state.password);
  const confirmPassword = useAlumnusStoreData((state) => state.confirmPassword);
  const profilePic = useAlumnusStoreData((state) => state.profilePic);

  // Store setter function and router hook
  const setData = useAlumnusStoreData((state) => state.setData);
  const router = useRouter();

  // Handle form submission: log data, update store, navigate to next step
  const onSubmit = (data: AlumnusSchoolOutput) => {
    setData(data);
    router.navigate({ to: "/signup/alumnusProfessional" });
  };

  // Check if the store has hydrated
  const hasHydrated = useHasHydrated();

  // Redirect to basic info step if required fields are missing. For data persistence.
  useEffect(() => {
    if (!hasHydrated) return;
    if (!firstName || !lastName || !gender || !country || !stateOfOrigin || !phone || !email || !password || !confirmPassword) {
      router.navigate({ to: "/signup/alumnusBasic" });
    }
  }, [firstName, lastName, middleName, gender, address, country, stateOfOrigin, phone, email, password, confirmPassword, profilePic, router, useAlumnusStoreData.persist.hasHydrated]);

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
        <LeftContainer />
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
                  name="grad_year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Graduation Year <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter your graduation year"
                          className="w-full"
                          value={Number(field.value) || ""}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

export default AlumnusSchool;