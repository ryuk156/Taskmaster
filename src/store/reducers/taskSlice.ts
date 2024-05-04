import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, Columntask, Column, URL } from "../../interfaces/interface";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { debounce } from 'lodash';


export const initialState = {
  boards: [],
  columns: [],
  cards: [],
  loading: false,
  error: null,
  success: false,
};

export const getBoardsAsync = createAsyncThunk(
  "task/getBoardsAsync",
  async (token: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}api/viewboards/`,
        {
          headers: {
            Authorization: `Token ${token.token}`,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error.response);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  }
);

export const getColumnsAsync = createAsyncThunk(
  "task/getColumnsAsync",
  async (token: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${URL}api/viewcolumns/`,
        {
          headers: {
            Authorization: `Token ${token.token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.log(error.response);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  }
);

export const getCardsAsync = createAsyncThunk(
  "task/getCardsAsync",
  async (token: any, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${URL}api/viewcards/`, {
        headers: {
          Authorization: `Token ${token.token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.log(error.response);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  }
);

export const createBoardAsync = createAsyncThunk(
  "task/createBoardAsync",
  async (boardData: { name: string; token: any }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Token ${boardData.token.token}`,
        },
      };
      const requestData = { name: boardData.name }; // Properly format request data
      const response = await axios.post(
        `${URL}boards/`, // Ensure URL variable is defined and contains the correct base URL
        requestData, // Send formatted request data
        config
      );

      return response.data;
    } catch (error: any) {
      console.error("Axios error:", error.message);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  }
);

export const createColumnAsync = createAsyncThunk(
  "task/createColumnAsync",
  async (
    columnData: { name: string; token: any; board: any },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Token ${columnData.token.token}`,
        },
      };
      const requestData = { name: columnData.name }; // Properly format request data
      const response = await axios.post(
        `${URL}boards/${parseInt(columnData.board)}/createcolumn/`, // Ensure URL variable is defined and contains the correct base URL
        requestData, // Send formatted request data
        config
      );

      return response.data;
    } catch (error: any) {
      console.error("Axios error:", error.message);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  }
);

export const createCardAsync = createAsyncThunk(
  "task/createCardAsync",
  async (
    cardData: { name: string; token: any; column: any; content: any },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Token ${cardData.token.token}`,
        },
      };
      const requestData = { name: cardData.name, content: cardData.content }; // Properly format request data
      const response = await axios.post(
        `${URL}columns/${parseInt(cardData.column)}/createcard/`, // Ensure URL variable is defined and contains the correct base URL
        requestData, // Send formatted request data
        config
      );

      return response.data;
    } catch (error: any) {
      console.error("Axios error:", error.message);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  }
);

