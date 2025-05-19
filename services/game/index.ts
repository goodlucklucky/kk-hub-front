export interface IMainGame {
  id: string;
  name: string;
  key: string;
  status: string;
  description: string;
  details: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}
