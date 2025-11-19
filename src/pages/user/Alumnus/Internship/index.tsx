import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import {motion} from 'framer-motion'
import InternshipCard from "../../../../components/user/internships/InternshipCard";
import StudentCard from "../../../../components/user/internships/StudentCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { useInternships } from "@/hooks/useInternships";


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

export default function AlumnusInternship() {

  const { data: internships, isLoading, isError } = useInternships();
  console.log(internships);
  const [activeTab, setActiveTab] = useState("my-internships");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Internships</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 mb-5">
          <TabsTrigger value="my-internships">My Internships</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interns">Interns</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* MY INTERNSHIPS TAB */}
        <TabsContent value="my-internships" className="space-y-4">
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
    <div className="col-span-2 text-center py-12 text-muted-foreground">
      Loading internships...
    </div>
  )}

  {isError && (
    <div className="col-span-2 text-center py-12 text-red-500">
      Something went wrong fetching internships.
    </div>
  )}

  {!isLoading && !isError && (
    <div className="grid gap-4 md:grid-cols-2">
      {internships?.length > 0 ? (
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
</TabsContent>


        {/* OFFERS TAB */}
        <TabsContent value="offers" className="space-y-4">
          <div className="flex justify-end">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.9 }}><Button className="p-2 mr-4">
              <Plus className="h-4 w-4" />
              Share Offer
            </Button></motion.div>
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
