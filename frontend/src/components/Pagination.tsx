import type { Pagination as PaginationType } from "../types/pagination";

type PaginationProps = {
  pagination: PaginationType;
  onPageChange: (newPage: number) => void;
  className?: string;
};

export const Pagination = ({ pagination, onPageChange, className = "" }: PaginationProps) => {
  return (
    <div className={`flex items-center justify-between px-4 py-3 ${className}`}>
      <div className="text-sm text-(--text-secondary)">
        Showing Page <strong>{pagination.page}</strong> of{" "}
        <strong>{pagination.totalPages}</strong> ({pagination.total} total items)
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => onPageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
          className="px-3 py-1 text-sm rounded border bg-(--bg-card) hover:bg-(--primary-light) disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Previous
        </button>

        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
          (p) => (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`px-3 py-1 text-sm rounded cursor-pointer ${
                pagination.page === p
                  ? "bg-(--primary) text-white font-semibold"
                  : "border bg-(--bg-card) hover:bg-(--primary-light)"
              }`}
            >
              {p}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.totalPages}
          className="px-3 py-1 text-sm rounded border bg-(--bg-card) hover:bg-(--primary-light) disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};
