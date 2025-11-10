import { useState } from "react";
import { Link, useRouter, } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  ArrowLeft, CalendarIcon, X,} from "lucide-react";
import { format } from "date-fns";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().min(10, "Description must be at least 10 characters").max(2000),
  work_mode: z.enum(["Remote", "Hybrid", "On-site"]),
  engagement_type: z.enum(["Full-time", "Part-time", "Contract"]),
  location: z.string().min(1, "Location is required"),
  industry: z.string().min(1, "Industry is required"),
  duration_weeks: z.number().min(1, "Duration must be at least 1 week").max(104),
  start_date: z.date().optional(),
  end_date: z.date().optional(),
  is_paid: z.boolean(),
  stipend: z.string().optional(),
  available_slots: z.number().min(1, "Must have at least 1 slot").max(50),
  require_resume: z.boolean(),
  require_cover_letter: z.boolean(),
  skills_required: z.array(z.string()).min(1, "At least one skill is required"),
}).refine(
  (data) => data.start_date && data.end_date && data.end_date > data.start_date,
  {
    message: "End date must be after start date",
    path: ["end_date"],
  }
);

type FormValues = z.infer<typeof formSchema>;

export default function CreateInternship() {
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
      duration_weeks: 12,
    start_date: undefined,
    end_date: undefined,
      is_paid: false,
      stipend: "",
      available_slots: 1,
      require_resume: true,
      require_cover_letter: false,
      skills_required: [],
    },
  });

  const isPaid = form.watch("is_paid");
  const skills = form.watch("skills_required");

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      form.setValue("skills_required", [...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    form.setValue(
      "skills_required",
      skills.filter((s) => s !== skill)
    );
  };

  const onSubmit = (data: FormValues) => {
    console.log("Internship data:", data);
    toast({
      title: "Success",
      description: "Internship created successfully!",
    });
    router.navigate({ to: "/alumnus/internships" })
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.navigate({ to: "/alumnus/internships" })}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold text-foreground">Create New Internship</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Basic Information</h2>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Internship Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Frontend Developer Intern" {...field} />
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
                    <Textarea
                      placeholder="Describe the internship role, responsibilities, and what the intern will learn..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Technology, Finance, Healthcare" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Lagos, Nigeria" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Work Details */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Work Details</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="work_mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Mode</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work mode" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                        <SelectItem value="On-site">On-site</SelectItem>
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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select engagement type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="duration_weeks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (Weeks)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        max="104"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
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
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      max="50"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                    />
                  </FormControl>
                  <FormDescription>Number of interns you can accept</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Skills Required */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Skills Required</h2>

            <FormField
              control={form.control}
              name="skills_required"
              render={() => (
                <FormItem>
                  <FormLabel>Add Skills</FormLabel>
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., React, TypeScript, Node.js"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Button type="button" onClick={addSkill}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1">
                        {skill}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Compensation */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Compensation</h2>

            <FormField
              control={form.control}
              name="is_paid"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Paid Internship</FormLabel>
                    <FormDescription>
                      Will this internship provide a stipend?
                    </FormDescription>
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
                      <Input placeholder="e.g., 50000" {...field} />
                    </FormControl>
                    <FormDescription>Monthly stipend in Nigerian Naira</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Application Requirements */}
          <div className="rounded-lg border border-border bg-card p-6 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Application Requirements</h2>

            <FormField
              control={form.control}
              name="require_resume"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Require Resume</FormLabel>
                    <FormDescription>
                      Students must upload their resume
                    </FormDescription>
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
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Require Cover Letter</FormLabel>
                    <FormDescription>
                      Students must submit a cover letter
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 justify-end">
            <Link to="/alumnus/internships"><Button
              type="button"
              variant="outline"
            >
              Cancel
            </Button></Link>
            <Button type="submit" variant="gradient">
              Create Internship
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
