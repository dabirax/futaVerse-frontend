import { useState } from "react"
import {  useRouter, } from "@tanstack/react-router"
import { ArrowLeft, Edit, Plus } from "lucide-react"
import StudentCard from "../../../../components/user/internships/StudentCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { internshipDetailRoute } from "@/routes/user" 


// Mock internship data
const mockInternship = {
  id: "1",
  title: "Frontend Developer Intern",
  description:
    "Work on building modern web applications using React, TypeScript, and Tailwind CSS. Collaborate with experienced developers and contribute to real-world projects.",
  skills_required: ["React", "TypeScript", "Tailwind CSS", "Git"],
  work_mode: "Remote",
  engagement_type: "Full-time",
  location: "Lagos, Nigeria",
  industry: "Technology",
  duration_weeks: 12,
  start_date: "2025-11-15",
  end_date: "2026-02-07",
  is_paid: true,
  stipend: "50000.00",
  available_slots: 3,
  require_resume: true,
  require_cover_letter: true,
  is_active: true,
}

const mockOffers = [
  { studentName: "Chioma Adebayo", internshipTitle: "Frontend Developer Intern" },
]

const mockApplications = [
  { studentName: "Blessing Okonkwo", internshipTitle: "Frontend Developer Intern" },
  { studentName: "Emmanuel Nwosu", internshipTitle: "Frontend Developer Intern" },
]

const mockInterns = [
  { studentName: "Fatima Ibrahim", internshipTitle: "Frontend Developer Intern" },
]

export default function InternshipDetail() {
  const router = useRouter()
  
  const { id } = internshipDetailRoute.useParams()
    const { data: hero, 
  const [activeTab, setActiveTab] = useState("details")
  const [isActive, setIsActive] = useState(mockInternship.is_active)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.navigate({ to: "/alumnus/internships" })}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-semibold">{mockInternship.title}</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="offers">Offers</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="interns">Interns</TabsTrigger>
        </TabsList>

        {/* DETAILS TAB */}
        <TabsContent value="details" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={() => router.navigate({ to: `/alumnus/internships/${id}/edit` })}>
              <Edit className="h-4 w-4" />
              Edit Internship
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-muted-foreground">Title</Label>
                  <p className="font-medium">{mockInternship.title}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="text-sm">{mockInternship.description}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Industry</Label>
                  <p className="font-medium">{mockInternship.industry}</p>
                </div>
              </CardContent>
            </Card>

            {/* Work Details */}
            <Card>
              <CardHeader>
                <CardTitle>Work Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-muted-foreground">Work Mode</Label>
                  <p className="font-medium">{mockInternship.work_mode}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Engagement Type</Label>
                  <p className="font-medium">{mockInternship.engagement_type}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Location</Label>
                  <p className="font-medium">{mockInternship.location}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Duration</Label>
                  <p className="font-medium">{mockInternship.duration_weeks} weeks</p>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-muted-foreground">Start Date</Label>
                  <p className="font-medium">{new Date(mockInternship.start_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">End Date</Label>
                  <p className="font-medium">{new Date(mockInternship.end_date).toLocaleDateString()}</p>
                </div>
              </CardContent>
            </Card>

            {/* Compensation & Slots */}
            <Card>
              <CardHeader>
                <CardTitle>Compensation & Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label className="text-muted-foreground">Is Paid</Label>
                  <p className="font-medium">{mockInternship.is_paid ? "Yes" : "No"}</p>
                </div>
                {mockInternship.is_paid && (
                  <div>
                    <Label className="text-muted-foreground">Stipend</Label>
                    <p className="font-medium">₦{parseFloat(mockInternship.stipend).toLocaleString()}</p>
                  </div>
                )}
                <div>
                  <Label className="text-muted-foreground">Available Slots</Label>
                  <p className="font-medium">{mockInternship.available_slots}</p>
                </div>
              </CardContent>
            </Card>

            {/* Skills & Requirements */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Skills & Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">Required Skills</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {mockInternship.skills_required.map((skill, index) => (
                      <Badge key={index} variant="accent">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <Label className="text-muted-foreground">Resume Required:</Label>
                    <Badge variant={mockInternship.require_resume ? "default" : "outline"}>
                      {mockInternship.require_resume ? "Yes" : "No"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-muted-foreground">Cover Letter Required:</Label>
                    <Badge variant={mockInternship.require_cover_letter ? "default" : "outline"}>
                      {mockInternship.require_cover_letter ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active/Inactive Toggle */}
          <Card>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <Label className="text-base font-semibold">Internship Status</Label>
                <p className="text-sm text-muted-foreground">
                  {isActive ? "This internship is currently active and accepting applications" : "This internship is currently inactive"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={isActive} onCheckedChange={setIsActive} />
                <Label>{isActive ? "Active" : "Inactive"}</Label>
              </div>
            </CardContent>
          </Card>
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
                No offers sent for this internship yet.
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
                No applications received for this internship yet.
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
                No active interns for this internship yet.
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
