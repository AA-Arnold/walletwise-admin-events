"use client";

import { Loader, TicketCheck } from "lucide-react";

import { useValidateTicket } from "@/lib/hooks/useValidateTicket";

const ValidateTicketForm = () => {
  const { ticketId, handleChange, handleSubmit, isPending } =
    useValidateTicket();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <label className="block space-y-2" htmlFor="ticketId">
        <span className="text-sm font-medium text-[#FFF5E4]">Ticket ID</span>
        <span className="block text-xs text-white/55">
          Enter the ticket ID exactly as it appears on the ticket.
        </span>
        <input
          id="ticketId"
          name="ticketId"
          type="text"
          value={ticketId}
          onChange={handleChange}
          placeholder="e.g. WALL-9916225"
          autoComplete="off"
          autoCapitalize="none"
          className="h-12 w-full rounded-lg border border-white/25 bg-white/10 px-4 text-base text-white outline-none transition placeholder:text-white/40 focus:border-[#f4b06f] focus:ring-2 focus:ring-[#f4b06f]/20"
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 bg-linear-to-br from-[#C8001E] to-[#8B0012] font-cinzel text-xs font-bold tracking-[1px] text-white uppercase transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 md:text-sm md:tracking-[2.7px]"
      >
        {isPending ? (
          <>
            <Loader className="h-5 w-5 animate-spin" />
            Invalidating...
          </>
        ) : (
          <>
            <TicketCheck className="h-5 w-5" />
            Invalidate Ticket
          </>
        )}
      </button>
    </form>
  );
};

export default ValidateTicketForm;
