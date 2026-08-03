"use client";

import Container from "@/components/atoms/Container/Container";

import { useGetSoldTickets } from "@/lib/hooks/useGetSoldTickets";
import TableWrapper from "../TableWrapper/TableWrapper";
import { ColumnDef } from "@tanstack/react-table";
import { Column } from "./Column";
import { useGetTicketSummary } from "@/lib/hooks/useGetTicketSummary";
import SummaryWrapper from "@/components/molecules/SummaryWrapper/SummaryWrapper";
import { useLogout } from "@/lib/hooks/useLogout";
import { Transaction } from "@/lib/types";

const OverviewWrapper = () => {
  const { handleLogout, isPending } = useLogout();
  const { data: summary, isFetching } = useGetTicketSummary();
  const {
    data,
    isLoading,
    refetch,
    currentPage,
    limit,
    setLimit,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    isFirstPage,
    isLastPage,
    search,
    handleSearchChange,
    handleClear,
    handleSearch,
    setTicketType,
    setCurrentPage,
  } = useGetSoldTickets();

  const typedColumns = Column as ColumnDef<Transaction>[];

  return (
    <div className="min-h-screen relative overflow-hidden bg-[linear-gradient(180deg,#615853_0%,#6B615A_21.74%,#857772_37.98%,#7E706B_75%,#1E1C18_100%)]">
      <Container>
        <div className="py-16 space-y-8">
          <div className="flex justify-between flex-wrap gap-10">
            <div className="">
              <h1 className="text-3xl font-bold text-white/80 font-cinzel">
                Overview
              </h1>
              <p className="sm:text-lg text-sm text-white/60 mt-2 max-w-2xl w-full font-cinzel_decorative">
                Get insights into your event&apos;s performance with our
                comprehensive overview dashboard. Track ticket sales, revenue,
                and attendee demographics in real-time, all in one place.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-32 rounded-md h-12 bg-linear-to-br from-[#C8001E] to-[#8B0012] flex justify-center items-center font-bold text-xs text-center uppercase text-white font-cinzel cursor-pointer"
            >
              {isPending ? "Logging out..." : "Logout"}
            </button>
          </div>

          <div className="">
            <SummaryWrapper
              loading={isFetching}
              totalRevenue={summary?.total_revenue}
              totalTickets={summary?.total_tickets_sold}
              vipSold={summary?.breakdown_by_ticket_type?.VIP?.count}
              regularSold={summary?.breakdown_by_ticket_type?.REGULAR?.count}
              table6={summary?.breakdown_by_ticket_type?.TABLE_6?.count}
              table8={summary?.breakdown_by_ticket_type?.TABLE_8?.count}
              table10={summary?.breakdown_by_ticket_type?.TABLE_10?.count}
              seatTable={summary?.breakdown_by_ticket_type?.SEAT_TABLE?.count}
              onClick={setTicketType}
            />
          </div>
          <TableWrapper
            columns={typedColumns}
            data={data?.registrations || []}
            totalPages={data?.pagination?.totalPages}
            currentPage={currentPage}
            prevPage={prevPage}
            nextPage={nextPage}
            goToFirstPage={goToFirstPage}
            goToLastPage={goToLastPage}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            limit={limit}
            setLimit={setLimit}
            refetch={refetch}
            search={search}
            handleChange={handleSearchChange}
            handleClear={handleClear}
            onSubmit={handleSearch}
            setCurrentPage={setCurrentPage}
            isLoading={isLoading}
          />
        </div>
      </Container>
    </div>
  );
};

export default OverviewWrapper;
