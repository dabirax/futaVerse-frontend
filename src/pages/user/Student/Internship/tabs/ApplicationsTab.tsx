import InternshipCard2 from "@/components/user/internships/InternshipCard2";

const mockStudentApplications = [
  {
    internshipTitle: "UI/UX Design Intern",
    alumnusName: "Mr. Samuel Adebayo",
    company: "DesignHub",
  },
  {
    internshipTitle: "Mobile App Intern",
    alumnusName: "Engr. Tolu Martins",
    company: "AppForge",
  },
];

export default function StudentApplicationsTab() {
  return (
    <div className="space-y-4">
      {mockStudentApplications.length > 0 ? (
        mockStudentApplications.map((application, index) => (
          <InternshipCard2
            key={index}
            {...application}
            variant="application"
            onWithdraw={() => console.log("Withdraw application")}
          />
        ))
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No applications submitted yet.
        </div>
      )}
    </div>
  );
}
