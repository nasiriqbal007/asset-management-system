import { useEffect, useState } from "react";
import {
  approveRequest,
  getAllRequests,
  getReqByStatus,
  rejectRequest,
} from "../services/request.service";
import type { AssetRequest } from "../types/request";

export const useRequests = () => {
  const [requests, setRequests] = useState<AssetRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const res = await getAllRequests();
        setRequests(res.data.payload);
      } catch {
        console.error("Error fetching requests");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, []);
  const handleRejectRequest = async (id: number) => {
    try {
      await rejectRequest(id);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id),
      );
    } catch (error: any) {
      console.log(error.response?.data);
      console.log(error.response?.status);
      console.error("Error rejecting request:", error);
    }
  };
  const handleApproveRequest = async (id: number) => {
    try {
      await approveRequest(id);
      setRequests((prevRequests) =>
        prevRequests.filter((request) => request.id !== id),
      );
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };
  const fetchReqByStatus = async (status: string) => {
    setIsLoading(true);
    try {
      const res = await getReqByStatus(status);
      setRequests(res.data.payload);
    } catch (error) {
      console.error("Error fetching requests by status:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    requests,
    isLoading,
    handleApproveRequest,
    handleRejectRequest,
    fetchReqByStatus,
  };
};
