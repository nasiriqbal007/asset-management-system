import { useState, type ChangeEvent } from "react";
import { Table } from "../components/Table";
import { useRequests } from "../hooks/useReq";
import type { AssetRequest } from "../types/request";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Requests = () => {
  const {
    requests,
    isLoading,
    handleApproveRequest,
    handleRejectRequest,
    fetchReqByStatus,
    setPage,
  } = useRequests();

  const columns = [
    { key: "id", label: "ID" },
    { key: "asset_name", label: "Asset Name" },
    { key: "request_reason", label: "Request Reason" },
    { key: "employee_name", label: "Employee Name" },

    { key: "status", label: "Status" },
  ];
  const [actionId, setActionId] = useState<number | null>(null);
  const actions = [
    {
      label: "Approve",
      onClick: (row: AssetRequest) => {
        setActionId(row.id);

        handleApproveRequest(row.id);
        if (actionId === row.id) {
          setActionId(null);
        }
      },

      show: (row: AssetRequest) => row.status === "pending",
    },
    {
      label: "Reject",
      onClick: (row: AssetRequest) => {
        setActionId(row.id);
        handleRejectRequest(row.id);
        if (actionId === row.id) {
          setActionId(null);
        }
      },
      show: (row: AssetRequest) => row.status === "pending",
    },
  ];

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    fetchReqByStatus(event.target.value);
  };

  return (
    <div className="px-2 pt-6 pb-2 bg-(--bg-page)">
      <select
        onChange={handleFilterChange}
        className="input-field mb-4 w-40 hover:cursor-pointer"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      {isLoading && <LoadingSpinner />}
      <Table
        columns={columns}
        data={requests.data}
        pagination={requests.pagination}
        onPageChange={setPage}
        actions={actions}
        submittingId={actionId}
        isLoading={isLoading}
      />
    </div>
  );
};
