import { Box } from "@chakra-ui/react";
import React, { Children } from "react";
import { ItemTypes } from "../interfaces/interface";
import { useDrag, useDrop } from "react-dnd";

interface col {
  column: any;
  children: any;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
}

const Column: React.FC<col> = ({ column, children, index, moveColumn }) => {
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

      moveColumn(dragIndex, hoverIndex);
      console.log(dragIndex,hoverIndex)
      item.index = hoverIndex;
    },
  });

  const ref = React.useRef<HTMLDivElement>(null);
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
    >
      {column && column.columnTitle}

      <Box>
      {children}
      </Box>

      
    </Box>
  );
};

export default Column;
