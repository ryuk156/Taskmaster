import { Box } from "@chakra-ui/react";
import React from "react";
import { ItemTypes } from "../interfaces/interface";
import { useDrag, useDrop } from "react-dnd";

interface ColumnProps {
  column: any;
  index: number;
  moveColumn: any;
  children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ column, index, moveColumn, children }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.COLUMN,
    item: { id: column && column.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop({
    accept: ItemTypes.COLUMN,
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

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

      // Only move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
          (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
        return;
      }

      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <Box
      ref={ref}
      fontSize={"18px"}
      fontWeight={"bold"}
      m={1}
      key={column.id}
      bg="gray.200"
      p={4}
      borderRadius="lg"
      minWidth="200px"
      opacity={isDragging ? 0.5 : 1}
    >
      {column && column.columnTitle}
      {children}
    </Box>
  );
};

export default Column;
