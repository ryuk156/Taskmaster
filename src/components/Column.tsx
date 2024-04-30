import { Box, Card, CardHeader, Heading } from "@chakra-ui/react";
import React from "react";
import { ItemTypes } from "../interfaces/interface";
import { useDrag, useDrop } from "react-dnd";

interface ColumnProps {
  column: any;
  index: number;
  moveColumn: any;
  children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({
  column,
  index,
  moveColumn,
  children,
}) => {
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
        return;
      }
  
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
  
      const clientOffset = monitor.getClientOffset();
      if (!clientOffset) {
        return;
      }
  
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  
      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return;
      }
  
      // Update the item's index after drop
      item.index = hoverIndex;
  
      // Call moveColumn to update column order
      moveColumn(dragIndex, hoverIndex);
    },
  });

  drag(drop(ref));

  return (
    // <Box
    //   ref={ref}
    //   fontSize={"18px"}
    //   fontWeight={"bold"}
    //   m={1}
    //   key={column.id}
    //   bg="gray.200"
    //   p={4}
    //   borderRadius="lg"
    //   minWidth="200px"
    //   opacity={isDragging ? 0.5 : 1}
    //   cursor={"move"}
    // >
    <Card m={2} minWidth="200px" mb={2} p={3} shadow={'md'}  bg="gray.200">
      
      <Heading size='md' p={1} >{column && column.name}</Heading>
    
      {children}
    </Card>
      
    // </Box>
  );
};

export default Column;
