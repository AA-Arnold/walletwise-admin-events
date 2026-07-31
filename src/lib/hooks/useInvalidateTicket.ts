import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { validateTicket } from "../api";
import { promiseErrorFunction } from "../helpers/promiseError";
import { ApiErrorResponse } from "../types";

export const useInvalidateTicket = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: validateTicket,
    onSuccess: (data) => {
      toast.success(data?.message || "Ticket invalidated successfully");
      queryClient.invalidateQueries({ queryKey: ["ticket"] });
    },
    onError: (error: ApiErrorResponse) => {
      promiseErrorFunction(error);
    },
  });

  return {
    invalidateTicket: mutate,
    isPending,
  };
};
