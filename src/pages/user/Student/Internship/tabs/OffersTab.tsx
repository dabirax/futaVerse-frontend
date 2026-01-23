import CardSkeleton3 from "@/components/CardSkeleton3";
import InternshipCard2 from "@/components/user/internships/InternshipCard2";
import { useAcceptInternshipOffer, useInternshipOffers, useRejectInternshipOffer } from "@/hooks/useInternships";

export default function OffersPage() {
  const { data, isLoading, isError } = useInternshipOffers();
  const { mutate: acceptOffer } = useAcceptInternshipOffer();
  const { mutate: rejectOffer } = useRejectInternshipOffer();

  if (isLoading) {
    return <CardSkeleton3 />;
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
          acceptOffer(offer.id);
          }}
          onReject={() => {
            rejectOffer(offer.id);
          }}
        />
      ))}
    </div>
  );
}
