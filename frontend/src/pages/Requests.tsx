import type { ChangeEvent } from "react";
import { Table } from "../components/Table";
import { useRequests } from "../hooks/useReq";
import type { AssetRequest } from "../types/request";

export const Requests = () => {
  const {
    requests,
    isLoading,
    handleApproveRequest,
    handleRejectRequest,
    fetchReqByStatus,
  } = useRequests();

  const columns = [
    { key: "id", label: "ID" },
    { key: "asset_name", label: "Asset Name" },
    { key: "request_reason", label: "Request Reason" },
    { key: "employee_name", label: "Employee Name" },
    { key: "status", label: "Status" },
  ];

  const actions = [
    {
      label: "Approve",
      onClick: (row: AssetRequest) => handleApproveRequest(row.id),
      show: (row: AssetRequest) => row.status === "pending",
    },
    {
      label: "Reject",
      onClick: (row: AssetRequest) => handleRejectRequest(row.id),
      show: (row: AssetRequest) => row.status === "pending",
    },
  ];

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    fetchReqByStatus(event.target.value);
  };

  return (
    <div className="px-2 py-2 bg-(--bg-page)">
      <select
        onChange={handleFilterChange}
        className="input-field mb-4 w-40 hover:cursor-pointer"
      >
        <option value="">All</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      {isLoading && (
        <p className="flex items-center justify-center">Loading...</p>
      )}

      <Table columns={columns} data={requests} actions={actions} />
    </div>
  );
};
