export interface Columntask {
    id: number,
    columnTaskTitle: string;
    content: string;
  }
  
export interface Column {
    id: number,
    columnTitle: string;
    cards: Columntask[];
  }
  
export interface Board {
    id: number;
    title: string;
    columns: Column[];
  }

export const ItemTypes = {
    COLUMN: 'column',
    CARD: 'card'
}