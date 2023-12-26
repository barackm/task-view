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
  user: ProjectOwner;
}

type ProjectOwner = {
  id: string;
  updated_at: string | null;
  full_name: string;
  avatar_url: string | null;
  website: string | null;
};
