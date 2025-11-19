import {useEffect, useState,  } from "react";
import { useRouter} from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {  ArrowLeft, CalendarIcon, Link, X,} from "lucide-react";
import { format } from "date-fns";
import { editInternshipRoute } from "@/routes/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(1, "Description is required"),
  work_mode: z.enum(["Remote", "On-site", "Hybrid"]),
  engagement_type: z.enum(["Full-time", "Part-time"]),
  location: z.string().min(1, "Location is required"),
  industry: z.string().min(1, "Industry is required"),
  duration_weeks: z.number().min(1, "Duration must be at least 1 week"),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  is_paid: z.boolean(),
  stipend: z.string().optional(),
  available_slots: z.number().min(1, "At least 1 slot is required"),
  require_resume: z.boolean(),
  require_cover_letter: z.boolean(),
  skills_required: z.array(z.string()).min(1, "At least one skill is required"),
});

type FormValues = z.infer<typeof formSchema>;

// Mock data for existing internship
const mockInternship = {
  id: "1",
  title: "Frontend Developer Intern",
  description: "Work on building modern web applications using React, TypeScript, and Tailwind CSS. Collaborate with experienced developers and contribute to real-world projects.",
  skills_required: ["React", "TypeScript", "Tailwind CSS", "Git"],
  work_mode: "Remote" as const,
  engagement_type: "Full-time" as const,
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
};

export default function EditInternship() {
  const { id } = editInternshipRoute.useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [skillInput, setSkillInput] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      work_mode: "Remote",
      engagement_type: "Full-time",
      location: "",
      industry: "",
      duration_weeks: 8,
      start_date: new Date(),
      end_date: new Date(),
      is_paid: false,
      stipend: "",
      available_slots: 1,
      require_resume: true,
      require_cover_letter: false,
      skills_required: [],
    },
  });

  // Load internship data
  useEffect(() => {
    // In a real app, fetch data by ID
    // For now, use mock data
    form.reset({
      title: mockInternship.title,
      description: mockInternship.description,
      work_mode: mockInternship.work_mode,
      engagement_type: mockInternship.engagement_type,
      location: mockInternship.location,
      industry: mockInternship.industry,
      duration_weeks: mockInternship.duration_weeks,
      start_date: new Date(mockInternship.start_date),
      end_date: new Date(mockInternship.end_date),
      is_paid: mockInternship.is_paid,
      stipend: mockInternship.stipend,
      available_slots: mockInternship.available_slots,
      require_resume: mockInternship.require_resume,
      require_cover_letter: mockInternship.require_cover_letter,
      skills_required: mockInternship.skills_required,
    });
  }, [id, form]);

  const isPaid = form.watch("is_paid");
  const skills = form.watch("skills_required");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      form.setValue("skills_required", [...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    form.setValue(
      "skills_required",
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const onSubmit = (data: FormValues) => {
    console.log("Updated internship data:", data);
    toast({
      title: "Success",
      description: "Internship updated successfully!",
    });
    router.navigate({to: `/alumnus/internships/${id}`});
  };

  const handleCancel = () => {  
    router.navigate({to: `/alumnus/internships/${id}`});
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.navigate({to: `/alumnus/internships/${id}`})}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Edit Internship</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Frontend Developer Intern" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the internship responsibilities and expectations..." rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Technology, Finance, Healthcare" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Work Details */}
          <Card>
            <CardHeader>
              <CardTitle>Work Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="work_mode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Mode</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select work mode" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Remote">Remote</SelectItem>
                          <SelectItem value="On-site">On-site</SelectItem>
                          <SelectItem value="Hybrid">Hybrid</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="engagement_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Engagement Type</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select engagement type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Full-time">Full-time</SelectItem>
                          <SelectItem value="Part-time">Part-time</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Lagos, Nigeria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration_weeks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (weeks)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Compensation */}
          <Card>
            <CardHeader>
              <CardTitle>Compensation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="is_paid"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Paid Internship</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Does this internship offer a stipend?
                      </div>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              {isPaid && (
                <FormField
                  control={form.control}
                  name="stipend"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stipend Amount (₦)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="e.g. 50000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="available_slots"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available Slots</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Skills & Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Skills & Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <FormLabel>Required Skills</FormLabel>
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Add a skill"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  />
                  <Button type="button" onClick={addSkill}>
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {skill}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      />
                    </Badge>
                  ))}
                </div>
                {form.formState.errors.skills_required && (
                  <p className="text-sm font-medium text-destructive mt-2">
                    {form.formState.errors.skills_required.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="require_resume"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Require Resume</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Applicants must submit a resume
                      </div>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="require_cover_letter"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Require Cover Letter</FormLabel>
                      <div className="text-sm text-muted-foreground">
                        Applicants must submit a cover letter
                      </div>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex gap-4 justify-between">
            
            <Button type="button" variant={"destructive"}>Delete</Button>

            <div className="flex gap-4">
                <Button type="button" variant={"outline"} onClick={handleCancel}>
                  Cancel
                </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
