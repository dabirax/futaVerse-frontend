import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import loginImage from "../../../assets/login.png";
import  Logo  from '../../../components/Logo';
import { BackButton } from '../../components/BackButton';
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

const alumnusSchoolSchema = alumnusSchema.pick({
  matricNo: true,
  department: true,
  faculty: true,
  gradYear: true,
  certificate: true,
});

type AlumnusSchoolFormData = z.infer<typeof alumnusSchoolSchema>;

const AlumnusSchool = () => {

  const form = useForm<AlumnusSchoolFormData>({
    resolver: zodResolver(alumnusSchoolSchema),
    defaultValues: {
      matricNo: "",
      department: "",
      faculty: "",
      gradYear: 2025,
      certificate: null,
    },
  });
    
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
  
    const setData = useAlumnusStoreData((state)=> state.setData)

    const router = useRouter()

  const onSubmit = (data: AlumnusSchoolFormData) => {
      console.log(data);
     setData(data)
    router.navigate({ to: "/signup/alumnusProfessional" })
  };

  const hasHydrated = useHasHydrated()
  
  useEffect(() => {
    if (!hasHydrated) return;
    if (!firstName || !lastName || !gender || !country || !stateOfOrigin || !phone || !email || !password || !confirmPassword) {
    router.navigate({ to: "/signup/alumnusBasic" })
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
            <p className="text-xl font-semibold tracking-tight text-center">School Information</p>

            <Form {...form}>
              <form
                className="w-full space-y-5 mt-5"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="matricNo"
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

                <FormField
  control={form.control}
  name="gradYear"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Graduation Year <span className="text-red-500">*</span></FormLabel>
      <FormControl>
        <Input
          type="number"
          placeholder="Enter your graduation year"
          className="w-full"
          value={field.value || ""}
          onChange={(e) => field.onChange(Number(e.target.value))}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

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