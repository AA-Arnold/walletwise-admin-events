import { SyntheticEvent } from "react";

import { Table } from "@tanstack/react-table";

import ColumnSorting from "@/components/atoms/ColumnSorting/ColumnSorting";
import ExportTicketsButton from "@/components/atoms/ExportTicketsButton/ExportTicketsButton";
import SearchInput from "../SearchInput/SearchInput";
import { Transaction } from "@/lib/types";

interface TableResourceToolbarProps {
  search: string;
  handleChange: (search: string) => void;
  handleClear: () => void;
  onSubmit: (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
  table: Table<Transaction>;
  tickets: Transaction[];
}

const TableResourceToolbar = ({
  search,
  handleChange,
  handleClear,
  onSubmit,
  table,
  tickets,
}: TableResourceToolbarProps) => {
  return (
    <div className="flex justify-between items-center w-full gap-6">
      <SearchInput
        value={search}
        handleChange={handleChange}
        handleClear={handleClear}
        onSubmit={onSubmit}
      />
      <div className="flex items-center gap-3">
        <ExportTicketsButton tickets={tickets} />
        <ColumnSorting table={table} />
      </div>
    </div>
  );
};

export default TableResourceToolbar;
