export interface GeneratedName {
  id: string;
  text: string;
  tuffness: number; // 0-100
}

export enum GenerationStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
