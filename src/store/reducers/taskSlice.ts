import { createSlice } from "@reduxjs/toolkit";
import { Board, Columntask, Column} from "../../interfaces/interface";

const initialState: Board[] = [
  {
    id: 1,
    title: "Board 1",
    columns: [
      {
        id: 1,
        columnTitle: "To Do",
        cards: [
          {
            id: 1,
            columnTaskTitle: "xyz",
            content: "xyz",
          },
        ],
      },
    ],
  },
];

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createBoard: (state, action) => {
      const nextId = state.length > 0 ? state[state.length - 1].id + 1 : 1;
      state.push({ id: nextId, ...action.payload });
    },
    deleteBoard: (state) => {},
    addColumnToBoard: (state, action) => {
      const { boardId, columnTitle } = action.payload;
      const board = state.find((board) => board.id === boardId);
      if (board) {
        board.columns.push({
          id: board.columns.length + 1,
          columnTitle,
          cards: [],
        });
      }
    },
    addCardToColumn: (state, action) => {
      const { columnId, newCard } = action.payload;
      const board = state.find((board) =>
        board.columns.some((column) => column.id === columnId)
      );
      if (board) {
        const column = board.columns.find((column) => column.id === columnId);
        if (column) {
          const nextId =
            column.cards.length > 0
              ? column.cards[column.cards.length - 1].id + 1
              : 1;
          const card: Columntask = { ...newCard, id: nextId };
          column.cards.push(card);
        }
      }
    },
  },
});

export const { createBoard, deleteBoard, addColumnToBoard, addCardToColumn } =
  taskSlice.actions;
export default taskSlice.reducer;
