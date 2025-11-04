import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface StudentCardProps {
  studentName: string;
  studentImage?: string;
  internshipTitle: string;
  showActions?: boolean;
  onAccept?: () => void;
  onWithdraw?: () => void;
  onMessage?: () => void;
  variant?: "applicant" | "offer" | "intern";
}

export default function StudentCard({
  studentName,
  studentImage,
  internshipTitle,
  showActions = true,
  onAccept,
  onWithdraw,
  onMessage,
  variant = "applicant",
}: StudentCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-12 w-12">
              <AvatarImage src={studentImage} />
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                {studentName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h4 className="font-semibold text-foreground">{studentName}</h4>
              <p className="text-sm text-muted-foreground">{internshipTitle}</p>
            </div>
          </div>

          {showActions && (
            <div className="flex gap-2">
              {variant === "applicant" && (
                <>
                  <Button size="sm" onClick={onAccept}>
                    Accept
                  </Button>
                  <Button size="sm" variant="outline" onClick={onWithdraw}>
                    Reject
                  </Button>
                </>
              )}

              {variant === "offer" && (
                <Button size="sm" variant="outline" onClick={onWithdraw}>
                  Withdraw
                </Button>
              )}

              {variant === "intern" && (
                <Button size="sm" variant="outline" onClick={onMessage}>
                  <MessageSquare className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
