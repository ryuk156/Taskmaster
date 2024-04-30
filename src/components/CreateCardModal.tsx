// CreateCardModal.js
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCardAsync } from "../store/reducers/taskSlice";
// import { addCardToColumn } from "../store/reducers/taskSlice";

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
}

const styles = {
  modalStyle: {
    width: "400px",
    height: "250px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    top: "0px",
    left: "0px",
    right: "0px",
    bottom: "0px",
    margin: "auto",
  },
  input: {
    border: "1px solid #CBD5E0",
    borderRadius: "4px",
    marginBottom: "15px",
    padding: "10px",
    width: "220px",
  },
};

const CreateCardModal: React.FC<CreateCardModalProps> = ({
  isOpen,
  onClose,
  columnId,
}) => {
  const [cardTitle, setCardTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const dispatch = useDispatch<any>();
  const token = useSelector((state: any) => state.auth.token);
  const loading = useSelector((state: any) => state.task.loading);

  const addCard = () => {
    if (cardTitle.trim() !== "" && content.trim() !== "") {
      dispatch(
        createCardAsync({
          token: token,
          column: columnId,
          name: cardTitle,
          content: content,
        })
      );
      onClose()
    }

    // if (cardTitle.trim() !== "" && content.trim() !== "") {
    //   const newCard = {
    //     columnTaskTitle: cardTitle,
    //     content: content,
    //   };
    //  // dispatch(addCardToColumn({ columnId, newCard }));

    //   onClose(); // Close the modal after adding the card
    // }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        style={{ ...styles.modalStyle, position: "absolute" }}
        bg="gray.200"
      >
        <ModalHeader fontWeight={"bold"} fontSize={22}>
          Add Card
        </ModalHeader>

        <ModalBody>
          <Flex flexDirection={"column"} gap={3}>
            <Input
              type="text"
              onChange={(e: any) => {
                setCardTitle(e.target.value);
              }}
              placeholder="Title"
              value={cardTitle}
              p={1}
              style={styles.input}
            />

            <Input
              type="text"
              onChange={(e: any) => {
                setContent(e.target.value);
              }}
              placeholder="Content"
              value={content}
              p={1}
            />
          </Flex>
        </ModalBody>
        <ModalFooter mt={3}>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme="blue"
          isLoading={loading}
            onClick={() => {
              addCard();
              setCardTitle("");
              setContent("");
            }}
            variant={"outline"}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCardModal;
