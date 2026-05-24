import { useState } from "react";
import MyInternshipsTab from "./tabs/MyInternshipsTab";
import OffersTab from "./tabs/OffersTab";
import ApplicationsTab from "./tabs/ApplicationsTab";
import InternsTab from "./tabs/InternsTab";
import ReportsTab from "./tabs/ReportsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AlumnusInternship() {

  const [activeTab, setActiveTab] = useState("my-internships");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Internships</h1>
        <p className="text-muted-foreground text-sm mt-0.5">Manage your internship listings and track applicants</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto pb-1 -mx-1 px-1">
          <TabsList className="inline-flex w-max mb-4">
            <TabsTrigger value="my-internships">My Internships</TabsTrigger>
            <TabsTrigger value="offers">Offers</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="interns">Interns</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="my-internships">
          <MyInternshipsTab />
        </TabsContent>


        <TabsContent value="offers">
          <OffersTab />
        </TabsContent>

        <TabsContent value="applications">
          <ApplicationsTab />
        </TabsContent>

        <TabsContent value="interns">
          <InternsTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