export const updateCardAsync = createAsyncThunk(
  "task/updateCardAsync",
  async (
    cardData: { token: any; card: any; content: any; name: any; column: any },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Token ${cardData.token.token}`,
        },
      };
      const requestData = {
        content: cardData.content,
        name: cardData.name,
        column: cardData.column,
      }; // Properly format request data
      const response = await axios.put(
        `${URL}updatecard/${parseInt(cardData.card)}/`, // Ensure URL variable is defined and contains the correct base URL
        requestData, // Send formatted request data
        config
      );

      return response.data;
    } catch (error: any) {
      console.error("Axios error:", error.message);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  }
);

export const swapCardAsync = createAsyncThunk(
    "task/swapCardAsync",
    async (
      { card_1, card_2, token }: { card_1: any; card_2: any; token: any },
      { rejectWithValue }
    ) => {
      try {
        const config = {
          headers: {
            Authorization: `Token ${token.token}`,
          },
        };
        const requestData = { card_1, card_2 }; // Properly format request data
        const response = await axios.put(
          `${URL}swapcard/`,
          requestData,
          config
        );
  
        return requestData;
      } catch (error: any) {
        console.error("Axios error:", error.message);
        return rejectWithValue({
          status: error.response.status,
          data: error.response.data,
        });
      }
    }
  );
  

export const deleteCardAsync = createAsyncThunk(
  "task/deleteCardAsync",
  async (cardData: { token: any; cardid: any }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          Authorization: `Token ${cardData.token.token}`,
        },
      };
      // Properly format request data
      const response = await axios.delete(
        `${URL}deletecard/${parseInt(cardData.cardid)}/`,
         // Ensure URL variable is defined and contains the correct base URL
        config
      );

      return cardData.cardid;;
    } catch (error: any) {
      console.error("Axios error:", error.response.data);
      return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
    }
  }
);


const debounceSwapCards = debounce(async (dispatch, { card_1, card_2 , token }) => {
    try {
      // Dispatch the swapCardAsync action with the payload
      await dispatch(swapCardAsync({
          card_1, card_2,
          token:  token 
      }));
    } catch (error) {
      console.error("Error swapping cards:", error);
    }
  }, 200); // Adjust the delay as needed
  
  export const swapCardDebounced = (payload:any) => (dispatch: any) => {
    debounceSwapCards(dispatch, payload);
  };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    //   deleteBoard: (state) => {},
    //   addColumnToBoard: (state, action) => {
    //     const { boardId, columnTitle } = action.payload;
    //     const board = state.find((board) => board.id === boardId);
    //     if (board) {
    //       board.columns.push({
    //         id: board.columns.length + 1,
    //         columnTitle,
    //         cards: [],
    //       });
    //     }
    //   },
    //   addCardToColumn: (state, action) => {
    //     const { columnId, newCard } = action.payload;
    //     const board = state.find((board) =>
    //       board.columns.some((column) => column.id === columnId)
    //     );
    //     if (board) {
    //       const column = board.columns.find((column) => column.id === columnId);
    //       if (column) {
    //         const nextId =
    //           column.cards.length > 0
    //             ? column.cards[column.cards.length - 1].id + 1
    //             : 1;
    //         const card = { ...newCard, id: nextId }; // Ensure the new card has a unique id
    //         column.cards.push(card);
    //       }
    //     }
    //   },
    //   swapColumn: (state, action) => {
    //     const { parsedBoardId, dragIndex, hoverIndex } = action.payload;
    //     const board = state.find((board) => board.id === parsedBoardId);
    //     if (board) {
    //        let temp = board.columns[dragIndex];
    //         board.columns[dragIndex] = board.columns[hoverIndex];
    //         board.columns[hoverIndex] = temp;
    //     }
    //   },
    //   swapCard: (state, action) => {
    //     const {
    //       parsedBoardId,
    //       dragCardIndex,
    //       hoverCardIndex,
    //       dragColumnIndex,
    //       hoverColumnIndex,
    //     } = action.payload;
    //     // Find the board by ID
    //     const board = state.find((board) => board.id === parsedBoardId);
    //     if (board) {
    //       const dragColumn = board.columns.find(
    //         (column) => column.id === dragColumnIndex
    //       );
    //       // const hoverColumn = board.columns.find(
    //       //   (column) => column.id === hoverColumnIndex
    //       // );
    //       // Ensure dragColumn is valid
    //       if (dragColumn) {
    //         // If moving within the same column
    //         if (dragColumn === dragColumn && dragCardIndex !== hoverCardIndex) {
    //           const temp = dragColumn.cards[dragCardIndex];
    //           dragColumn.cards[dragCardIndex] = dragColumn.cards[hoverCardIndex];
    //           dragColumn.cards[hoverCardIndex] = temp;
    //         }
    //         // If moving between different columns
    //         // else if (
    //         //   dragColumn !== hoverColumn &&
    //         //   dragCardIndex !== hoverCardIndex
    //         // ) {
    //         //   const draggedCard = dragColumn.cards[dragCardIndex];
    //         //   // Handle the case where the dragColumn is empty and hoverCardIndex is undefined
    //         //   if (dragColumn.cards.length === 0 && hoverCardIndex === undefined) {
    //         //     hoverColumn.cards.splice(0, 0, draggedCard);
    //         //   } else {
    //         //     dragColumn.cards.splice(dragCardIndex, 1);
    //         //     hoverColumn.cards.splice(hoverCardIndex, 0, draggedCard);
    //         //   }
    //         // }
    //       }
    //     }
    //   },
    //   moveCardBetweenColumns: (state, action) => {},

    // swapcards: (state, action: PayloadAction<any>) => {

    //     const dragColumn = state.columns.find((column: any) => column.id === dragColumnIndex);
    //     const hoverColumn = state.columns.find((column: any) => column.id === hoverColumnIndex);
    //     if (dragColumn && hoverColumn) {
    //         const dragCard = state.cards[dragCardIndex];
    //         state.cards.splice(dragCardIndex, 1);
    //         state.cards.splice(hoverCardIndex, 0, dragCard);
    // }
    swapCard: (state, action: PayloadAction<any>) => {
      const {
        dragColumnIndex,
        hoverColumnIndex,
        dragCardIndex,
        hoverCardIndex,
      } = action.payload;
      // const dragColumn = state.columns.find((column: any) => column.id === dragColumnIndex);
      // const hoverColumn = state.columns.find((column: any) => column.id === hoverColumnIndex);
      if (dragCardIndex !== hoverCardIndex) {
        // const temp = dragColumn.cards[dragCardIndex];
        //  dragColumn.cards[dragCardIndex] = dragColumn.cards[hoverCardIndex];
        //  dragColumn.cards[hoverCardIndex] = temp;

        const temp = state.cards[dragCardIndex];
        state.cards[dragCardIndex] = state.cards[hoverCardIndex];
        state.cards[hoverCardIndex] = temp;
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createBoardAsync.pending, (state: any, action) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(createBoardAsync.fulfilled, (state: any, action) => {
  //       state.loading = false;
  //       // Assuming action.payload is a single board object
  //       return [...state, action.payload]; // Return a new array with the new board added
  //     })
  //     .addCase(createBoardAsync.rejected, (state: any, action: any) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getBoardsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getBoardsAsync.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getBoardsAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getColumnsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getColumnsAsync.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getColumnsAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCardsAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getCardsAsync.fulfilled, (state, action) => {
        state.cards = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getCardsAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createBoardAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createBoardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.boards = [...state.boards, action.payload] as typeof state.boards;
      })
      .addCase(createBoardAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createColumnAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createColumnAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.columns = [
          ...state.columns,
          action.payload,
        ] as typeof state.columns;
      })
      .addCase(createColumnAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCardAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createCardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cards = [...state.cards, action.payload] as typeof state.cards;
        state.success = true;
      })
      .addCase(createCardAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCardAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateCardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedcard = action.payload;
        const index = state.cards.findIndex(
          (card: any) => card.id === updatedcard.id
        );
        if (index !== -1) {
          state.cards[index] = updatedcard as (typeof state.cards)[number];
        } else {
          state.cards.push(updatedcard as (typeof state.cards)[number]);
        }
        state.success = true;
      })
      .addCase(updateCardAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(deleteCardAsync.pending, (state, action) => {
        state.loading = true;
      }).addCase(deleteCardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cards = state.cards.filter((card:any) => card.id !== action.payload);
        state.success = true;
      }).addCase(deleteCardAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;

      })
      
      .addCase(swapCardAsync.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(swapCardAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const { card_1, card_2 } = action.payload;
        
        const card1Index = state.cards.findIndex((card: any) => card.id === card_1);
        const card2Index = state.cards.findIndex((card: any) => card.id === card_2);
        if (card1Index !== -1 && card2Index !== -1) {
          const temp = state.cards[card1Index];
          state.cards[card1Index] = state.cards[card2Index];
          state.cards[card2Index] = temp;
        }

       state.success = true;
       
 
      })
      .addCase(swapCardAsync.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { swapCard } = taskSlice.actions;

export default taskSlice.reducer;
