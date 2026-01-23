import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type InternshipCardProps = {
  internshipTitle: string;
  alumnusName: string;
  company?: string;
  variant: "offer" | "application";
  onAccept?: () => void;
  onReject?: () => void;
  onWithdraw?: () => void;
};

export default function InternshipCard2({
  internshipTitle,
  alumnusName,
  company,
  variant,
  onAccept,
  onReject,
  onWithdraw,
}: InternshipCardProps) {
  return (
    <div className="flex gap-4 bg-background rounded-xl border  space-y-2  p-4 shadow-sm hover:shadow-md transition-shadow">
              <Avatar className="h-16 w-16 rounded-lg">
                {/* <AvatarImage src={logo || ""} /> */}
                <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                  {internshipTitle.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

    <div className=" flex-1 md:flex md:justify-between  space-y-2 w-full">
      <div>
        <h3 className="font-semibold">{internshipTitle}</h3>
        <p className="text-sm text-muted-foreground">
          {company ?? "—"} • Posted by {alumnusName}
        </p>
      </div>

      <div className="flex gap-2 justify-end md:items-center">
        {variant === "offer" && (
          <>
            <Button size="sm" onClick={onAccept}>
              Accept
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={onReject}
            >
              Reject
            </Button>
          </>
        )}

        {variant === "application" && (
          <Button
            size="sm"
            variant="destructive"
            onClick={onWithdraw}
          >
            Withdraw
          </Button>
        )}
      </div>
      </div>
    </div>
  );
}
