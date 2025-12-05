import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { BackButton } from '../../components/BackButton';
import { useSignupOTPStore } from "./hooks/useSignupOTPStore";
import { LeftContainer } from "./components/LeftContainer";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {Form, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { api } from "@/lib/api"




const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

interface VerifyOtpPayload {
  email: string;
  otp: string;
}

interface VerifyOtpResponse {
  success: boolean;
  message: string;
}



const SignUpOTP = () => {

  const navigate = useNavigate();

   const form = useForm<z.infer<typeof otpSchema>>({
    defaultValues: { otp: "" },
    resolver: zodResolver(otpSchema),
  });

 const verifyOtpMutation: UseMutationResult<
  VerifyOtpResponse,
  AxiosError,
  VerifyOtpPayload,
  unknown
> = useMutation(
  {

  mutationFn: async (payload: VerifyOtpPayload) => {
    const res = await api.post("/auth/signup/verify-otp", payload);
    return res.data;
  },
    onSuccess: () => {
      navigate({ to: "/signup/success" });
    },
  }
);

  const {mutate: verifyOtp, isPending, isError, error} = verifyOtpMutation;

const email = useSignupOTPStore((state) => state.email);

  

  const onSubmit = (data: z.infer<typeof otpSchema>) => {
  console.log(email, data.otp)
 verifyOtp({
    email: email || "",
    otp: data.otp,
  });
};


  
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
        <LeftContainer/>
        <div className="max-w-md m-auto w-full flex flex-col items-center">
          <div className="mt-4 px-2 flex items-center justify-between w-full text-2xl">
            <div className=" mt-1">
              <BackButton />
            </div>
            <Logo />
          </div>
          <div className="p-5 flex flex-col  gap-y-20">
            <div>
          <p className="text-xl font-semibold tracking-tight text-center">
            Enter OTP
            </p>

            <p className="text-xs mt-2">We have sent an email with the OTP to n****e@e***e.com.</p></div>


          <Form {...form}>
            <form
              className="w-full space-y-4 mt-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <InputOTP
                        maxLength={6}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        className="mx-auto"
                      >
                        <InputOTPGroup className="space-x-2 mx-auto">
                          {[0, 1, 2, 3, 4, 5].map((i) => (
                            <InputOTPSlot
                              key={i}
                              index={i}
                              className="rounded-md border border-[#D1D5DB] shadow-sm font-semibold"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="text-sm text-center text-gray-500">
                  Didn’t receive the email? <br />
                  Check spam or promotion folder or <span><Link to="" className="ml-1 text-[#6BACB3]">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.9 }}> Resend OTP
                </motion.div>
              </Link></span>
              
                </p>


                
                <div>
                  {isError && (
                    <p className="text-red-500 text-sm">{
                      error.response?.status === 400
                        ? "Invalid OTP. Please try again."
                        : error.response?.status === 404
                          ? "OTP has expired. Please request a new one."
                          : error.response?.status === 403
                            ? "You have exceeded the maximum number of attempts. Please request a new OTP."
                            : error.response?.status === 429
                              ? "Too many requests. Please wait and try again later."
                              : error.response?.status === 409
                              ? "Email already exists. Please use a different email."
                        : "An error occurred. Please try again later."
                    }</p>
                  )}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-full">
              <Button type="submit" className="mt-4 w-full bg-[#5E0B80]" disabled = {isPending}>
                {isPending ? "Verifying..." : "Verify OTP"}
              </Button></motion.div>
            <Link
              to="/login"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-full">
              <Button type="submit" className="mt-4 w-full text-[#5E0B80] bg-white border-2">
                Back to Login
              </Button></motion.div></Link></div>
            </form>
            </Form>
              
              

            </div>

          
          
        </div>
      </div>
    </div>
  );
};

export default SignUpOTP;
