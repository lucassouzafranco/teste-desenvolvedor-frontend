export interface TableData {
  id: string;
  name: string;
  published_at: string;
  company: string;
  active_principles: { id: string; name: string }[];
  documents?: Document[]; // Tornando documents opcional
}

export interface Data {
  id: string;
  name: string;
  published_at: string;
  company: string;
  documents?: Document[]; // Tornando documents opcional
  active_principles: ActivePrinciple[];
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
