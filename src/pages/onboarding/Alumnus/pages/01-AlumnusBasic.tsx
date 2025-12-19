import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Country, State } from "country-state-city";
import { useRouter } from "@tanstack/react-router";
import { LeftContainer } from "../../components/LeftContainer";
import { BackButton } from '../../../../components/BackButton';
import { useAlumnusStoreData } from "../hooks/useAlumnusStoreData";
import { alumnusBasicSchema } from "../lib/alumnusSchema";
import type { AlumnusBasicFormData } from "../lib/alumnusSchema";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
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


const countryOptions = Country.getAllCountries().map((country) => ({
  label: `${country.name}`,
  value: country.isoCode,
  phoneCode: `+${country.phonecode}`,
}));

const stateOptions = (countryCode: string): Array<string> => {
  return State.getStatesOfCountry(countryCode).map((state) => state.name);
};

const AlumnusBasic = () => {

  const setData = useAlumnusStoreData((state)=> state.setData)

  const form = useForm<AlumnusBasicFormData>({
    resolver: zodResolver(alumnusBasicSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      middlename: "",
      gender: undefined,
      address: "",
      country: "",
      state: "",
      phone_num: "",
      email: "",
      password: "",
      confirmPassword: "",
      profilePic: null,
    },
  });
    
    const router = useRouter()

  const onSubmit = (data: AlumnusBasicFormData) => {
    setData(data);
    router.navigate({ to: "/signup/alumnusSchool" })
  };

  const selectedCountry = form.watch("country");
  const selectedPhoneCode = countryOptions.find(
    (country) => country.value === selectedCountry
  )?.phoneCode;


  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
        <LeftContainer />
        <div className="max-w-md m-auto w-full flex flex-col items-center py-4">
          <div className="flex items-center justify-between w-full text-[#9017c2] text-2xl px-2">
            <div className=" mt-1">
              <BackButton />
            </div>
            <Logo     />
          </div>
          <div className="px-5">
          <p className="text-xl font-semibold tracking-tight text-center">Sign Up</p>

          <Form {...form}>
            <form
              className="w-full space-y-5 mt-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstname"
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
                name="lastname"
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
                name="middlename"
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
                name="phone_num"
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
                        placeholder="********"
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
                        placeholder="********"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                                  /></div>
                              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} style={{ transformOrigin: "right center" }} >
                  <Button type="submit" className=" bg-[#5E0B80] flex ml-auto ">
                Next
              </Button></motion.div>
            </form>
          </Form></div>
        </div>
      </div>
    </div>
  );
};

export default AlumnusBasic;