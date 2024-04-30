import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {  createBoardAsync } from "../store/reducers/taskSlice";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
  Flex,
} from "@chakra-ui/react";
import { createBoardAsync } from "../store/reducers/taskSlice";

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBoard: React.FC<CreateBoardModalProps> = ({ isOpen, onClose }) => {
  const  [boardTitle, setBoardTitle] = useState<string>('');
  const token = useSelector((state: any) => state.auth.token);
  const dispatch = useDispatch<any>();
  const loading = useSelector((state: any) => state.task.loading);

  const addToBoard = () => {
   dispatch(createBoardAsync({ name: boardTitle, token: token }));
  };



  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        style={{
          width: "400px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          bottom: "0",
          margin: "auto",
        }}
        bg="gray.200"
      >
        <ModalHeader fontWeight={"bold"} fontSize={22} >Add Board</ModalHeader>

        <ModalBody>
          <Flex>
            <Input
              type="text"
              onChange={(e: any) => setBoardTitle(e.target.value)}
              placeholder="Title"
              p={1}
            />
          </Flex>
        </ModalBody>
        <ModalFooter mt={3}>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>

          <Button
            isLoading={loading}
            loadingText='logging in'
            colorScheme='blue'
            variant='outline'
            onClick={() => {
              addToBoard();
              setBoardTitle('');
              onClose()
            }}
          >
            Save Board
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateBoard;
