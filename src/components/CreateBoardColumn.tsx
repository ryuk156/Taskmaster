import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addColumnToBoard } from "../store/reducers/taskSlice";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Input,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { createColumnAsync } from "../store/reducers/taskSlice";

interface CreateBoardColumnProps {
  boardId: number; // Define the prop type for boardId
  isOpen: boolean;
  onClose: () => void;
}

const styles = {
  input: {
    border: "1px solid #CBD5E0",
    borderRadius: "4px",
    marginBottom: "15px",
    padding: "10px",
    width: "220px",
  },
}

const CreateBoardColumn: React.FC<CreateBoardColumnProps> = ({
  boardId,
  isOpen,
  onClose,
}) => {
  const [boardColumnTitle, setBoardColumnTitle] = useState<string>("");
  const dispatch = useDispatch<any>();
  const  token =  useSelector((state: any) => state.auth.token);
  const loading =  useSelector((state: any) => state.task.loading);
 

  const addColumn = () => {
  dispatch(createColumnAsync({ token: token, name: boardColumnTitle , board : boardId })); // Dispatch addColumnToBoard action with payload
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

        <ModalBody mt={1}>
          <Input
            type="text"
            onChange={(e: any) => setBoardColumnTitle(e.target.value)}
            placeholder="Title"
            p={1}
            style={styles.input}
          />
        </ModalBody>
        <ModalFooter mt={1}>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
          isLoading={loading}
          variant={'outline'}
            onClick={() => {
              addColumn();
              onClose()
            }}
            colorScheme="blue"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateBoardColumn;
