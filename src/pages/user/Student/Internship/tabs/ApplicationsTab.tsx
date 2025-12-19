import StudentCard from "../../../../../components/user/internships/StudentCard";

const mockApplications = [
  {
    studentName: "Blessing Okonkwo",
    internshipTitle: "Frontend Developer Intern",
  },
  {
    studentName: "Emmanuel Nwosu",
    internshipTitle: "Frontend Developer Intern",
  },
];

export default function ApplicationsTab() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {mockApplications.length > 0 ? (
          mockApplications.map((application, index) => (
            <StudentCard
              key={index}
              {...application}
              variant="applicant"
              onAccept={() => console.log("Accept application")}
              onWithdraw={() => console.log("Reject application")}
            />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No applications received yet.
          </div>
        )}
      </div>
    </div>
  );
}