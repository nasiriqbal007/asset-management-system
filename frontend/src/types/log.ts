export type LogEntry = {
  id: number;
  user_id: number;
  action: string;
  entity_type: string;
  entity_id?: number;
  created_at?: string;
};
