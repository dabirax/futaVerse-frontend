import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { motion } from 'framer-motion';
import InternshipCard from "../../../../../components/user/internships/InternshipCard";
import { Button } from "@/components/ui/button";
import CardSkeleton1 from "@/components/CardSkeleton1";
import { useInternships } from "@/hooks/useInternships";

export default function MyInternshipsTab() {

  
  const { data, isLoading, isError } = useInternships();

  const {results:internships} = data || {};
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.9 }}>
          <Link to="/alumnus/internships/create-internship">
            <Button className="p-2! mr-4">
              <Plus className="h-4 w-4" />
              Create New Internship
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* DATA FETCH LOGIC */}
      {isLoading && (
        <CardSkeleton1 />
      )}

      {isError && (
        <div className="col-span-2 text-center py-12 text-red-500">
          Something went wrong fetching internships.
        </div>
      )}

      {!isLoading && !isError && (
        <div className="grid gap-4 md:grid-cols-2">
          {internships !== undefined && internships.length > 0 ? (
            internships.map((internship: any) => (
              <InternshipCard key={internship.id} {...internship} />
            ))
          ) : (
            <div className="col-span-2 text-center py-12 text-muted-foreground">
              No internships created yet. Click "Create New Internship" to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}