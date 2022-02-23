import React from "react";
import { Box, Button, Switch, Typography } from "@mui/material";
import { generateSolvedBoard } from "../Constants/GenerateBoard";
import { MyGridCell } from "../Interfaces/MyGridCell";

interface Props {
  myGrid: MyGridCell[][] | undefined;
  valuesToAdd: number[][];
  setValuesToAdd(value: number[][]): void;
  setShowSteps(value: boolean): void;
  setAutoCheck(value: boolean): void;
  showSteps: boolean;
  autoCheck: boolean;
}

const Header: React.FC<Props> = ({
  setAutoCheck,
  setShowSteps,
  valuesToAdd,
  setValuesToAdd,
  showSteps,
  autoCheck,
  myGrid,
}) => {
  const handelSolveBoardClicked = () => {
    if (!myGrid) {
      return;
    }
    let unsolvedBoard: number[][] = myGrid.map((row) => row.map((cell) => cell.value));
    setValuesToAdd(generateSolvedBoard(unsolvedBoard, showSteps));
  };

  return (
    <Box sx={{ margin: "1.25rem 1rem", display: "flex", justifyContent: "space-between" }}>
      <Button onClick={handelSolveBoardClicked} sx={SolveBoard} variant="contained">
        Solve The Board
      </Button>
      <Box sx={{ display: "flex" }}>
        <Switch
          defaultChecked={false}
          onChange={() => {
            setShowSteps(!showSteps);
          }}
          color="primary"
          size="medium"
        />
        <Typography sx={LabelText} variant="h6">
          Show Steps
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Switch
          defaultChecked={true}
          onChange={() => {
            setAutoCheck(!autoCheck);
          }}
          color="primary"
          size="medium"
        />
        <Typography sx={LabelText} variant="h6">
          Auto Check
        </Typography>
      </Box>
    </Box>
  );
};

const SolveBoard = [
  {
    backgroundColor: "#0053B5",
    fontSize: { xs: "0.85rem", sm: "1.1rem", md: "1.5rem" },
    width: { xs: "49%", sm: "35%", md: "50%" },
  },
];

const LabelText = [
  {
    color: "#fff",
    marginTop: "3px",
    marginLeft: "5px",
    display: { xs: "none", sm: "flex", md: "flex" },
    fontSize: { xs: "0.85rem", sm: "1.1rem", md: "1.5rem" },
  },
];

export default Header;
