import { ColumnDef, Table, flexRender } from "@tanstack/react-table";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface TableBodyWrapProps<TData = unknown> {
  table: Table<TData>;
  columns: ColumnDef<TData>[];
}

const TableBodyWrap = <TData,>({
  table,
  columns,
}: TableBodyWrapProps<TData>) => {
  if (!table) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={columns?.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  const rowModel = table?.getRowModel();

  return (
    <TableBody>
      {rowModel?.rows?.length < 1 ? (
        <TableRow>
          <TableCell
            colSpan={columns?.length}
            className="h-24 text-center text-white/50"
          >
            No results.
          </TableCell>
        </TableRow>
      ) : (
        rowModel?.rows.map((row) => (
          <TableRow
            key={row?.id}
            data-state={row.getIsSelected() && "selected"}
            className={
              row.getIsSelected()
                ? "bg-black/20"
                : "bg-black/40 hover:bg-black/20"
            }
          >
            {row?.getVisibleCells().map((cell) => (
              <TableCell
                key={cell.id}
                className="max-w-lg whitespace-normal text-white/70"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      )}
    </TableBody>
  );
};

export default TableBodyWrap;
