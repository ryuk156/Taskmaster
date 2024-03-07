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
import { useDispatch } from "react-redux";
import { addCardToColumn } from "../store/reducers/taskSlice";

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
}

const CreateCardModal: React.FC<CreateCardModalProps> = ({
  isOpen,
  onClose,
  columnId,
}) => {
  const dispatch = useDispatch();
  const [cardTitle, setCardTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const addCard = (columnid: number) => {
    if (cardTitle.trim() !== "" && content.trim() !== "") {
      const newCard = {
        columnTaskTitle: cardTitle,
        content: content,
      };
      dispatch(addCardToColumn({ columnId, newCard }));

      onClose(); // Close the modal after adding the card
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
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
        <ModalHeader fontWeight={"bold"} fontSize={22}>Add Card</ModalHeader>

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
            onClick={() => {
              addCard(columnId);
              setCardTitle("");
              setContent("");
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCardModal;
