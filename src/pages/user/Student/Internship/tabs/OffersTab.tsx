import CardSkeleton2 from "@/components/CardSkeleton2";
import InternshipCard2 from "@/components/user/internships/InternshipCard2";
import { useInternshipOffers } from "@/hooks/useInternshipOffers";

export default function OffersPage() {
  const { data, isLoading, isError } = useInternshipOffers();

  if (isLoading) {
    return <CardSkeleton2 />;
  }

  if (isError) {
    return <p className="text-sm text-destructive">Failed to load offers</p>;
  }

  if (!data?.results?.length) {
    return <p className="text-sm text-muted-foreground">No offers yet</p>;
  }

  return (
    <div className="space-y-4">
      {data.results.map((offer: any) => (
        <InternshipCard2
          key={offer.id}
          internshipTitle={offer.internship.title}
          alumnusName={`${offer.student.firstname} ${offer.student.lastname}`}
          company={offer.internship.industry}
          variant="offer"
          onAccept={() => {
            console.log("Accept offer", offer.id);
          }}
          onReject={() => {
            console.log("Reject offer", offer.id);
          }}
        />
      ))}
    <CardSkeleton2 />
    </div>
  );
}
