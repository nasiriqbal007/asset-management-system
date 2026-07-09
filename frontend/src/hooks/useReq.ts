import { useEffect, useState } from "react";
import {
  approveRequest,
  getAllRequests,
  getReqByStatus,
  rejectRequest,
} from "../services/request.service";
import type { AssetRequest } from "../types/request";
import { handleError } from "../utils/handleError";
import type { PaginatedResponse } from "../types/pagination";
import toast from "react-hot-toast";
import axios from "axios";

export const useRequests = () => {
  const [requests, setRequests] = useState<PaginatedResponse<AssetRequest>>({
    data: [],
    pagination: {
      page: 1,
      totalPages: 1,
      limit: 10,
      total: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const res = status
          ? await getReqByStatus(status, {
              page,
              limit: requests.pagination.limit,
            })
          : await getAllRequests({ page, limit: requests.pagination.limit });
        setRequests(res.data.payload);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setRequests((prev) => ({
            ...prev,
            data: [],
            pagination: { ...prev.pagination, total: 0, totalPages: 1 },
          }));
        } else {
          handleError(error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [page, requests.pagination.limit, status]);

  const handleRejectRequest = async (id: number) => {
    try {
      await rejectRequest(id);
      setRequests((prev) => ({
        ...prev,
        data: prev.data.filter((request) => request.id !== id),
      }));
      toast.success("Request rejected successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const handleApproveRequest = async (id: number) => {
    try {
      await approveRequest(id);
      setRequests((prev) => ({
        ...prev,
        data: prev.data.filter((request) => request.id !== id),
      }));
      toast.success("Request approved successfully");
    } catch (error) {
      handleError(error);
    }
  };

  const fetchReqByStatus = (newStatus: string) => {
    setStatus(newStatus);
    setPage(1);
  };

  return {
    requests,
    isLoading,
    page,
    setPage,
    handleApproveRequest,
    handleRejectRequest,
    fetchReqByStatus,
  };
};
