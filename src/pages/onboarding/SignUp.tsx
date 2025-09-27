"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Country, State } from "country-state-city";
import loginImage from "../../assets/login.png";
import  Logo  from './components/Logo';
import { BackButton } from './components/BackButton';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const countryOptions = Country.getAllCountries().map((country) => ({
  label: `${country.name}`,
  value: country.isoCode,
  phoneCode: `+${country.phonecode}`,
}));

const stateOptions = (countryCode: string): Array<string> => {
  return State.getStatesOfCountry(countryCode).map((state) => state.name);
};

const SignUp = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      firstName: "",
      lastName: "",
      middleName: "",
      gender: undefined,
      address: "",
      country: "",
      state: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePic: null,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const selectedCountry = form.watch("country");
  const selectedPhoneCode = countryOptions.find(
    (country) => country.value === selectedCountry
  )?.phoneCode;


  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
        <div className="bg-[#9017C2] hidden lg:flex justify-center border">
          <div className=" fixed flex justify-center items-center h-screen pt-10 px-10">
          <motion.img
            src={loginImage}
            alt="Login"
            className="object-cover "
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          /></div>
        </div>
        <div className="max-w-md m-auto w-full flex flex-col items-center">
          <div className="mt-4 flex items-center justify-between w-full text-[#9017c2] text-2xl">
            <div className=" mt-1">
             <BackButton />
            </div>
            <Logo     />
          </div>
          <div className="px-5">
          <p className="text-xl font-semibold tracking-tight text-center">Sign Up</p>

          <Form {...form}>
            <form
              className="w-full space-y-6 mt-8"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Chukwuemeka"
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
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Ajanlekoko "
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /></div>

              <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Mustapha"
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
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> </div>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="123 Main St"
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
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryOptions.map((country) => (
                            <SelectItem key={country.value} value={country.value}>
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select State" />
                          </SelectTrigger>
                          <SelectContent>
                            {stateOptions(selectedCountry).map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number<span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <span className="p-2 bg-gray-100 border border-gray-300 rounded-l-md text-sm text-gray-700  whitespace-nowrap italic font-medium">
                          {selectedPhoneCode || "+123"}
                        </span>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="rounded-l-none border-l-0"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@example.com"
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
                name="profilePic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        accept="image/*"
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

              <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password123#"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password123#"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /></div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;