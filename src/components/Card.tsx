import {
  Box,
  CardBody,
  CardHeader,
  Card as ChakraCard,
  Heading,
  Input,
  useDisclosure,
  Text,
  Flex,
  Alert,
} from "@chakra-ui/react";
import { ItemTypes } from "../interfaces/interface";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useState } from "react";
import { deleteCardAsync, updateCardAsync } from "../store/reducers/taskSlice";
import { DeleteIcon } from "@chakra-ui/icons";
import ErrorAlert from "./ErrorAlert";

interface CardProps {
  card: any;
  column: any;
  moveCard: any;
  index: number;
  columnIndex: number;
  handleDelete: any;
}

const Card: React.FC<CardProps> = ({
  card,
  column,
  moveCard,
  index,
  columnIndex,
  handleDelete,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(card.content); // Separate state for edited content

  const dispatch = useDispatch<any>();
  const token = useSelector((state: any) => state.auth.token);
  const loading = useSelector((state: any) => state.task.loading);
  const error = useSelector((state: any) => state.task.error);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // useDrag hook for dragging functionality
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: {
      id: card && card.id,
      columnId: column && column.id,
      index,
      columnIndex,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // useDrop hook for dropping functionality
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }

      const dragColumnIndex = item.columnId as number;
      const hoverColumnIndex = column.id; // Assuming `column` is the current column object
      const dragCardIndex = item.index as number;
      const hoverCardIndex = index;

      // Get the bounding rectangle of the drop target
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      if (!hoverBoundingRect) {
        return; // Skip the rest of the function if the bounding rectangle is not available
      }

      // Get the vertical middle of the drop target
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Get the client offset of the mouse pointer
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
      // Get the distance from the top of the drop target
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      // Determine whether to move the card based on the mouse position
      if (dragCardIndex !== hoverCardIndex) {
        // Swapping within the same column
        moveCard(
          dragColumnIndex,
          hoverColumnIndex,
          dragCardIndex,
          hoverCardIndex
        );
      }
    },
  });

  // Attach the drag and drop functionality to the card element
  drag(drop(ref));

  const handleDoubleClick = () => {
    setIsEditing(true);
    onOpen();
  };

  

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent(e.target.value);
  };

  const handleBlur = () => {
    setIsEditing(false);
    dispatch(
      updateCardAsync({
        token,
        content: editedContent,
        card: card.id,
        name: card.name,
        column: column.id,
      })
    );
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  return (
    <div>
      {isEditing ? (
        <Input
          value={editedContent}
          onChange={handleContentChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <ChakraCard
          ref={ref}
          size={"sm"}
          borderRadius="lg"
          mt={2}
          mb={1}
          opacity={isDragging ? 0.5 : 1} // Adjust opacity based on dragging state
          cursor="pointer"
          onDoubleClick={handleDoubleClick}
        >
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Heading m={2} mt={2} size="sm">
              {card.name}
            </Heading>
            <DeleteIcon
              mr={2}
              onClick={() => {
                handleDelete(card.id);
              }}
            />
          </Flex>
          <Text m={2} mt={1}>
            {card.content}
          </Text>
        </ChakraCard>
      )}
    </div>
  );
};

export default Card;
