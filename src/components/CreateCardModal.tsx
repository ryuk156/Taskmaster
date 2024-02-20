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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCardToColumn } from "../store/reducers/taskSlice";

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number
}



const CreateCardModal: React.FC<CreateCardModalProps> = ({
  isOpen,
  onClose,
  columnId
}) => {
  const dispatch = useDispatch();
  const [cardTitle, setCardTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const addCard = (columnid: number) => {
    if (cardTitle.trim() !== "" && content.trim() !== "") {
      const newCard = {
        columnTaskTitle: cardTitle,
        content: content
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
          height: "800px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ModalHeader>Modal Title</ModalHeader>

        <ModalBody>
          <Input
            type="text"
            onChange={(e: any) => {
              setCardTitle(e.target.value);
            }}
            value={cardTitle}
          />

          <Input
            type="text"
            onChange={(e: any) => {
              setContent(e.target.value);
            }}
            value={content}
          />
          <Button onClick={() => {
            addCard(columnId)
            setCardTitle("");
            setContent("")
          }}>Add Card</Button>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCardModal;
