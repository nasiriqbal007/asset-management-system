import { LoadingSpinner } from "../components/LoadingSpinner";
import { Table } from "../components/Table";
import { useActivity } from "../hooks/useActivity";

export const ActivityLogs = () => {
  const { loading, activityLogs, setPage } = useActivity();
  const columns = [
    { key: "id", label: "ID" },
    { key: "user_id", label: "User ID" },
    { key: "name", label: "Asset Name" },
    { key: "action", label: "Action" },
    { key: "entity_type", label: "Entity Type" },

    { key: "created_at", label: "Created At" },
  ];
  return (
    <div className="px-2 pt-6 bg-(--bg-page)">
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <LoadingSpinner />
        </div>
      )}

      <Table
        columns={columns}
        data={activityLogs.data}
        pagination={activityLogs.pagination}
        onPageChange={setPage}
      />
    </div>
  );
};
