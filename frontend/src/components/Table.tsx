type TableProps<T> = {
  columns: {
    key: string;
    label: string;
  }[];
  data: T[];
  actions?: {
    label: string;
    onClick: (row: T) => void;
  }[];
};

export const Table = <T,>({ columns, data, actions }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full">
        <thead className="bg-(--bg-card)">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="px-4 py-3 text-left">
                {c.label}
              </th>
            ))}
            {actions && <th className="px-4 py-3">Actions</th>}
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
            data.map((row, index) => (
              <tr key={index} className="border-t">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3">
                    {String(row[c.key as keyof T])}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 flex gap-2">
                    {actions.map((action) => (
                      <button
                        key={action.label}
                        onClick={() => action.onClick(row)}
                        className="text-btn "
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
