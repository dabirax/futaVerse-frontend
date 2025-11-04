import { Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { BackButton } from '../../components/BackButton';
import { LeftContainer } from './components/LeftContainer';
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

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Confirm Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
    console.log("Reset password data:", data);
  };
  
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
       <LeftContainer  />
        <div className="max-w-md m-auto w-full flex flex-col items-center">
          <div className="mt-4 flex items-center justify-between w-full text-2xl">
            <div className=" mt-1">
              <BackButton />
            </div>
            <Logo />
          </div>
          <div className="p-5 flex flex-col  gap-y-20">
            <div>
          <p className="text-xl font-semibold tracking-tight text-center">
            Reset Password
            </p>

            <p className="text-xs mt-2">Choose a new password for your account</p></div>


          <Form {...form}>
            <form
              className="w-full space-y-4 mt-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
               <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password </FormLabel>
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
                    <FormLabel>Confirm Password </FormLabel>
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
             
            </form>
            </Form>
              
                <div>
            <Link
              to="/reset-success"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-full">
              <Button type="submit" className="mt-4 w-full bg-[#5E0B80]">
                Reset Password
              </Button></motion.div></Link>
              
            <Link
              to="/login"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-full">
              <Button type="submit" className="mt-4 w-full text-[#5E0B80] bg-white border-2">
                Back to Login
              </Button></motion.div></Link></div>
              

            </div>

          
          
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
