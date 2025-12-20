import InternshipCard2 from "@/components/user/internships/InternshipCard2";

const mockStudentOffers = [
  {
    internshipTitle: "Frontend Developer Intern",
    alumnusName: "Engr. Akinwale Ojo",
    company: "TechNova Ltd",
  },
  {
    internshipTitle: "Backend Engineer Intern",
    alumnusName: "Mrs. Funke Adeyemi",
    company: "CloudCore",
  },
];

export default function StudentOffersTab() {
  return (
    <div className="space-y-4">
      {mockStudentOffers.length > 0 ? (
        mockStudentOffers.map((offer, index) => (
          <InternshipCard2
            key={index}
            {...offer}
            variant="offer"
            onAccept={() => console.log("Accept offer")}
            onReject={() => console.log("Reject offer")}
          />
        ))
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No offers received yet.
        </div>
      )}
    </div>
  );
}
