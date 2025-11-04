import { BookOpen, GraduationCap, ShieldCheck, Users2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UserRoles = () => {
  const roles = [
    {
      value: "students",
      icon: GraduationCap,
      title: "Students (Mentees)",
      description: "Empowering your career journey",
      benefits: [
        "Find experienced mentors in your field",
        "Apply for internships and NYSC placements",
        "Attend exclusive alumni events and workshops",
        "Get real-time feedback on your progress",
        "Build your professional network",
      ],
      color: "primary",
    },
    {
      value: "alumni",
      icon: Users2,
      title: "Alumni (Mentors)",
      description: "Give back to the FUTA community",
      benefits: [
        "Guide and inspire the next generation",
        "Host mentorship sessions online or in-person",
        "Share job and internship opportunities",
        "Organize events and workshops",
        "Track your mentees' progress and impact",
      ],
      color: "secondary",
    },
    {
      value: "lecturers",
      icon: BookOpen,
      title: "Lecturers",
      description: "Support academic and career development",
      benefits: [
        "Serve as mentors alongside alumni",
        "Co-host educational events",
        "Review mentorship quality and reports",
        "Bridge academia and industry",
        "Enhance student career readiness",
      ],
      color: "accent",
    },
    {
      value: "admins",
      icon: ShieldCheck,
      title: "Admins",
      description: "Oversee and optimize the platform",
      benefits: [
        "Approve and manage mentor applications",
        "Monitor user activities and engagement",
        "Generate analytics and reports",
        "Manage events and announcements",
        "Ensure platform quality and security",
      ],
      color: "primary-dark",
    },
  ];

  return (
    <section className="py-8 lg:py-16 gradient-soft">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            User{" "}
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Roles
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            FUTAVerse serves four key user groups, each with unique benefits and responsibilities.
          </p>
        </div>

        <Tabs defaultValue="students" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 h-auto gap-2 bg-muted/50 p-2">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <TabsTrigger
                  key={role.value}
                  value={role.value}
                  className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground  hover:scale-110 transition-all"
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs lg:text-sm font-semibold">
                    {role.title.split(" ")[0]}
                  </span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <TabsContent key={role.value} value={role.value} className="mt-8">
                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                      <div className={`w-14 h-14 rounded-xl bg-linear-to-br from-${role.color} to-primary-dark flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">{role.title}</CardTitle>
                        <CardDescription className="text-base">
                          {role.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {role.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          </div>
                          <span className="text-muted-foreground">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default UserRoles;
