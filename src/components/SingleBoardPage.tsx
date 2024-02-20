// SingleBoardPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CreateBoardColumn from "./CreateBoardColumn";
import { Box, Button } from "@chakra-ui/react";
import CreateCardModal from "./CreateCardModal";

function SingleBoardPage() {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  const { boardId } = useParams();
  const parsedBoardId = boardId ? parseInt(boardId) : undefined;

  const board = useSelector((state: any) =>
    state.task.find((task: any) => task.id === parsedBoardId)
  );

  if (!board) {
    return <div>Board not found!</div>;
  }

  return (
    <div>
      
      <h1>{board.title}</h1>
      <CreateBoardColumn boardId={board.id} />

      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        {board &&
          board.columns.map((column: any) => {
            return (
              <div key={column.columnTitle}>
                {column.columnTitle}
                {column.cards && // Access cards on column object
                  column.cards.map(
                    (
                      card: any // Iterate over cards of the column
                    ) => (
                      <div key={card.columnTaskTitle}>
                        {card.columnTaskTitle}
                      </div>
                    )
                  )}
                <Button onClick={onOpen}>Open Modal</Button>
                <CreateCardModal isOpen={isOpen} onClose={onClose} columnId={column.id} />
              </div>
            );
           
          })}
      </Box>
    </div>
  );
}

export default SingleBoardPage;
