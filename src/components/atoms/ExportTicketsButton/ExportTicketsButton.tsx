"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/helpers";
import { Transaction } from "@/lib/types";

interface ExportTicketsButtonProps {
  tickets: Transaction[];
}

const ExportTicketsButton = ({ tickets }: ExportTicketsButtonProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    if (!tickets.length) return;

    setIsExporting(true);

    try {
      const rows = tickets.map((ticket) => ({
        Date: ticket.created_at ? formatDate(ticket.created_at) : "",
        "Full Name": ticket.full_name,
        Email: ticket.email,
        "Phone Number": ticket.phone_number,
        "Ticket ID": ticket.ticket_id,
        "Ticket Type": ticket.ticket_type,
        Quantity: ticket.quantity,
        "Amount Paid": Number(ticket.amount_paid) || 0,
        "Payment Reference": ticket.payment_reference,
        "Payment Status": ticket.payment_status,
      }));

      const worksheet = XLSX.utils.json_to_sheet(rows);
      worksheet["!cols"] = [
        { wch: 20 },
        { wch: 24 },
        { wch: 30 },
        { wch: 18 },
        { wch: 22 },
        { wch: 16 },
        { wch: 10 },
        { wch: 16 },
        { wch: 24 },
        { wch: 16 },
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Tickets");
      XLSX.writeFile(
        workbook,
        `tickets-${new Date().toISOString().slice(0, 10)}.xlsx`,
      );
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleExport}
      disabled={!tickets.length || isExporting}
      className="bg-[#C8001E] text-white hover:bg-[#A60019]"
    >
      <Download className="h-4 w-4" />
      {isExporting ? "Exporting..." : "Export as Excel"}
    </Button>
  );
};

export default ExportTicketsButton;
