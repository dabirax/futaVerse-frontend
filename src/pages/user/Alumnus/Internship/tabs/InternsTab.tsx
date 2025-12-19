import StudentCard from "../../../../../components/user/internships/StudentCard";

const mockInterns = [
  {
    studentName: "Fatima Ibrahim",
    internshipTitle: "Backend Engineer Intern",
  },
];

export default function InternsTab() {
  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {mockInterns.length > 0 ? (
          mockInterns.map((intern, index) => (
            <StudentCard
              key={index}
              {...intern}
              variant="intern"
              onMessage={() => console.log("Message intern")}
            />
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No active interns yet.
          </div>
        )}
      </div>
    </div>
  );
}