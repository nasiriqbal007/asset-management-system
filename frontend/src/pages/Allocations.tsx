import { LoadingSpinner } from "../components/LoadingSpinner";
import { Table } from "../components/Table";
import { useAllocation } from "../hooks/useAllocation";

export const Allocations = () => {
  const { loading, allocations } = useAllocation();
  const columns = [
    { key: "id", label: "ID" },
    { key: "asset_name", label: "Asset Name" },
    { key: "employee_name", label: "Employee Name" },
    { key: "allocated_date", label: "Allocated Date" },
    { key: "returned_date", label: "Return Date" },
  ];
  return (
    <div className="px-2 bg-(--bg-page)">
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      )}

      <Table columns={columns} data={allocations} />
    </div>
  );
};
