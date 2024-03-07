import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addColumnToBoard } from "../store/reducers/taskSlice";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
} from "@chakra-ui/react";

interface CreateBoardColumnProps {
  boardId: number; // Define the prop type for boardId
  isOpen: boolean;
  onClose: () => void;
}

const CreateBoardColumn: React.FC<CreateBoardColumnProps> = ({
  boardId,
  isOpen,
  onClose,
}) => {
  const [boardColumnTitle, setBoardColumnTitle] = useState<string>("");
  const dispatch = useDispatch();

  const addColumn = (boardId: number, boardColumnTitle: string) => {
    dispatch(addColumnToBoard({ boardId, columnTitle: boardColumnTitle })); // Dispatch addColumnToBoard action with payload
    setBoardColumnTitle("");
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
        <ModalHeader fontWeight={"bold"} fontSize={22}>Add Task</ModalHeader>

        <ModalBody mt={2}>
          <Input
            type="text"
            onChange={(e: any) => setBoardColumnTitle(e.target.value)}
            placeholder="Title"
            p={1}
          />
        </ModalBody>
        <ModalFooter mt={3}>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              addColumn(boardId, boardColumnTitle);
              onClose()
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateBoardColumn;
