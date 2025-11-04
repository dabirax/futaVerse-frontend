import { useState } from "react";
import { Plus } from "lucide-react";
import InternshipCard from "../components/InternshipCard";
import StudentCard from "../components/StudentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Mock data
const mockInternships = [
  {
    id: "1",
    title: "Frontend Developer Intern",
    description: "Work on React applications and modern web technologies",
    workMode: "Remote",
    location: "Lagos, Nigeria",
    availableSlots: 3,
  },
  {
    id: "2",
    title: "Backend Engineer Intern",
    description: "Build scalable APIs and work with databases",
    workMode: "Hybrid",
    location: "Akure, Nigeria",
    availableSlots: 2,
  },
];

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

const mockInterns = [
  {
    studentName: "Fatima Ibrahim",
    internshipTitle: "Backend Engineer Intern",
  },
];

export default function AlumnusMentorship() {
  const [activeTab, setActiveTab] = useState("my-internships");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Mentorships</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="my-internships">My Mentorships</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interns">Mentees</TabsTrigger>
          <TabsTrigger value="interns">Reports</TabsTrigger>
        </TabsList>

        {/* MY INTERNSHIPS TAB */}
        <TabsContent value="my-internships" className="space-y-4">
          <div className="flex justify-end">
                      <Button
                        //   onClick={() => navigate("/alumnus/internships/create")}
                      >
              <Plus className="h-4 w-4" />
             Add New Mentee
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {mockInternships.length > 0 ? (
              mockInternships.map((internship) => (
                <InternshipCard key={internship.id} {...internship} />
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-muted-foreground">
                No internships created yet. Click "Create New Internship" to get started.
              </div>
            )}
          </div>
        </TabsContent>

        {/* OFFERS TAB */}
        <TabsContent value="offers" className="space-y-4">
          <div className="flex justify-end">
            <Button>
              <Plus className="h-4 w-4" />
              Share Offer
            </Button>
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
        </TabsContent>

        {/* APPLICATIONS TAB */}
        <TabsContent value="applications" className="space-y-4">
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
        </TabsContent>

        {/* INTERNS TAB */}
        <TabsContent value="interns" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
