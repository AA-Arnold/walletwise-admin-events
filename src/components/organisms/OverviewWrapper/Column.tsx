import { ArrowUpDown } from "lucide-react";
import { CellContext, createColumnHelper } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import InvalidateTicketButton from "@/components/atoms/InvalidateTicketButton/InvalidateTicketButton";

import { Transaction } from "@/lib/types";
import { formatDate, numberWithCommas } from "@/lib/helpers";

const columnHelper = createColumnHelper<Transaction>();

export const Column = [
  columnHelper.accessor("created_at", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: string = row.getValue("created_at");
      const formatted = date ? formatDate(date) : "";
      return <div className=" whitespace-nowrap">{formatted}</div>;
    },
  }),
  columnHelper.accessor("full_name", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Full name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: CellContext<Transaction, unknown>) => {
      const user = row.original;
      return <div>{user.full_name}</div>;
    },
  }),
  columnHelper.accessor("email", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: CellContext<Transaction, unknown>) => {
      const user = row.original;

      return <div>{user.email}</div>;
    },
  }),
  columnHelper.accessor("phone_number", {
    header: () => <span>Phone Number</span>,
    cell: ({ getValue }) => {
      const phoneNumber = getValue();
      return (
        <div>
          <span className="">{phoneNumber}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("ticket_id", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ticket ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: CellContext<Transaction, unknown>) => {
      const user = row.original;

      return <div>{user.ticket_id}</div>;
    },
  }),
  columnHelper.accessor("ticket_type", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ticket Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: CellContext<Transaction, unknown>) => {
      const user = row.original;

      return <div>{user.ticket_type}</div>;
    },
  }),
  columnHelper.accessor("quantity", {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }: CellContext<Transaction, unknown>) => {
      const user = row.original;

      return <div>{user.quantity}</div>;
    },
  }),
  columnHelper.accessor("amount_paid", {
    header: () => <span className="">Amount Paid</span>,
    cell: ({ getValue }) => {
      const amount = getValue();
      return (
        <div>
          <span className="">
            ₦{amount && numberWithCommas(Number(amount))}
          </span>
        </div>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: () => <span>Action</span>,
    cell: ({ row }) => (
      <InvalidateTicketButton ticketId={row.original.ticket_id} />
    ),
  }),
];
