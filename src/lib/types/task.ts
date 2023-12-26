import { Priority } from "./priority";
import { ProjectOwner } from "./project";
import { Workflow } from "./workflow";

export interface Task {
  id: number;
  created_at: string;
  name: string;
  user_id: string;
  team_id: string;
  workflow_id: string;
  description: string;
  priority_id: string;
  project_id: string;
  user: ProjectOwner;
  priority: Priority;
  workflow: Workflow;
}
