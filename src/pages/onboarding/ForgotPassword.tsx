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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

const ForgotPassword = () => {
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
    console.log(data);
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
            Forgot Password
            </p>

            <p className="text-xs mt-2">Enter the email you used to create your account so we can send you instructions on how to reset your password.</p></div>


          <Form {...form}>
            <form
              className="w-full space-y-4 mt-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
             
            </form>
            </Form>
              
                <div>
            <Link
              to="/check-email"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-full">
              <Button type="submit" className="mt-4 w-full bg-[#5E0B80]">
                Send
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

export default ForgotPassword;
