export interface Workflow {
  created_at: string;
  description: string | null;
  enabled: boolean;
  id: string;
  is_last: boolean;
  name: string;
  position: number;
}
