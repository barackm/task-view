import { Team } from "./teams";

export interface Project {
  id: string;
  name: string;
  description?: string;
  updated_at?: string | null;
  created_at: string;
  team_id: string;
  dates?: {
    from: string;
    to: string;
  };
  user: ProjectOwner;
  team: Team;
}

export type ProjectOwner = {
  id: string;
  updated_at: string | null;
  full_name: string;
  avatar_url: string | null;
  website: string | null;
};
