import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AllBoard() {
  const boards = useSelector((state: any) => state.task);

  useEffect(() => {
    console.log(boards);
  }, [boards]);
  return (
    <div className="app">
      <div className="App">
        {/* Render the boards */}
        <ul>
          {boards &&
            boards.map((board: any) => (
              <div key={board.title}>
                <li key={board.id}>
                  <Link to={`/board/${board.id}`}>{board.title}</Link>
                </li>
                
                <ul>
                  {board.columns.map((column: any) => (
                    <li key={column.columnTitle}>
                      <h1>{column.columnTitle}</h1>
                      <ul>
                        {column.cards.map((card: any) => (
                          <li key={card.columnTaskTitle}>
                            {card.columnTaskTitle}: {card.content}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </ul>
      </div>
    </div>
  );
}
