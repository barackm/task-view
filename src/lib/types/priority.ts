export enum PriorityType {
  Low = "Low",
  Medium = "Medium",
  High = "High",
  Highest = "Highest",
}

export type Priority = {
  id: string;
  created_at: string;
  name: PriorityType;
};
