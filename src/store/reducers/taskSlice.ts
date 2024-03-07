import { createSlice } from "@reduxjs/toolkit";
import { Board, Columntask, Column } from "../../interfaces/interface";

const initialState: Board[] = [
  {
    id: 0,
    title: "Board 1",
    columns: [
      {
        id: 0,
        columnTitle: "To Do 1",
        cards: [
          {
            id: 0,
            columnTaskTitle: "Task 1",
            content: "Task 1",
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
          const card = { ...newCard, id: nextId }; // Ensure the new card has a unique id
          column.cards.push(card);
        }
      }
    },
    swapColumn: (state, action) => {
      const { parsedBoardId, dragIndex, hoverIndex } = action.payload;
      const board = state.find((board) => board.id === parsedBoardId);

      if (board) {
        const temp = board.columns[dragIndex];
        board.columns[dragIndex] = board.columns[hoverIndex];
        board.columns[hoverIndex] = temp;
      }
    },
    swapCard: (state, action) => {
      const {
        parsedBoardId,
        dragCardIndex,
        hoverCardIndex,
        dragColumnIndex,
        hoverColumnIndex,
      } = action.payload;
    
      // Find the board by ID
      const board = state.find((board) => board.id === parsedBoardId);
    
      if (board) {
        const dragColumn = board.columns.find(
          (column) => column.id === dragColumnIndex
        );
        const hoverColumn = board.columns.find(
          (column) => column.id === hoverColumnIndex
        );
    
        // Ensure both dragColumn and hoverColumn are valid
        if (dragColumn && hoverColumn) {
          // If moving within the same column
          if (dragColumn === hoverColumn && dragCardIndex !== hoverCardIndex) {
            const temp = dragColumn.cards[dragCardIndex];
            dragColumn.cards[dragCardIndex] = dragColumn.cards[hoverCardIndex];
            dragColumn.cards[hoverCardIndex] = temp;
          } 
          // If moving between different columns
          else if (dragColumn !== hoverColumn && dragCardIndex !== hoverCardIndex) {
            const draggedCard = dragColumn.cards[dragCardIndex];
    
            // Handle the case where the dragColumn is empty and hoverCardIndex is undefined
            if (dragColumn.cards.length === 0 && hoverCardIndex === undefined) {
              hoverColumn.cards.splice(0, 0, draggedCard);
            } else {
              dragColumn.cards.splice(dragCardIndex, 1);
              hoverColumn.cards.splice(hoverCardIndex, 0, draggedCard);
            }
          }
        }
      }
    }
,    
    moveCardBetweenColumns: (state, action) => {},
  },
});

export const {
  createBoard,
  deleteBoard,
  addColumnToBoard,
  addCardToColumn,
  swapColumn,
  swapCard,
} = taskSlice.actions;
export default taskSlice.reducer;
