import { Box } from "@chakra-ui/react";
import { ItemTypes } from "../interfaces/interface";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { swapCard } from "../store/reducers/taskSlice";

interface CardProps {
  card: any;
  column: any;
  moveCard: any;
  index: number;
  columnIndex: number
}

const Card: React.FC<CardProps> = ({ card, column, moveCard, index,columnIndex }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    
    type: ItemTypes.CARD,
    item: { id: card && card.id, columnId: column && column.id, index, columnIndex },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),

  }));

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
  
      const dragColumnIndex = item.columnId;
      const hoverColumnIndex = column.id; // Assuming `column` is the current column object
      const dragCardIndex = item.index;
      const hoverCardIndex = index;
  
      if (dragColumnIndex !== hoverColumnIndex) {
        // Swapping between different columns
        moveCard(
          dragColumnIndex,
          hoverColumnIndex,
          dragCardIndex,
          hoverCardIndex
        );
      } else if (dragCardIndex !== hoverCardIndex) {
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

  const ref = React.useRef<HTMLDivElement>(null);
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
      opacity={isDragging ? 0.5 : 1}
    >
      {card && card.columnTaskTitle}
    </Box>
  );
};

export default Card;
