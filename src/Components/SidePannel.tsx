import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { generateUnsolvedBoard } from "../Constants/GenerateUnsolvedBoard";
import CircularProgress from "@mui/material/CircularProgress";
import Extras from "./Extras";
import { SelectedCellData } from "../Interfaces/SelectedCellData";
import NumberGrid from "./NumberGrid";
import { generateSolvedBoard } from "../Constants/GenerateBoard";
import { MyGridCell } from "../Interfaces/MyGridCell";
import { makeArray } from "../Constants/Generic";

interface Props {
  myGrid: MyGridCell[][] | undefined;
  setMyGrid(value: MyGridCell[][] | undefined): void;
  valuesToAdd: number[][];
  setValuesToAdd(value: number[][]): void;
  dissableNumbers: boolean;
  selectedCell: SelectedCellData | undefined;
  solvedGrid: number[][] | undefined;
  setSolvedGrid(value: number[][] | undefined): void;
}

const SidePannel: React.FC<Props> = ({
  valuesToAdd,
  setValuesToAdd,
  dissableNumbers,
  selectedCell,
  solvedGrid,
  setSolvedGrid,
  myGrid,
  setMyGrid,
}) => {
  const [creatingNewGame, setCreatingNewGame] = useState(false);
  const handelResetGameClicked = async () => {
    setCreatingNewGame(true);
    setTimeout(() => {
      setValuesToAdd(generateUnsolvedBoard());
      setCreatingNewGame(false);
    }, 1500);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginLeft: "0.4em",
        marginTop: { xs: "1.5rem", md: "1rem" },
      }}
    >
      {creatingNewGame ? (
        <CircularProgress sx={{ margin: "0 auto" }} />
      ) : (
        <Button onClick={handelResetGameClicked} sx={NewGame} variant="contained" color="primary">
          Reset Game
        </Button>
      )}
      <Extras
        dissableNumbers={dissableNumbers}
        solvedGrid={solvedGrid}
        selectedCell={selectedCell}
        valuesToAdd={valuesToAdd}
        setValuesToAdd={setValuesToAdd}
      />
      <NumberGrid
        selectedCell={selectedCell}
        valuesToAdd={valuesToAdd}
        setValuesToAdd={setValuesToAdd}
        dissableNumbers={dissableNumbers}
      />
    </Box>
  );
};

const NewGame = [
  {
    backgroundColor: "#0053B5",
    fontSize: { xs: "1.25rem", sm: "1.25rem", md: "1.5rem", lg: "1.8rem", xl: "2rem" },
    width: { xs: "100%", md: "100%" },
  },
];

export default SidePannel;
