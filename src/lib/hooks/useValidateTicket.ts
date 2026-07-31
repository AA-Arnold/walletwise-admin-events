import { FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { validateTicket } from "../api";
import { promiseErrorFunction } from "../helpers/promiseError";
import { ApiErrorResponse } from "../types";

export const useValidateTicket = () => {
  const [ticketId, setTicketId] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: validateTicket,
    onSuccess: (data) => {
      toast.success(data?.message || "Ticket invalidated successfully");
      setTicketId("");
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTicketId(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTicketId = ticketId.trim();
    if (!normalizedTicketId) {
      toast.error("Ticket ID is required");
      return;
    }

    mutate(normalizedTicketId);
  };

  return {
    ticketId,
    handleChange,
    handleSubmit,
    isPending,
  };
};
