import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";

import CreateBoardColumn from "./CreateBoardColumn";
import CreateCardModal from "./CreateCardModal";
import Column from "./Column";
import Card from "./Card";
import { swapCard, swapColumn } from "../store/reducers/taskSlice"; // Import the swapColumn action creator

function SingleBoardPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenColumn, setIsOpenColumn] = useState(false);
  const [columnId, setColumnId] = useState<number>(0);

  const dispatch = useDispatch(); // Redux dispatch function

  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback((columnId: number) => {
    setIsOpen(true);
    setColumnId(columnId);
  }, []);

  const onCloseColumn = useCallback(() => setIsOpenColumn(false), []);
  const onOpenColumn = useCallback(() => setIsOpenColumn(true), []);

  const { boardId } = useParams();
  const parsedBoardId = boardId ? parseInt(boardId) : undefined;

  const moveColumn = useCallback((dragIndex: number, hoverIndex: number) => {
    dispatch(swapColumn({ parsedBoardId, dragIndex, hoverIndex }));
  }, [dispatch, parsedBoardId, swapColumn]);

  const board = useSelector((state: any) =>
    state.task.find((task: any) => task.id === parsedBoardId)
  );

  const moveCard = useCallback(
    (
      dragColumnIndex: number,
      hoverColumnIndex: number,
      dragCardIndex: number,
      hoverCardIndex: number
    ) => {
      console.log(
        { dragCardIndex: dragCardIndex },
        { hoverCardIndex: hoverCardIndex }
      );
      dispatch(
        swapCard({
          parsedBoardId,
          dragColumnIndex,
          hoverColumnIndex,
          dragCardIndex,
          hoverCardIndex,
        })
      );
    },
    [dispatch, parsedBoardId, swapCard]
  );

  if (!board) {
    return <div>Board not found!</div>;
  }

  return (
    <Box m={2}>
      <Flex justifyContent={"space-between"}>
        <Box m={1} fontSize={"36px"} fontWeight={"bold"}>
          {board.title}
        </Box>

        <Button
          variant="addButton"
          m={2}
          width={"150px"}
          height={"50px"}
          onClick={onOpenColumn}
        >
          + Add Task
        </Button>
      </Flex>
      {/* create column modal */}
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
        {board.columns.map((column: any, colIndex: number) => (
          <Column
            key={colIndex}
            column={column}
            index={colIndex} // Pass the index
            moveColumn={moveColumn} // Pass the moveColumn function
          >
            {column.cards &&
              column.cards.map((card: any, index: number) => (
                <Card
                  card={card}
                  key={index}
                  column={column}
                  index={index}
                  columnIndex={colIndex}
                  moveCard={moveCard}
                />
              ))}
            <Button onClick={() => onOpen(column.id)}>+Add Card</Button>
          </Column>
        ))}
      </Box>
      <CreateCardModal isOpen={isOpen} onClose={onClose} columnId={columnId} />
    </Box>
  );
}

export default SingleBoardPage;
