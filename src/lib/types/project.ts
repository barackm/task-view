export interface Project {
  id: string;
  name: string;
  description?: string;
  updated_at?: string | null;
  created_at: string;
  dates?: {
    from: string;
    to: string;
  };
}
