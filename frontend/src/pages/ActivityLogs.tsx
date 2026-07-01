import { Table } from "../components/Table";
import { useActivity } from "../hooks/useActivity";

export const ActivityLogs = () => {
  const { loading, activityLogs } = useActivity();
  const columns = [
    { key: "id", label: "ID" },
    { key: "user_id", label: "User ID" },
    { key: "name", label: "Asset Name" },
    { key: "action", label: "Action" },
    { key: "entity_type", label: "Entity Type" },

    { key: "created_at", label: "Created At" },
  ];
  return (
    <div className="px-2 bg-(--bg-page)">
      {loading && (
        <p className="flex items-center justify-center">Loading...</p>
      )}

      <Table columns={columns} data={activityLogs} />
    </div>
  );
};
