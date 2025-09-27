import {useRouter} from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";


export function BackButton() {
    const router = useRouter();
    return <motion.div
        whileHover={{    scale: 1.2  }} whileTap={{    scale: 0.85  }} className="w-full cursor-pointer" onClick={() => {
    if (window.history.length > 1) {
      router.history.back();
    } else {
      router.navigate({
        to: "/"
      }); // fallback to home
    }
  }}>
      <ArrowLeft className="bg-[#9017c2] text-white rounded-full p-0.5" />
              </motion.div>;
}
  