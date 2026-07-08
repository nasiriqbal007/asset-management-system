type TableProps<T extends { id: number | string }> = {
  columns: {
    key: string;
    label: string;
  }[];
  data: T[];
  actions?: {
    label: string;
    onClick: (row: T) => void;
    show?: (row: T) => boolean;
  }[];
  pagination?: {
    page: number;
    totalPages: number;
    limit: number;
    total: number;
  };
  isLoading?: boolean;
  onPageChange?: (newPage: number) => void;
  className?: string;
  submittingId?: number | string | null;
};

import { Pagination } from "./Pagination";

export const Table = <T extends { id: number | string }>({
  columns,
  data,
  actions,
  pagination,
  onPageChange,
  className = "max-h-[calc(100vh-250px)]",
  isLoading,
  submittingId,
}: TableProps<T>) => {
  return (
    <div className="w-full min-w-0 rounded-lg border bg-(--bg-card) overflow-hidden flex flex-col">
      <div className={`overflow-x-auto overflow-y-auto ${className}`}>
        <table className="w-full">
          <thead className="bg-(--bg-card)">
            <tr>
              {columns.map((c) => (
                <th
                  key={c.key}
                  className="px-4 py-3 text-left sticky top-0 bg-(--bg-card) z-1"
                >
                  {c.label}
                </th>
              ))}
              {actions && (
                <th className="px-4 py-3 sticky top-0 bg-(--bg-card) z-1">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {(data?.length ?? 0) === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-4 py-3 text-center"
                >
                  No data available
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="border-t">
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3">
                      {String(row[c.key as keyof T])}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-3 flex gap-2">
                      {actions
                        .filter((action) => !action.show || action.show(row))
                        .map((action) => {
                          const isThisRow = submittingId === row.id;
                          return (
                            <button
                              disabled={isLoading || isThisRow}
                              key={action.label}
                              onClick={() => action.onClick(row)}
                              className={`text-btn ${isThisRow ? "text-gray-400 cursor-not-allowed opacity-50" : ""}?`}
                            >
                              {isThisRow ? "Processing..." : action.label}
                            </button>
                          );
                        })}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && onPageChange && (
        <Pagination
          pagination={pagination}
          onPageChange={onPageChange}
          className="border-t bg-(--bg-page)"
        />
      )}
    </div>
  );
};
