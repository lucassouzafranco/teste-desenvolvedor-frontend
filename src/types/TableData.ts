export interface TableData {
  id: string;
  name: string;
  published_at: string;
  company: string;
  active_principles: { id: string; name: string }[];
}

export interface Document {
  id: string;
  expedient: string;
  type: string;
  url: string;
}

export interface ActivePrinciple {
  id: string;
  name: string;
}
