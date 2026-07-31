import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";

const getPositiveNumber = (value: string | null, fallback: number) => {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
};

export const useTableState = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = getPositiveNumber(searchParams.get("page"), 1);
  const limit = getPositiveNumber(searchParams.get("limit"), 10);
  const submittedQuery = searchParams.get("search") || null;
  const ticketType = searchParams.get("ticket_type") || "";
  const [search, setSearch] = useState(submittedQuery || "");

  useEffect(() => {
    setSearch(submittedQuery || "");
  }, [submittedQuery]);

  const updateSearchParams = useCallback(
    (updates: Record<string, string | number | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") params.delete(key);
        else params.set(key, String(value));
      });

      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (!searchParams.has("page") || !searchParams.has("limit")) {
      updateSearchParams({ page: currentPage, limit });
    }
  }, [currentPage, limit, searchParams, updateSearchParams]);

  const setCurrentPage = (page: number) => {
    updateSearchParams({ page });
  };

  const nextPage = (totalPages: number) => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToLastPage = (totalPages: number) => setCurrentPage(totalPages);
  const goToFirstPage = () => setCurrentPage(1);
  const isLastPage = (totalPages: number) => currentPage >= totalPages;
  const isFirstPage = () => currentPage === 1;

  const handleSearchChange = (value: string) => setSearch(value);

  const handleClear = () => {
    setSearch("");
    updateSearchParams({ page: 1, search: null });
  };

  const handleSearch = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    updateSearchParams({ page: 1, search: search.trim() || null });
  };

  const handleLimitChange = (newLimit: number) => {
    updateSearchParams({ page: 1, limit: newLimit });
  };

  const setTicketType = (newTicketType: string) => {
    updateSearchParams({ page: 1, ticket_type: newTicketType || null });
  };

  return {
    currentPage,
    limit,
    setLimit: handleLimitChange,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    isFirstPage,
    isLastPage,
    search,
    handleSearchChange,
    handleClear,
    submittedQuery,
    handleSearch,
    setCurrentPage,
    ticketType,
    setTicketType,
  };
};
