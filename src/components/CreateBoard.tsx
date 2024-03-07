import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../store/reducers/taskSlice";

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

interface CreateBoardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateBoard: React.FC<CreateBoardModalProps> = ({ isOpen, onClose }) => {
  const [boardTitle, setBoardTitle] = useState<string | null>("");
  const dispatch = useDispatch();

  const addToBoard = () => {
    dispatch(
      createBoard({
        title: boardTitle,
        columns: [
          {
            columnTitle: "",
            cards: [],
          },
        ],
      })
    );
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
            
            onClick={() => {
              addToBoard();
              setBoardTitle(null);
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
