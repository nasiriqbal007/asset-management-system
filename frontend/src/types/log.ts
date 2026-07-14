export type LogEntry = {
  id: number;
  user_id: number;
  name: string;
  action: string;
  entity_type: string;
  entity_id?: number;
  desc: string;
  created_at?: string;
};
