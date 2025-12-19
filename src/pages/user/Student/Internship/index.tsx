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
