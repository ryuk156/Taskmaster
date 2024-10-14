import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CreateBoard from "./CreateBoard";
import { getBoardsAsync } from "../store/reducers/taskSlice";
import VanishableAlert from "./VanishableAlert";
import AllUserModal from "./AllUserModal";

export default function AllBoard() {
  const dispatch = useDispatch<any>();
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector((state: any) => state.auth.token);
  const boards = useSelector((state: any) => state.task.boards);
  const loading = useSelector((state: any) => state.task.loading);


  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      dispatch(getBoardsAsync({ token: userToken }));
    }
  }, [dispatch]);

  // if (!token) {
  //   return <VanishableAlert message="error" />; // or redirect to login page
  // }

 

  return (
    <Box className="app">
      {loading && <VanishableAlert message="Loading ..." status={"loading"} />}
     
      

      <Flex justifyContent="space-between" alignItems="flex-start">
       <Text mt={4} ml={5} fontSize={"28px"} fontWeight={"bold"}>Boards</Text>
     
        <Button mt={4} mr={5} colorScheme="blue" variant="outline" onClick={onOpen}>
          + Add Board
        </Button>
      </Flex>
      <Box style={{ display: "flex", flexWrap: "wrap", flexDirection: "row" }} m={3}>
        {boards &&
          boards.map((board: any) => (
            <Link to={`/board/${board.id}`} key={board.id}>
              <Box
                bg={"blue.600"}
                color={"white"}
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
              </Box>
            </Link>
          ))}
        <CreateBoard isOpen={isOpen} onClose={onClose} />
      </Box>
    </Box>
  );
}
