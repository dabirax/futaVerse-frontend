import { Plus } from "lucide-react";
import { motion } from 'framer-motion';
import StudentCard from "../../../../../components/user/internships/StudentCard";
import { Button } from "@/components/ui/button";

const mockOffers = [
  {
    studentName: "Chioma Adebayo",
    internshipTitle: "Frontend Developer Intern",
  },
  {
    studentName: "Tunde Olatunji",
    internshipTitle: "Backend Engineer Intern",
  },
];

export default function OffersTab() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.9 }}>
          <Button className="p-2 mr-4">
            <Plus className="h-4 w-4" />
            Share Offer
          </Button>
        </motion.div>
      </div>

      <div className="space-y-3">
        {mockOffers.length > 0 ? (
          mockOffers.map((offer, index) => (
            <StudentCard
              key={index}
              {...offer}
              variant="offer"
              onWithdraw={() => console.log("Withdraw offer")}
            />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No offers sent yet.
          </div>
        )}
      </div>
    </div>
  );
}