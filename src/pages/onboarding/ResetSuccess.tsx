import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CircleCheckBig } from 'lucide-react';
import { LeftContainer } from './components/LeftContainer';
import { Button } from "@/components/ui/button";

const ResetSuccess = () => {
  
  
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-full h-full grid lg:grid-cols-2">
       <LeftContainer  />
        <div className="max-w-md m-auto w-full flex flex-col items-center gap-6">

          
          <div><CircleCheckBig className="text-green-500" size={60} /></div>

          <p className="text-2xl">Password reset successful!</p>


            <Link
              to="/login"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }} className="w-full">
              <Button type="submit" className="mt-4 w-40 bg-[#5E0B80]">
               Login
              </Button></motion.div></Link>
              
            

          
          
      </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
