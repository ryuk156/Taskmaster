import { Box, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateBoard from "./CreateBoard";

export default function AllBoard() {
  const boards = useSelector((state: any) => state.task);
  const [isOpen, setIsOpen] = useState(Boolean);
  const onClose = () => setIsOpen(false);
  const onOpen = () => {
    setIsOpen(true);
  };
   
  return (
    <div className="app">
      <Box style={{ display: "flex" }} m={3} >
        {/* Render the boards */}
       
          {boards &&
            boards.map((board: any) => (
              <Link to={`/board/${board.id}`}  key={board.id}>
              <Box
                bg="black"
                color="white"
                p={4}
                m={2}
                borderRadius="25px"
               
                width={"150px"}
                height={"100px"}
                alignItems={"center"}
                display={"flex"}
                justifyContent={"center"}
                
              >
                <div>
                {board.title}
                </div>

                {/* <ul>
                  {board.columns.map((column: any) => (
                    <li key={column.columnTitle}>
                      <h4>{column.columnTitle}</h4>
                      <ul>
                        {column.cards.map((card: any) => (
                          <li key={card.columnTaskTitle}>
                            {card.columnTaskTitle}: {card.content}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul> */}
              </Box>
              </Link>
            ))}
          <Button  variant={"AddButton"} m={2}  width={"150px"}
                height={"100px"} onClick={onOpen}>
            + Add Board
          </Button>

          <CreateBoard isOpen={isOpen} onClose={onClose} />
        
      </Box>
    </div>
  );
}
