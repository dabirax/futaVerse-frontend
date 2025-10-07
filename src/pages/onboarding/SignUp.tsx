import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import loginImage from "../../assets/login.png";
import  Logo  from '../../components/Logo';
import { BackButton } from '../components/BackButton';
import { Button } from "@/components/ui/button";

const SignUp = () => {


 

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
        <div className="max-w-md m-auto h-screen w-full flex flex-col items-center py-4">
          <div className="flex items-center justify-between w-full text-[#9017c2] text-2xl px-2">
            <div className=" mt-1">
             <BackButton />
            </div>
            <Logo     />
          </div>
          <p className="text-xl font-semibold tracking-tight text-center">Sign Up</p>
          <p>Register As:</p>
            <div className="flex flex-col justify-center h-full ">
              <Link
                          to="/signup/alumnusBasic"
                          className="text-sm text-[#6BACB3] block text-right"
                        >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-full">
              <Button type="submit" className="mt-4 w-full bg-[#5E0B80]">
               Alumnus
              </Button></motion.div></Link>

            <Link
                          to="/signup/studentBasic"
                          className="text-sm text-[#6BACB3] block text-right"
                        >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-full">
              <Button type="submit" className="mt-4 w-full bg-[#5E0B80]">
               Student
                </Button></motion.div></Link>
            
            <Link
                          to="/signup/lecturerBasic"
                          className="text-sm text-[#6BACB3] block text-right"
                        >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-full">
              <Button type="submit" className="mt-4 w-full bg-[#5E0B80]">
               Lecturer
              </Button></motion.div></Link>
</div>
           

          </div>
        </div>
      </div>
  );
};

export default SignUp;