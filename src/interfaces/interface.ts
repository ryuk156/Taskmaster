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
    loading: boolean,
    error: any,
  }

export const ItemTypes = {
    COLUMN: 'column',
    CARD: 'card'
}

export interface LoginCredentials {
  username: string;
  password: string;
}


export const URL= 'https://taskmaster-coral.vercel.app/api/'