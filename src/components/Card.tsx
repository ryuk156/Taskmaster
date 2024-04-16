import { Box } from "@chakra-ui/react";
import { ItemTypes } from "../interfaces/interface";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import React, { useRef } from "react";
import { swapCard } from "../store/reducers/taskSlice";
import { hover } from "@testing-library/user-event/dist/hover";

interface CardProps {
  card: any;
  column: any;
  moveCard: any;
  index: number;
  columnIndex: number
}

const Card: React.FC<CardProps> = ({ card, column, moveCard, index,columnIndex }) => {

  const ref = useRef<HTMLDivElement>(null);

  // useDrag hook for dragging functionality
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { id: card && card.id, columnId: column && column.id, index, columnIndex },
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
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
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

      // Update the item's index
      item.index = hoverCardIndex;
    },
  });

  // Attach the drag and drop functionality to the card element
  drag(drop(ref));


  return (
    
    <Box
      ref={ref} 
      bg="gray.100"
      p={2}
      borderRadius="lg"
      mt={2}
      mb={2}
      border={"2px solid black"}
      width="160px"
      backgroundColor="gray.100"
      opacity={isDragging ? 0.2 : 1}
      transform={isDragging ? "scale(0.9)" : "scale(1)"}
      transition="transform 0.2s ease-in-out"
      cursor="move"
    >
      {card && card.columnTaskTitle}
    </Box>
   
  );
};

export default Card;
