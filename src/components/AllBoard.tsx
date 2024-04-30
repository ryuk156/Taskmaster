import { Box, Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateBoard from "./CreateBoard";

import { getBoardsAsync } from "../store/reducers/taskSlice";
import { Dispatch } from "@reduxjs/toolkit";

export default function AllBoard() {
  const dispatch: any = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const boards = useSelector((state: any) => state.task.boards);
  const loading = useSelector((state: any) => state.task.loading);
  const [isOpen, setIsOpen] = useState(Boolean);
  const onClose = () => setIsOpen(false);
  const onOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    dispatch(getBoardsAsync(token));
  }, [dispatch, token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app">
      <Flex justifyContent="flex-end" alignItems="flex-start">
  <Button
    mt={4}
    mr={5} // Adjust margin-right for spacing from the right edge
    colorScheme="blue"
    variant="outline"
    onClick={onOpen}
  >
    + Add Board
  </Button>
</Flex>
      <Box
        style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }}
        m={3}
      >
        {boards &&
          boards.map((board: any) => (
            <Link to={`/board/${board.id}`} key={board.id}>
              <Box
                bg={"blue.600"}
                color={'white'}
                p={4}
                m={2}
                ml={1}
                borderRadius="25px"
                border={"1px solid #blue"}
                width={"150px"}
                height={"100px"}
                alignItems={"center"}
                display={"flex"}
                justifyContent={"center"}
                boxShadow="lg"
              >
                <div>{board.name}</div>

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

        <CreateBoard isOpen={isOpen} onClose={onClose} />
      </Box>
    </div>
  );
}
