import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Flex } from "@chakra-ui/react";

import CreateBoardColumn from "./CreateBoardColumn";
import CreateCardModal from "./CreateCardModal";
import Column from "./Column";
import Card from "./Card";
import CircleLoader from "./CircleLoader";

import {
  deleteCardAsync,
  getCardsAsync,
  getColumnsAsync,
  swapCard,
  swapCardAsync,
  swapCardDebounced,
} from "../store/reducers/taskSlice";
import ErrorAlert from "./ErrorAlert";
import VanishableAlert from "./VanishableAlert";

function SingleBoardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenColumn, setIsOpenColumn] = useState(false);
  const [columnId, setColumnId] = useState<number>(0);
  const [moveCardLoading, setMoveCardLoading] = useState(false); // New state for move card loading
  const error = useSelector((state: any) => state.task.error);

  const dispatch = useDispatch<any>(); // Redux dispatch function
  const columns = useSelector((state: any) => state.task.columns);
  const token = useSelector((state: any) => state.auth.token);
  const loading = useSelector((state: any) => state.task.loading);
  const cards = useSelector((state: any) => state.task.cards);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback((columnId: number) => {
    setIsOpen(true);
    setColumnId(columnId);
  }, []);

  const onCloseColumn = useCallback(() => setIsOpenColumn(false), []);
  const onOpenColumn = useCallback(() => setIsOpenColumn(true), []);

  const { boardId } = useParams();
  const parsedBoardId = boardId ? parseInt(boardId) : undefined;

  const moveColumn = (dragIndex: number, hoverIndex: number) => {
    //dispatch(swapColumn({ parsedBoardId, dragIndex, hoverIndex }));
  };

  const board = useSelector((state: any) =>
    state.task.boards.find((task: any) => task.id === parsedBoardId)
  );

  const filteredColumns = columns.filter(
    (column: any) => column.board === parsedBoardId
  );
  const statecards = useSelector((state: any) => state.task.cards);

  useEffect(() => {
    dispatch(getColumnsAsync(token));
    dispatch(getCardsAsync(token));
  }, [dispatch, token, parsedBoardId]);

  const moveCard = async (
    dragColumnIndex: number,
    hoverColumnIndex: number,
    dragCardIndex: number,
    hoverCardIndex: number
  ) => {
    const dragcard = statecards[dragCardIndex]?.id;
    const hovercard = statecards[hoverCardIndex]?.id;
    console.log(dragcard, hovercard, "drag and hover card");

    try {
      // Set move card loading state to true before dispatching the action
    setMoveCardLoading(true);
      // Dispatch the asynchronous action to swap cards
; // Pass an empty object as an argument
dispatch(swapCardDebounced({ card_1: dragcard, card_2: hovercard ,token: token}));
      // Assuming that the Redux store is updated correctly, no need to update state here.
    } catch (error) {
      console.error("Error swapping cards:", error);
    } finally {
      // Reset move card loading state to false after the action is completed
      setMoveCardLoading(false);
    }
  };

  if (!board) {
    return <div>Board not found!</div>;
  }

  // if (loading) {
  //   return <CircleLoader text="Loading" />;
  // }

  const handleDelete = (cardId: number) => {
    dispatch(deleteCardAsync({ token, cardid: cardId }));
  };

  return (
    <Box m={2}>

      {loading && <VanishableAlert message="loading" />}
     
      {error && <ErrorAlert error={error.data.message} status="error" />}
      <Flex justifyContent={"space-between"}>
        <Box m={1} ml={3} mb={0} fontSize={"25px"} fontWeight={"bold"}>
          {board.name}
        </Box>

        <Button
          variant={"solid"}
          m={2}
          size={"sm"}
          width={"150px"}
          height={"50px"}
          onClick={onOpenColumn}
          colorScheme={"blue"}
        >
          + Add column
        </Button>
      </Flex>
      <CreateBoardColumn
        boardId={board.id}
        isOpen={isOpenColumn}
        onClose={onCloseColumn}
      />

      <Box
        display="flex"
        alignItems="flex-start" // Align task elements at the top
        justifyContent="flex-start" // Space evenly between task elements
        overflow={"scroll"}
        width={"100%"}
      >
        {filteredColumns && filteredColumns.length !== 0 ? (
          filteredColumns.map((column: any, colIndex: number) => {
            return (
              <Column
                key={colIndex}
                column={column}
                index={colIndex} // Pass the index
                moveColumn={moveColumn} // Pass the moveColumn function
              >
                {cards &&
                  cards.map((card: any, index: number) => {
                    // Check if the card belongs to the current column
                    if (card.column === column.id) {
                      return (
                        <Card
                          column={column}
                          key={index}
                          card={card}
                          index={index}
                          moveCard={moveCard}
                          columnIndex={column.id}
                          handleDelete={handleDelete}
                        />
                      );
                    }
                    return null;
                  })}
                <Box mt={1}></Box>
                <Button
                  colorScheme={"blue"}
                  size={"sm"}
                  onClick={() => onOpen(column.id)}
                >
                  +Add card
                </Button>
              </Column>
            );
          })
        ) : (
          <Box>No columns found</Box>
        )}
      </Box>
      <CreateCardModal isOpen={isOpen} onClose={onClose} columnId={columnId} />
    </Box>
  );
}

export default SingleBoardPage;
function debounceSwapCards(dragcard: any, hovercard: any) {
  throw new Error("Function not implemented.");
}

