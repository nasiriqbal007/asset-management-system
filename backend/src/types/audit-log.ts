export type AuditLog = {
  id: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: number | null;
  description?: string;
};

export type CreateAuditLogInput = {
  user_id: number;
  action: string;
  entity_type: string;
  entity_id: number | null;
  description?: string;
};
