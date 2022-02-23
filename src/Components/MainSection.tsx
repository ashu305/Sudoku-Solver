import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MyGrid from "./MyGrid";
import { MyGridCell } from "../Interfaces/MyGridCell";
import { generateSolvedBoard } from "../Constants/GenerateBoard";
import { makeArray } from "../Constants/Generic";
import SidePannel from "./SidePannel";
import { SelectedCellData } from "../Interfaces/SelectedCellData";

interface Props {
  autoCheck: boolean;
  myGrid: MyGridCell[][] | undefined;
  setMyGrid(value: MyGridCell[][] | undefined): void;
  valuesToAdd: number[][];
  setValuesToAdd(value: number[][]): void;
}

const MainSection: React.FC<Props> = ({
  valuesToAdd,
  setValuesToAdd,
  myGrid,
  setMyGrid,
  autoCheck,
}) => {
  const [solvedGrid, setSolvedGrid] = useState<number[][] | undefined>(undefined);
  const [selectedCell, setSelectedCell] = useState<SelectedCellData | undefined>(undefined);
  const [dissableNumbers, setDissableNumbers] = useState(false);

  useEffect(() => {
    getNewUnsolvedGrid();
  }, []);

  useEffect(() => {
    const board = valuesToAdd;
  }, [valuesToAdd]);

  const getNewUnsolvedGrid = (): void => {
    const normalBoard = [...valuesToAdd];
    const board: MyGridCell[][] = makeArray(9, 9);
    normalBoard.map((row: number[], i: number) => {
      return row.map((cell: number, j: number) => {
        if (cell === 0) {
          board[i][j] = {
            value: cell,
            isCorrect: undefined,
          };
        } else {
          board[i][j] = {
            value: cell,
            isCorrect: true,
          };
        }
      });
    });

    const unsolvedBoard = normalBoard.map((row: number[]) => {
      return row.map((cell: number) => {
        return cell;
      });
    });

    if (unsolvedBoard[0][0] !== 0) {
      setDissableNumbers(true);
    }
    setSolvedGrid(generateSolvedBoard(unsolvedBoard, false));
    setMyGrid(board);
  };

  return (
    <div style={{ background: "#1d203d" }}>
      <Box sx={mainPannelStyle}>
        <Box>
          <MyGrid
            autoCheck={autoCheck}
            setDisasbleNumbers={setDissableNumbers}
            valuesToAdd={valuesToAdd}
            myGridCell={myGrid}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            solvedGrid={solvedGrid}
          />
        </Box>
        <SidePannel
          myGrid={myGrid}
          setMyGrid={setMyGrid}
          setSolvedGrid={setSolvedGrid}
          solvedGrid={solvedGrid}
          dissableNumbers={dissableNumbers}
          valuesToAdd={valuesToAdd}
          setValuesToAdd={setValuesToAdd}
          selectedCell={selectedCell}
        />
      </Box>
    </div>
  );
};

const mainPannelStyle = [
  {
    margin: "1.25rem 1rem",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
  },
];

export default MainSection;
