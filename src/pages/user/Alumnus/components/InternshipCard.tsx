import { useRouter } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface InternshipCardProps {
  id: string;
  title: string;
  description: string;
  logo?: string;
  workMode?: string;
  location?: string;
  availableSlots?: number;
}

export default function InternshipCard({
  id,
  title,
  description,
  logo,
  workMode,
  location,
  availableSlots,
}: InternshipCardProps) {
  const router = useRouter();

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
      onClick={() => router.navigate({to: `/alumnus/internships/${id}`})}
    >
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Avatar className="h-16 w-16 rounded-lg">
            <AvatarImage src={logo} />
            <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
              {title.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <h3 className="font-semibold text-lg text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>

            <div className="flex flex-wrap gap-2 pt-2">
              {workMode && <Badge variant="accent">{workMode}</Badge>}
              {location && <Badge variant="outline">{location}</Badge>}
              {availableSlots !== undefined && (
                <Badge variant="outline">{availableSlots} slots available</Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
