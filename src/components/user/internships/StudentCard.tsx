import { MessageSquare } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ConfirmActionDialog from "../ConfirmActionDialog";

interface StudentCardProps {
  studentName: string;
  studentImage?: string;
  title?: string;
  showActions?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
  onWithdraw?: () => void;
  onMessage?: () => void;
  variant?: "applicant" | "offer" | "message";
}

export default function StudentCard({
  studentName,
  studentImage,
  title,
  showActions = true,
  onAccept,
  onWithdraw,
  onReject,
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
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h4 className="font-semibold text-foreground">{studentName}</h4>
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>
          </div>


          {showActions && (
            <div className="flex gap-2">
              {variant === 'applicant' && (
                <>
                  <ConfirmActionDialog
                    trigger={<Button size="sm">Accept</Button>}
                    title={`Accept ${studentName}?`}
                    description={`This will accept ${studentName}'s application for "${title}". They will be notified immediately.`}
                    confirmLabel="Yes, accept"
                    successTitle="Application accepted"
                    successDescription={`${studentName} has been notified of their acceptance.`}
                    onConfirm={() => onAccept?.()}
                  />
                  <ConfirmActionDialog
                    trigger={
                      <Button size="sm" variant="destructive">
                        Reject
                      </Button>
                    }
                    title={`Reject ${studentName}?`}
                    description={`This will reject ${studentName}'s application for "${title}". This action cannot be undone.`}
                    confirmLabel="Yes, reject"
                    destructive
                    successTitle="Application rejected"
                    successDescription={`${studentName}'s application has been rejected.`}
                    onConfirm={() => onReject?.()}
                  />
                </>
              )}

              {variant === 'offer' && (
                <ConfirmActionDialog
                  trigger={
                    <Button size="sm" variant="destructive">
                      Withdraw
                    </Button>
                  }
                  title="Withdraw offer?"
                  description={`This will withdraw the offer extended to ${studentName} for "${title}". They will be notified.`}
                  confirmLabel="Yes, withdraw"
                  destructive
                  successTitle="Offer withdrawn"
                  successDescription={`The offer to ${studentName} has been withdrawn.`}
                  onConfirm={() => onWithdraw?.()}
                />
              )}

              {variant === 'message' && (
                <Button size="sm" variant="outline" onClick={onMessage}>
                  <MessageSquare className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
