import { Button, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBoard } from "../store/reducers/taskSlice";

export default function CreateBoard() {
  const [boardTitle, setBoardTitle] = useState<string|null>("");
  const dispatch = useDispatch();

  const addToBoard = () => {
    dispatch(
      createBoard({
        title: boardTitle,
        columns: [
          {
            columnTitle: "",
            cards: [],
          },
        ],
      })
    );
   
  };

  return (
    <>
      <Input type="text" onChange={(e: any) => setBoardTitle(e.target.value)} />
      <Button
        onClick={() => {
          addToBoard();
          setBoardTitle(null);
        }}
      >
        Add Board
      </Button>
    </>
  );
}
