"use client";

import { useInvalidateTicket } from "@/lib/hooks/useInvalidateTicket";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface InvalidateTicketButtonProps {
  ticketId: string;
}

const InvalidateTicketButton = ({ ticketId }: InvalidateTicketButtonProps) => {
  const { invalidateTicket, isPending } = useInvalidateTicket();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isPending}
        className="inline-flex h-8 min-w-24 cursor-pointer items-center justify-center rounded-md bg-[#A60018] px-3 text-xs font-semibold text-white transition hover:bg-[#C8001E] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Invalidate
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Invalidate this ticket?</AlertDialogTitle>
          <AlertDialogDescription>
            Ticket <span className="font-semibold text-foreground">{ticketId}</span>{" "}
            will be invalidated. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => invalidateTicket(ticketId)}>
            Yes, invalidate ticket
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default InvalidateTicketButton;
