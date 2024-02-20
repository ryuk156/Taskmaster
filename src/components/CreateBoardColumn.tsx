import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addColumnToBoard } from "../store/reducers/taskSlice";

interface CreateBoardColumnProps {
    boardId: number; // Define the prop type for boardId
  }

  const CreateBoardColumn: React.FC<CreateBoardColumnProps> = ({ boardId }) =>{
  const [boardColumnTitle, setBoardColumnTitle] = useState<string>("");
  const dispatch = useDispatch();
   
  const addColumn = (boardId: number, boardColumnTitle: string) => {
    dispatch(addColumnToBoard({ boardId, columnTitle: boardColumnTitle })); // Dispatch addColumnToBoard action with payload
    setBoardColumnTitle("");
  };

  
  return (
    <>
      <Input
        type="text"
        onChange={(e: any) => setBoardColumnTitle(e.target.value)}
      />
      <Button
        onClick={() => {
          addColumn(boardId, boardColumnTitle);
        }}
      >
        Add Column
      </Button>
    </>
  );
}

export  default CreateBoardColumn
