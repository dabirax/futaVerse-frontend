import InternshipCard from "../../../../../components/user/internships/InternshipCard";
import CardSkeleton1 from "@/components/CardSkeleton1";
import { useInternships } from "@/hooks/useInternships";

export default function MyInternshipsTab() {

  
  const { data, isLoading, isError } = useInternships();

  const {results:internships} = data || {};
  
  return (
    <div className="space-y-4">
      

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