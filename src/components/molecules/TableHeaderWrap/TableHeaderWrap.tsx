import { Table, flexRender } from "@tanstack/react-table";

import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableHeaderProps<TData = unknown> {
  table: Table<TData>;
}

const TableHeaderWrap = <TData,>({ table }: TableHeaderProps<TData>) => {
  return (
    <TableHeader>
      {table?.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup?.headers?.map((header) => {
            return (
              <TableHead key={header?.id} className="bg-black/60 text-white/90">
                {header?.isPlaceholder
                  ? null
                  : flexRender(
                      header?.column?.columnDef.header,
                      header?.getContext(),
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default TableHeaderWrap;
